import React from 'react';
import { connect } from "react-redux";
import spoken from "../../../node_modules/spoken/build/spoken";
import { createMessage } from "../../adapter";
import {
  closeChat,
  clearTranslation,
  toggleTranslate,
  clearSelectedMsg,
  toggleSpinner,
  closeChats,
  setTranscription,
  clearTranscription,
} from "../../actions";

class ChatInput extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      text: "",
      placeholder: ""
    };

    this.inputFocus = React.createRef();
  }

  componentDidMount() {
    this.focusInput();
  }

  // use context api to pass this trigger this focus fn in other components?
  focusInput = () => {
    this.inputFocus.focus();
  }

  clearText = () => {
    this.setState({ text: "" }, () => console.log(this.state));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      console.log(this.state)
    );
  };

  handleSubmit = e => {
    e.preventDefault();

    e.persist();
    if (this.handleTextShortcuts()) {

      const text = this.props.translation || this.state.text
      this.newMessage({ chat_id: this.props.chat, text: this.state.text });

      if (this.props.translation === text) {
        this.props.clearTranslation();
      }
    }

    this.clearText();
  };

  handleTextShortcuts = () => {
    const splitted = this.state.text.split(" ");
    // eslint-disable-next-line
    const [firstWord, secondWord] = splitted;

    switch (firstWord) {
      case "//T":
        this.handleTranslateShortcut();
        return false;
      case "//L":
        this.handleTranscribeShortcut();
        return false;
      case "//C":
        this.handleCloseChatShortcut();
        return false;

      default:
        return true;
    }
  };

  handleTranslateShortcut = () => {
    this.clearText();
    this.props.toggleTranslate();
  };

  handleTranscribeShortcut = () => {
    this.setState({ text: "speak now" }, () => console.log(this.state));
    this.props.toggleSpinner();
    this.handleTranscription();
  };

  handleTranscription = () => {
    spoken
      .listen()
      .then(transcript => {
        console.log(transcript);
        this.props.setTranscription(transcript)
        this.props.toggleSpinner();
      })
      .catch(error => console.warn(error.message));
  };

  handleCloseChatShortcut = () => {
    const splitted = this.state.text.split(" ");
    // eslint-disable-next-line
    const [firstWord, secondWord] = splitted;

    if (!secondWord) {
      alert(`You gotta give the chat number--you can find it after the user's name on the chat window!`);
      return;
    }

    if (secondWord.toLowerCase() === "all") {
      if (this.props.openChats.length > 0) {
        this.props.closeChats();
        this.clearText();
      } else {
        alert(`Oh no, no chat windows to close!`);
      }
    }

    if (this.props.openChats.map(c => c.id).includes(Number(secondWord))) {
      this.props.closeChat(Number(secondWord));
      this.clearText();
    } else {
      alert(`Sorry but that chat isn't open, or you might have a typo.`);
    }
  };

  newMessage = message => {
    if (this.props.recipientUser) {
      const users = {
        sender_id: this.props.currentUser.id,
        recipient_id: this.props.recipientUser.id
      };
      createMessage({ ...message, ...users });
    } else {
      alert(`you may have to choose someone to chat with first...`);
    }
  };

  handleKeyDown = (e) => {
    if (e.key === "Escape") {
      
      if(this.state.text) {
        this.clearText();
      }

      if(this.props.translation) {
        this.props.clearSelectedMsg();
        this.props.clearTranslation();
      }

      if(this.props.transcription) {
        this.props.clearTranscription();
      }
    }
  }
  

  render() {
    return (
      <form className="chat-input-wrapper" onSubmit={this.handleSubmit} onKeyDown={this.handleKeyDown} >
        <input
          className="chat-input"
          type="text"
          name="text"
          placeholder={this.state.placeholder}
          value={this.props.translation || this.props.transcription || this.state.text || ""}
          onChange={this.handleChange}
          autoFocus="true"
          ref={c => (this.inputFocus = c)}
        />
      </form>
    );
  }
}


const mapStateToProps = state => {
  return {
    currentUser: state.appState.currentUser,
    openChats: state.appState.openChats,
    recipientUser: state.appState.recipientUser,
    chat: state.appState.chat,
    selectedMessage: state.appState.selectedMessage,
    translation: state.appState.translation,
    transcription: state.appState.transcription,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeChat: chats => dispatch(closeChat(chats)),
    clearTranslation: () => dispatch(clearTranslation()),
    toggleTranslate: () => dispatch(toggleTranslate()),
    clearSelectedMsg: () => dispatch(clearSelectedMsg()),
    toggleSpinner: () => dispatch(toggleSpinner()),
    closeChats: () => dispatch(closeChats()),
    setTranscription: (transcription) => dispatch(setTranscription(transcription)),
    clearTranscription: () => dispatch(clearTranscription()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);