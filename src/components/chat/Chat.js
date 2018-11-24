import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { connect } from "react-redux";
import spoken from "../../../node_modules/spoken/build/spoken";
import { withRouter } from "react-router-dom";

import { createList, addMessage, getLists } from "../../adapter";
import {
  updateLists,
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

import Chatbox from "./Chatbox";
import Translate from "../features/Translate";
import UserIcon from "../user/UserIcon";
import Speech from "../features/Speech";
import LoadingSpinner from "../features/LoadingSpinner";
import ChatInput from './ChatInput';

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

const tips = [
  `enter "//T" for translation prompt`,
  `enter "//C #" to close a certain chat window`,
  `enter "//L" for transcribe prompt`,
  `press "Esc" to remove prompts and/or clear text field`,
  `click main background and press "tab" to type`,
  `enter "//C all" to close all chat windows`
];

class Chat extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      text: "",
      speech: "",
      saveMsg: false,
      message: null,
      newList: "",
      saveMsgStatus: false,
      existingList: null,
      x: 0,
      y: 0,
      chatBoxBgColor: null,
      placeholder: "",
      spokenLanguages: null,
      spokenVoice: null,
      tip: ""
    };
  }

  componentDidMount() {
    console.log("COMPONENTDIDMOUNT", this.props);
    if (this.props.users) {
      this.setState({ users: this.props.users }, () => console.log(this.state));
    }
    window.addEventListener("keydown", this.handleKeyDown);
    this.setState({ tip: tips[Math.floor(Math.random() * tips.length)] }, () =>
      console.log(this.state)
    );
    this.interval = setInterval(this.renderTips, 60000);
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

    if (
      prevState.users &&
      this.state.users &&
      prevState.users.length === this.state.users.length
    ) {
    } else {
      this.renderUsers();
    }

    if (this.props.translation && prevState.tip !== tips[3]) {
      this.setState({
        tip: tips[3]
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
        this.setState(
          {
            x,
            y,
            chatBoxBgColor: bgColor()
          },
          () => {
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

  // saving a Msg also uses this
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      console.log(this.state)
    );
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

  handleSavingMsg = listId => {
    addMessage({ msg_id: this.state.message.id, list_id: listId }).then(
      messages => {
        console.log(messages);
        this.setState({ saveMsgStatus: true }, () => console.log(this.state));
        this.props.toggleSave();
      }
    );
  };

  handleNewList = e => {
    e.preventDefault();
    createList({
      name: this.state.newList,
      user_id: this.props.currentUser.id
    }).then(newList => {
      console.log(newList);
      this.handleSavingMsg(newList.id);
      getLists(this.props.currentUser.id).then(lists =>
        this.props.updateLists(lists)
      );
    });
    this.setState({ newList: "" });
  };

  handleExistingList = () => {
    console.log(this.existingList.value);
    this.setState({ existingList: this.existingList.value }, () =>
      this.handleSavingMsg(this.state.existingList)
    );
  };

  hideForms = form => {
    switch (form) {
      case "speech":
        return this.setState({ speech: "" }, () => console.log(this.state));
      case "translation":
        return this.setState({ langPrompt: false }, () =>
          console.log(this.state)
        );
      case "save":
        return this.setState({ saveMsg: false }, () => console.log(this.state));
      default:
        return console.log("hideForms failed");
    }
  };

  handleSaveMsgChange = msg => {
    this.setState({ message: msg }, () => console.log(this.state));

    if (!this.props.lists) {
      getLists(this.props.currentUser.id).then(lists =>
        this.props.updateLists(lists)
      );
    }

    this.setState({ saveMsg: true });
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

  renderTips = () => {
    this.setState({ tip: tips[Math.floor(Math.random() * 5)] }, () =>
      console.log(this.state)
    );
  };

  render() {
    const renderHeader = () => {
      const className =
        this.props.speechPrompt ||
        this.props.translatePrompt ||
        this.props.savePrompt ||
        this.state.saveMsgStatus
          ? "chat-header active"
          : "chat-header";
      return (
        <React.Fragment>
          {this.props.speechPrompt ||
          this.props.translatePrompt ||
          this.props.savePrompt ||
          this.state.saveMsgStatus ? (
            <div className={className}>
              {this.props.speechPrompt ? <Speech /> : null}
              {this.props.translatePrompt ? <Translate /> : null}
              {this.props.savePrompt ? renderSaveMsgForm() : null}
              {this.state.saveMsgStatus ? renderCheckmark() : null}
            </div>
          ) : null}
        </React.Fragment>
      );
    };

    const renderSaveMsgForm = () => {
      return (
        <div className="save-msg">
          <div className="existing-container">
            <label>List to Save to:</label>
            <select name="existingList" ref={el => (this.existingList = el)}>
              {this.props.lists ? (
                this.props.lists.map(list => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))
              ) : (
                <option disabled>No Lists</option>
              )}
            </select>
            <button onClick={this.handleExistingList}>Add to this List</button>
          </div>

          <h1 className="save-msg-title">Save a Message to Review!</h1>

          <form onSubmit={this.handleNewList}>
            <input
              type="text"
              name="newList"
              value={this.state.newList}
              onChange={this.handleChange}
              placeholder="Create New List--Name Here"
              autoFocus={true}
            />
          </form>
        </div>
      );
    };

    const renderCheckmark = () => {
      setTimeout(() => this.setState({ saveMsgStatus: false }), 600);
      return (
        <img
          className="checkmark"
          src="https://png.icons8.com/cotton/2x/checkmark.png"
          alt="check mark"
        />
      );
    };

    const renderChatBoxes = () => {
      return this.props.openChats
        ? this.props.openChats.map((chat, i) => {
            const obj = { ...chat, index: i };
            console.log(obj);
            return (
              <Chatbox
                handleSaveMsgChange={this.handleSaveMsgChange}
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
          <button onClick={this.handleTranslateShortcut} id="translateBtn">
            Translate
          </button>
          <button onClick={this.handleTranscribeShortcut} id="transcribeBtn">
            Transcribe
          </button>
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

        {renderHeader()}

        {this.props.speechPrompt ||
        this.props.translatePrompt ||
        this.props.savePrompt ||
        this.state.saveMsgStatus
          ? null
          : renderFeatureBtns()}

        <aside className="users-list">{this.renderUsers()}</aside>

        <div className="messaging-area">
          {renderChatBoxes()}

          {this.props.loading ? <LoadingSpinner /> : null}
        </div>

        <ChatInput />

        <div className="tip-container">
          <h1 className="tip">{this.state.tip}</h1>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.appState.currentUser,
    lists: state.appState.lists,
    openChats: state.appState.openChats,
    recipientUser: state.appState.recipientUser,
    chat: state.appState.chat,
    speechPrompt: state.appState.prompts.speechPrompt,
    selectedMessage: state.appState.selectedMessage,
    translation: state.appState.translation,
    translatePrompt: state.appState.prompts.translatePrompt,
    savePrompt: state.appState.prompts.savePrompt,
    spokenLanguages: state.appState.spokenLanguages,
    loading: state.appState.loading,
    transcription: state.appState.transcription,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLists: lists => dispatch(updateLists(lists)),
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
