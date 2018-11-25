import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { connect } from "react-redux";
import spoken from "../../../node_modules/spoken/build/spoken";
import { withRouter } from "react-router-dom";

import Chatbox from "./Chatbox";
import Translate from "../features/Translate";
import UserIcon from "../user/UserIcon";
import Speech from "../features/Speech";
import LoadingSpinner from "../features/LoadingSpinner";
import ChatInput from "./ChatInput";
import Button from "./Button";
import SaveMsg from "./SaveMsg";
import ChatAdvice from "./ChatAdvice";

import {
  updateMessages,
  updateChat,
  closeChat,
  clearTranslation,
  toggleSpeech,
  toggleTranslate,
  toggleSave,
  updateRecipientUser,
  toggleUserPf,
  clearSelectedMsg,
  toggleSpinner,
  closeChats,
  setTranscription,
  clearTranscription,
} from "../../actions";



const bgColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const rgbColor = "rgb(" + r + "," + g + "," + b + ")";
  return rgbColor;
};

const containerStyle = {
  width: "1rem",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  alignSelf: "center",
  margin: "0",
  position: "relative",
  top: "0.3rem"
};

const imgStyle = {
  borderRadius: "50%",
  width: "2rem",
  height: "2rem",
  position: "absolute",
  top: "-1.3rem",
  marginRight: "1rem"
};


class Chat extends React.PureComponent {

    state = {
      users: null,
      speech: "",
      saveMessage: null,
      x: 0,
      y: 0,
      chatBoxBgColor: null,
    };

  componentDidMount() {
    console.log("COMPONENTDIDMOUNT", this.props);
    if (this.props.users) {
      this.setState({ users: this.props.users }, () => console.log(this.state));
    }
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("COMPONENTDIDUPDATE props", prevProps);
    // console.log("COMPONENTDIDUPDATE state", prevState);

    if (
      !this.props.speechPrompt &&
      !this.props.savePrompt &&
      !this.props.translatePrompt
    ) {
      // this.inputFocus.focus();
    }

    if (prevState.users && this.state.users && prevState.users.length === this.state.users.length) {
    } else {
      this.renderUsers();
    }
  }

  handleKeyDown = e => {
    if (e.key === "Escape") {

      if (this.props.speechPrompt) {
        this.props.toggleSpeech();
      }
      if (this.props.translatePrompt) {
        this.props.toggleTranslate();
      }
      if (this.props.savePrompt) {
        this.props.toggleSave();
      }
      if (this.props.movePrompt) {
        this.props.toggleMove();
      }

      if (this.props.translation) {
        this.props.clearTranslation();
        this.props.clearSelectedMsg();
      }

      if (this.props.transcription) {
        this.props.clearTranscription();
      }
    } 
    // else if (e.key === "Backspace") {
    //   if (this.state.text.length === 1) {
    //     this.setState({ text: "" }, () => console.log(this.state));
    //     this.props.clearTranslation();
    //   }
    // }
  };

  handleClick = (e, clickedUser) => {
    if (e.target.tagName !== "IMG") {
      const check = this.props.openChats.filter(
        chat => chat.recipient_user.id === clickedUser.id
      );

      if (check.length === 0) {
        // this.props.handleNewChat({ recipient_id: clickedUser.id });
        const x = parseInt(Math.random() * 300, 10);
        const y = parseInt(Math.random() * 300, 10);
        this.setState({
            x,
            y,
            chatBoxBgColor: bgColor()
          }, () => {
            console.log(this.state);
            
            this.props.handleNewChat({
              recipient_id: clickedUser.id,
              x: this.state.x,
              y: this.state.y,
              color: this.state.chatBoxBgColor
            });
          }
        );
      } else {
        alert("you already have a chat going, silly you");

        this.props.updateChat(clickedUser.id);
        const recUser = { id: clickedUser.id, username: clickedUser.username };
        this.props.updateRecipientUser(recUser);
      }
    } else {
      console.log(`clicked IMG`, clickedUser);
      this.props.toggleUserPf(clickedUser);
    }
  };

  handleReceivedUser = response => {
    const updatedUsers = [...this.state.users, response].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    this.setState({ ...this.state, users: updatedUsers },
      () => console.log(this.state)
    );
  };

  renderUsers = () => {
    const { users } = this.state;
    const { currentUser } = this.props;

    const filtered =
      users && currentUser
        ? users.filter(user => user.id !== currentUser.id)
        : null;
    const chattingUsers = this.props.openChats.map(
      chat => chat.recipient_user.id
    );
    console.log(chattingUsers);
    let openChatClass = null;

    return filtered
      ? filtered.map(user => {
          if (chattingUsers.includes(user.id)) {
            openChatClass = "user active-chat";
          } else {
            openChatClass = "user";
          }

          return (
            <div
              key={user.id}
              className={openChatClass}
              onClick={e => this.handleClick(e, user)}
            >
              <UserIcon
                onClick={this.handleUserPicClick}
                containerStyle={containerStyle}
                imgStyle={imgStyle}
                imgSrc={user.profile_picture}
              />
              <p>{user.username}</p>
            </div>
          );
        })
      : null;
  };

  handleUserPicClick = () => {
    this.props.history.push("/profile");
  };

  handleTranslateShortcut = () => {
    this.props.toggleTranslate();
  };

  // slightly diff from the keyboard shortcut trigger
  handleTranscribeShortcut = () => {
    this.props.setTranscription('speak now')
    this.props.toggleSpinner();
    this.handleTranscription();
  };

  handleReceivedChat = response => {
    console.log(response);
  };

  handleReceiveMsgs = response => {
    console.log(response);
  };

  handleSaveMsgSelection = msg => {
    this.setState({ saveMessage: msg }, () => console.log(this.state));
  };

  // both here and in ChatInput
  handleTranscription = () => {
    spoken
      .listen()
      .then(transcript => {
        console.log(transcript);
        this.props.setTranscription(transcript);
        this.props.toggleSpinner();
      })
      .catch(error => console.warn(error.message));
  };


  render() {
    const renderHeader = () => {
      const className =
        this.props.speechPrompt ||
        this.props.translatePrompt ||
        this.props.savePrompt 
          ? "chat-header active"
          : "chat-header";
      return (
        <div className={className}>
          {this.props.speechPrompt ? <Speech /> : null}
          {this.props.translatePrompt ? <Translate /> : null}
          {this.props.savePrompt ? <SaveMsg msgId={this.state.saveMessage.id} /> : null}
        </div>
      );
    };

    const renderChatBoxes = () => {
      return this.props.openChats
        ? this.props.openChats.map((chat, i) => {
            const obj = { ...chat, index: i };
            console.log(obj);
            return (
              <Chatbox
                handleSaveMsgSelection={this.handleSaveMsgSelection}
                chat={obj}
                x={this.state.x}
                y={this.state.y}
                bgColor={this.state.chatBoxBgColor}
              />
            );
          })
        : null;
    };

    const renderFeatureBtns = () => {
      const className =
        this.props.speechPrompt ||
        this.props.translatePrompt ||
        this.props.savePrompt ||
        this.state.saveMsgStatus
          ? "chat-header feature-btns"
          : "chat-header active feature-btns";

      return (
        <section className={className}>
          <Button handleClick={this.handleTranslateShortcut} text="Translate" />
          <Button handleClick={this.handleTranscribeShortcut} text="Transcribe" />
        </section>
      );
    };

    return (
      <React.Fragment>
        <ActionCable
          channel={{ channel: "UsersChannel" }}
          onReceived={this.handleReceivedUser}
        />
        <ActionCable
          channel={{ channel: "ChatsChannel" }}
          onReceived={this.handleReceivedChat}
        />

        {this.props.speechPrompt ||
        this.props.translatePrompt ||
        this.props.savePrompt
          ? renderHeader()
          : renderFeatureBtns()}

        <aside className="users-list">{this.renderUsers()}</aside>

        <div className="messaging-area">
          {renderChatBoxes()}

          {this.props.loading ? <LoadingSpinner /> : null}
        </div>

        <ChatInput />

        <ChatAdvice />

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.appState.currentUser,
    openChats: state.appState.openChats,
    recipientUser: state.appState.recipientUser,
    chat: state.appState.chat,
    speechPrompt: state.appState.prompts.speechPrompt,
    selectedMessage: state.appState.selectedMessage,
    translation: state.appState.translation,
    translatePrompt: state.appState.prompts.translatePrompt,
    savePrompt: state.appState.prompts.savePrompt,
    loading: state.appState.loading,
    transcription: state.appState.transcription,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMessages: messages => dispatch(updateMessages(messages)),
    updateChat: chat => dispatch(updateChat(chat)),
    closeChat: chats => dispatch(closeChat(chats)),
    clearTranslation: () => dispatch(clearTranslation()),
    toggleSpeech: () => dispatch(toggleSpeech()),
    toggleTranslate: () => dispatch(toggleTranslate()),
    toggleSave: () => dispatch(toggleSave()),
    updateRecipientUser: user => dispatch(updateRecipientUser(user)),
    toggleUserPf: user => dispatch(toggleUserPf(user)),
    clearSelectedMsg: () => dispatch(clearSelectedMsg()),
    toggleSpinner: () => dispatch(toggleSpinner()),
    closeChats: () => dispatch(closeChats()),
    setTranscription: (transcription) => dispatch(setTranscription(transcription)),
    clearTranscription: () => dispatch(clearTranscription()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Chat)
);
