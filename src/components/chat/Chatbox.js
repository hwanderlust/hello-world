import React from "react";
import { Rnd } from "react-rnd";
import MessageContainer from "./MessageContainer";
import { getChatMessages } from "../../adapter";
import {
  updateMessages,
  updateRecipientUser,
  updateChat,
  toggleSpeech,
  updateSelectedMsg,
  toggleTranslate,
  toggleSave,
  closeChat,
  updateChatbox
} from "../../actions";
import { connect } from "react-redux";
import { ActionCable } from "react-actioncable-provider";

class Chatbox extends React.PureComponent {
  state = {
    messages: null,
    bgColor: null,
    z: 0
  };

  componentDidMount() {
    console.log("CHATBOX MOUNTED", this.props);
    if (this.props.chat) {
      this.handleUpdateMsgs();
      this.setState({ bgColor: this.props.bgColor }, () =>
        console.log(this.state)
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages) {
      if (this.state.messages.length() !== this.props.messages.length()) {
        this.setState({ messages: this.props.messages }, () => {
          console.log(this.state);
          this.scrollToBottom();
        });
      }
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    this.messagesEnd.focus();
  };

  handleReceiveMsgs = response => {
    console.log(response);
    this.handleUpdateMsgs();
    this.scrollToBottom();
  };

  handleUpdateMsgs = () => {
    getChatMessages(this.props.chat.id).then(messages =>
      this.setState({ messages }, () => this.scrollToBottom())
    );
  };

  handleSpeechClick = msg => {
    if (!this.props.speechPrompt) {
      this.props.toggleSpeech();
    }
    this.props.updateSelectedMsg(msg);
  };

  handleTranslateClick = msg => {
    if (!this.props.translatePrompt) {
      this.props.toggleTranslate();
    }
    console.log(msg.text);
    const term = encodeURI(msg.text);
    this.props.updateSelectedMsg(term);
  };

  handleSaveMsgClick = msg => {
    if (!this.props.savePrompt) {
      this.props.toggleSave();
    }
    this.props.handleSaveMsgSelection(msg);
  };

  handleBoxClick = e => {
    const user = e.target.dataset.username;
    const chatId = parseInt(e.target.dataset.chat, 10);
    const userId = parseInt(e.target.dataset.userid, 10);

    if (user && chatId && userId) {
      console.log(e.target.dataset);
      console.log(`activeChat:`, this.props.activeChat);

      if (this.props.activeChat !== chatId) {
        this.props.updateChat(chatId);
        const recUser = {
          id: userId,
          username: user
        };
        this.props.updateRecipientUser(recUser);
        this.setState({ z: this.state.z + 1 }, () => console.log(this.state));
        return;
      }
    }

    const thisChat = this.props.openChats.find(chat => chat.id === chatId);
    if (thisChat) {
      if (
        thisChat.chatbox.x !== e.screenX ||
        thisChat.chatbox.y !== e.screenY
      ) {
        this.props.updateChatbox({ chatId, x: e.screenX, y: e.screenY });
        return;
      }
    }
  };

  handleXClick = e => {
    const chatId = parseInt(e.target.parentElement.dataset.chat, 10);
    if (chatId) {
      if (this.props.openChats.map(c => c.id).includes(chatId)) {
        this.props.closeChat(chatId);
        return;
      } else {
        return console.log(`chat isn't open`, this.props.openChats);
      }
    } else {
      return console.log(`no chat id:`, e.target.parentElement.dataset);
    }
  };

  render() {
    const renderMessages = () => {
      if (this.state.messages) {
        const sortedMessages = this.state.messages
          .slice()
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        return sortedMessages.map(msg => (
          <MessageContainer
            handleSpeechClick={this.handleSpeechClick}
            handleTranslateClick={this.handleTranslateClick}
            handleSaveMsgClick={this.handleSaveMsgClick}
            key={msg.id}
            msg={msg}
          />
        ));
      }
    };

    const renderMsgActionCable = () => {
      return (
        <ActionCable
          channel={{ channel: "MessagesChannel", chat: this.props.chat.id }}
          onReceived={this.handleReceiveMsgs}
        />
      );
    };

    const renderMsgHeader = () => {
      if (this.props.chat.recipient_user) {
        const username = this.props.chat.recipient_user.username.toUpperCase();
        return `${username} - ${this.props.chat.id}`;
      }
    };

    const style = {
      border: "1px solid white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      overflowY: "scroll",
      overflowX: "hidden",
      boxSizing: "border-box",
      backgroundColor: this.state.bgColor,
      zIndex: this.state.z
    };

    return (
      <React.Fragment>
        {renderMsgActionCable()}

        <Rnd
          id="chatbox"
          style={style}
          key={this.props.chat.id}
          data-chat={this.props.chat.id}
          data-userid={
            this.props.chat.recipient_user
              ? this.props.chat.recipient_user.id
              : null
          }
          data-username={
            this.props.chat.recipient_user
              ? this.props.chat.recipient_user.username
              : null
          }
          onClick={this.handleBoxClick}
          default={{
            x: this.props.x,
            y: this.props.y,
            width: 500,
            height: 250
          }}
        >
          <div
            className="msg-top"
            data-chat={this.props.chat.id}
            data-userid={
              this.props.chat.recipient_user
                ? this.props.chat.recipient_user.id
                : null
            }
            data-username={
              this.props.chat.recipient_user
                ? this.props.chat.recipient_user.username
                : null
            }
            onClick={this.handleBoxClick}
          >
            <span id="msg-close" onClick={this.handleXClick}>
              X
            </span>
            {this.props.chat ? renderMsgHeader() : null}
          </div>

          {this.state.messages ? renderMessages() : null}

          <div
            style={{ marginTop: "0.5rem" }}
            ref={el => (this.messagesEnd = el)}
          />
        </Rnd>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipientUser: state.appState.recipientUser,
    currentUser: state.appState.currentUser,
    translatePrompt: state.appState.prompts.translatePrompt,
    speechPrompt: state.appState.prompts.speechPrompt,
    savePrompt: state.appState.prompts.savePrompt,
    openChats: state.appState.openChats,
    activeChat: state.appState.chat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMessages: messages => dispatch(updateMessages(messages)),
    updateRecipientUser: user => dispatch(updateRecipientUser(user)),
    updateChat: chat => dispatch(updateChat(chat)),
    toggleSpeech: () => dispatch(toggleSpeech()),
    updateSelectedMsg: msg => dispatch(updateSelectedMsg(msg)),
    toggleTranslate: () => dispatch(toggleTranslate()),
    toggleSave: () => dispatch(toggleSave()),
    closeChat: chats => dispatch(closeChat(chats)),
    updateChatbox: chat => dispatch(updateChatbox(chat))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatbox);
