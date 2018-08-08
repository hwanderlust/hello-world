import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from '../Home';
import Chat from '../Chat';

import { getAllUsers, getUser, createChat, getChatMessages, createMessage } from '../../adapter';

// renders available users to chat with

// fetches chat from backend
// fetches messages from backend

// registers chat with store
// registers messages with store

// renders existing messages for a chat

class ChatContainer extends React.Component {
  state = {
    users: null,
    chat: null,
    messages: null,
    recipientUser: null,
  }

  componentDidMount() {
    this.handleUsers()
  }

  handleUsers = () => {
    getAllUsers().then(users => this.setState({users}, () => console.log(this.state)))
  }

  setRecipient = (user) => {
    getUser(user.recipient_id).then(user => this.setState({recipientUser: user}, () => console.log(this.state)))
  }

  createNewChat = (user) => {
    createChat({...user, sender_id: this.props.currentUser.id})
      .then(chat => this.setState({chat}, () => console.log(this.state)))
  }

  handleNewChat = (user) => {
    this.setRecipient(user)
    this.createNewChat(user)
  }

  renderHome = () => {
    return this.state.users ? <Home users={this.state.users} handleUsers={this.handleUsers} handleNewChat={this.handleNewChat} renderChat={this.renderChat} /> : null
  }

  setChatMessages = () => {
    getChatMessages(this.props.currentUser.id).then(messages => {
      this.setState({messages: this.filterChatMessages(messages)})
    })
  }

  filterChatMessages = (messages) => {
      const { recipientUser } = this.state
      const { currentUser } = this.props
      // debugger
      const sentMsgs = messages.filter(msg => msg.sender_id === currentUser.id && msg.recipient_id === recipientUser.id)

      if(currentUser.id === recipientUser.id) {
        const flags = {};
        const filtered = sentMsgs.filter(msg => {
          if (flags[msg.id]) {
            return false;
          }
            flags[msg.id] = true;
            return true;
          });
        return filtered

      } else {
        const recMsgs = messages.filter(msg => msg.recipient_id === currentUser.id && msg.sender_id === recipientUser.id)

        const allMsgs = [...sentMsgs, ...recMsgs]
        return allMsgs
      }
  }

  renderChat = () => {
    this.setChatMessages()
    this.props.history.push('/chat')
  }

  newMessage = (message) => {
    const users = {sender_id: this.props.currentUser.id, recipient_id: this.state.recipientUser.id}
    createMessage({...message, ...users})
  }

  renderChatComponents = () => {
    if(this.state.users) {
      switch(this.props.chatReq) {
        case 'home':
        return <Home users={this.state.users} handleUsers={this.handleUsers} handleNewChat={this.handleNewChat} renderChat={this.renderChat} />
        case 'chat':
        return <Chat chat={this.state.chat} messages={this.state.messages} newMessage={this.newMessage} setChatMessages={this.setChatMessages} />
        default:
        console.log(`Chat request is wrong`);
        break
      }
    }
  }

  render() {
    return (
      <div>
        { this.renderChatComponents() }
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.appState.currentUser
  }
}

export default withRouter(connect(mapStateToProps)(ChatContainer));


// newMessage = (message) => {
//   const users = {sender_id: this.state.currentUser.id, recipient_id: this.state.recipientUser.id}
//   createMessage({...message, ...users})
// }
//
// setChatMessages = () => {
//   getChatMessages(this.state.currentUser.id).then(messages => this.setState({messages}))
// }
//
// passChatMessages = () => {
//   if(this.state.recipientUser) {
//     const { messages, currentUser, recipientUser } = this.state
//
//     const sentMsgs = messages.filter(msg => msg.sender_id === currentUser.id && msg.recipient_id === recipientUser.id)
//
//     if(currentUser.id === recipientUser.id) {
//       var flags = {};
//       var filtered = sentMsgs.filter(msg => {
//         if (flags[msg.id]) {
//           return false;
//         }
//           flags[msg.id] = true;
//           return true;
//         });
//       return filtered
//     } else {
//       const recMsgs = messages.filter(msg => msg.recipient_id === currentUser.id && msg.sender_id === recipientUser.id)
//
//       const allMsgs = [...sentMsgs, ...recMsgs]
//       return allMsgs
//     }
//   }
// }
