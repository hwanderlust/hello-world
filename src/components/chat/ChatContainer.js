import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from '../Home';
import Chat from './Chat'

import { getAllUsers, getUser, createChat, getChatMessages, createMessage } from '../../adapter';
import { updateChat, updateRecipientUser, updateMessages, message360, updateUsers } from '../../actions/index'

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
    // this.handleUsers()
    // this.setState({users: this.props.users}, () => console.log(this.state))
    console.log('CHATCONTAINER DIDMOUNT');
    getAllUsers().then(users => this.props.updateUsers(users))
    .then(nada => {
      this.setState({users: this.props.users}, () => console.log(this.state))
    })
  }

  componentDidUpdate(prevProps, prevState) {
  }

  handleUsers = () => {
    getAllUsers().then(users => this.setState({users}, () => console.log(this.state)))
  }

  setRecipient = (user) => {
    // add recipientUser to store here
    // messages are already saved in the store so access with mapStateToProps in Chat
    // filter for messages in Chat using recipientUser and msgs from store

    // getUser(user.recipient_id)
    //   .then(user => this.props.updateRecipientUser(user))
    //   .then(x => this.filterChatMessages(this.props.messages))

      getUser(user.id)
        .then(user => this.props.updateRecipientUser(user))
        // .then(x => this.filterChatMessages(this.props.messages))
  }

  createNewChat = (user) => {
    const { currentUser, updateChat } = this.props

    createChat({...user, sender_id: currentUser.id})
      .then(chat => {
        updateChat(chat)
        localStorage.setItem('chat', chat.id)
      })
  }

  handleNewChat = (user) => {
    // if(!this.props.messages){
    //   // debugger
    // }
    this.setChatMessages()
    this.setRecipient(user)
    this.createNewChat(user)
    this.renderChat()
  }

  // renderHome = () => {
  //   return this.state.users ? <Home users={this.state.users} handleNewChat={this.handleNewChat} renderChat={this.renderChat} /> : null
  // }

  // setChatMessages = () => {
  //   this.props.updateMessages(this.props.currentUser.id)
  //   this.filterChatMessages()
  // }

  setChatMessages = () => {
    getChatMessages(this.props.currentUser.id).then(messages => {
      const filtered = this.filterChatMessages(messages)
      this.props.updateMessages(filtered)
      const msgs = messages.map(msg => msg.id)
      localStorage.setItem('msgs', msgs)
    })
  }

  filterChatMessages = (messages) => {
    const { recipientUser, currentUser } = this.props
    // debugger
    const sentMsgs = messages.filter(msg => msg.sender_id === currentUser.id && msg.recipient_id === recipientUser.id)
    console.log(messages);
    if(currentUser.id === recipientUser.id) {
      console.log('same user!');
      const flags = {};
      const filtered = sentMsgs.filter(msg => {
        if (flags[msg.id]) {
          return false;
        }
          flags[msg.id] = true;
          return true;
        });
        this.setState({messages: filtered}, () => console.log(this.state))
      return filtered

    } else {
      console.log('diff user!');
      const recMsgs = messages.filter(msg => msg.recipient_id === currentUser.id && msg.sender_id === recipientUser.id)

      const allMsgs = [...sentMsgs, ...recMsgs]
      this.setState({messages: allMsgs}, () => console.log(this.state))
      return allMsgs
    }
  }

  renderChat = () => {
    this.props.history.push('/chat')
  }

  newMessage = (message) => {
    const users = {sender_id: this.props.currentUser.id, recipient_id: this.props.recipientUser.id}
    console.log('NEWMESSAGE', message);
    // this.props.message360({...message, ...users})
    // console.log(this.props);
    createMessage({...message, ...users})
    this.setChatMessages()
  }


  render() {
    const renderChatComponents = () => {
      switch(this.props.chatReq) {
        case 'home':
        return <Home users={this.state.users} handleUsers={this.handleUsers} handleNewChat={this.handleNewChat} />
        case 'chat':
        return <Chat messages={this.state.messages} newMessage={this.newMessage} setChatMessages={this.setChatMessages} />
        default:
        console.log(`Chat request is wrong`);
        break
      }
    }
    return (
      <div>
        { this.state.users ? renderChatComponents() : null }
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.appState.currentUser,
    messages: state.appState.messages,
    recipientUser: state.appState.recipientUser,
    users: state.appState.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateChat: (chat) => dispatch(updateChat(chat)),
    updateRecipientUser: (user) => dispatch(updateRecipientUser(user)),
    updateMessages: (messages) => dispatch(updateMessages(messages)),
    message360: (msg) => dispatch(message360(msg)),
    updateUsers: (users) => dispatch(updateUsers(users))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatContainer));
