import React from 'react';
import { Rnd } from "react-rnd";
import Message from './Message'
import { getChatMessages } from '../../adapter'
import { updateMessages, updateRecipientUser, updateChat } from '../../actions'
import { connect } from 'react-redux'
import { ActionCable } from 'react-actioncable-provider';

const style = {
  border: '1px solid white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  overflowY: 'scroll',
  overflowX: 'hidden',
  boxSizing: 'border-box'
}

class Chatbox extends React.Component {
  state = {
    messages: null,
  }

  // now that chat is now a chatObj with messages nested inside, could prob get rid of messages and then each Chatbox would have its own chat state??

  componentDidMount() {
    if(this.props.chat) {
      this.handleUpdateMsgs()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.messages) {
      if(this.state.messages.length() !== this.props.messages.length()) {
        this.setState({messages: this.props.messages}, () => {
          console.log(this.state)
          this.scrollToBottom()
        })
      }
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  handleReceiveMsgs = response => {
    console.log(response);
    this.handleUpdateMsgs()
    this.scrollToBottom()
  }

  handleUpdateMsgs = () => {
    getChatMessages(this.props.chat.id).then(messages => this.setState({messages}, () => this.scrollToBottom()))
  }

  handleSpeechClick = (msg) => {
    this.props.checkRenderedForms('speech')
    this.props.handleSpeechChange(msg)
  }

  handleTranslationClick = () => {
    this.props.checkRenderedForms('translation')
    this.props.handleTranslation()
  }

  handleSaveMsgClick = (msg) => {
    this.props.checkRenderedForms('save')
    this.props.handleSaveMsgChange(msg)
  }

  handleBoxClick = (e) => {
    if(e.target.dataset.username) {
      console.log(e.target.dataset);
      this.props.updateChat(e.target.dataset.chat)
      const recUser = {id: e.target.dataset.userid, username: e.target.dataset.username}
      this.props.updateRecipientUser(recUser)
    }
  }

  render() {

    const renderMessages = () => {
      const sortedMessages = this.state.messages.slice().sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
      return sortedMessages.map(msg => <Message handleSpeechClick={this.handleSpeechClick} handleTranslationClick={this.handleTranslationClick} handleSaveMsgClick={this.handleSaveMsgClick} key={msg.id} msg={msg} />)
    }

    const renderMsgActionCable = () => {
      return (
        <ActionCable channel={{ channel: 'MessagesChannel', chat: this.props.chat.id }} onReceived={this.handleReceiveMsgs} />
      )
    }

    return (
      <React.Fragment>
        { renderMsgActionCable() }

        <Rnd
          id='chatbox'
          style={style}
          key={this.props.chat.id}
          data-chat={this.props.chat.id}
          data-userId={this.props.chat.recipient_user.id}
          data-username={this.props.chat.recipient_user.username}
          onClick={this.handleBoxClick}
          default={{
            x: 300,
            y: 300,
            width: 500,
            height: 250,
          }}
        >
          <div className='msg-top'
            data-chat={this.props.chat.id}
            data-userId={this.props.chat.recipient_user.id}
            data-username={this.props.chat.recipient_user.username}
            onClick={this.handleBoxClick}>
            {this.props.chat ? this.props.chat.recipient_user.username.toUpperCase() : null}
          </div>

          { this.state.messages ? renderMessages() : null }

          <div style={{marginTop: '0.5rem'}} ref={el => this.messagesEnd = el }></div>
        </Rnd>

      </React.Fragment>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    recipientUser: state.appState.recipientUser,
    currentUser: state.appState.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: (messages) => dispatch(updateMessages(messages)),
    updateRecipientUser: (user) => dispatch(updateRecipientUser(user)),
    updateChat: (chat) => dispatch(updateChat(chat)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);
