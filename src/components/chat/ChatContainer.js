import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from '../Home';
import Chat from './Chat'

import { getAllUsers, getUser, createChat, getChatMessages } from '../../adapter';
import { updateUsers, updateRecipientUser, openChat, updateMessages } from '../../actions'

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
    getAllUsers().then(users => {
      const sortedUsers = users.slice().sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
      this.props.updateUsers(sortedUsers)
      return sortedUsers
    }).then(users => this.setState({users}, () => console.log(this.state)))
  }

  setRecipient = (user) => {
    getUser(user.recipient_id).then(user => {
      // save recipientUser to store and gain access to it from Message to help position messages
      this.props.updateRecipientUser(user)
      this.setState({recipientUser: user}, () => console.log(this.state))
    })
  }

  createNewChat = (user) => {
    createChat({...user, sender_id: this.props.currentUser.id})
      .then(chat => {
        // want to save in store instead and gain access from chatbox
        // or from chat and send to chatbox as props
        this.props.openChat(chat)
        this.setState({chat}, () => console.log(this.state))
        getChatMessages(chat.id).then(messages => {
          const chatObj = {...chat, messages}
          this.props.updateMessages(chatObj)
        })
      })
  }

  handleNewChat = (user) => {
    // this.setRecipient(user)
    // this.createNewChat(user)
    getUser(user.recipient_id).then(user => {
      this.props.updateRecipientUser(user)
      this.setState({recipientUser: user}, () => console.log(this.state))
    }).then(data => {
      createChat({...user, sender_id: this.props.currentUser.id})
        .then(chat => {
          // construct chat obj here with recipientUser
          const chatObj = {...chat,
            recipient_user: {id: this.props.recipientUser.id, username: this.props.recipientUser.username}
          }
          this.props.openChat(chatObj)
          this.setState({chat}, () => console.log(this.state))
          getChatMessages(chat.id).then(messages => {
            const chatObjMsgs = {...chatObj, messages}
            this.props.updateMessages(chatObjMsgs)
          })
        })
    })
  }

  // renderChat = () => {
    // this.setChatMessages()
    // necessary? already on the same page...
    // this.props.history.push('/chat')
  // }

  // setChatMessages = () => {
  //   // this fn still necessary tho for new messages in chatbox but could move this fn down to either chat or chatbox
  //   getChatMessages(this.props.currentUser.id).then(messages => {
  //     // filter messages and then save to store instead and gain access from chatbox
  //     // or from chat and send to chatbox as props
  //     const filteredMsgs = this.filterChatMessages(messages)
  //     this.props.updateMessages(filteredMsgs)
  //     this.setState({messages: filteredMsgs})
  //   })
  // }

  filterChatMessages = (messages) => {
      const { recipientUser } = this.state
      const { currentUser } = this.props
      // debugger
      if(currentUser && recipientUser) {
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
  }

  // newMessage = (message) => {
  //   const users = {sender_id: this.props.currentUser.id, recipient_id: this.state.recipientUser.id}
  //   createMessage({...message, ...users})
  // }

  render() {
    const renderChatComponents = () => {
      if(this.state.users) {
        switch(this.props.chatReq) {
          case 'home':
            return <Home />
          case 'chat':
            return <Chat users={this.state.users} handleNewChat={this.handleNewChat} />
          default:
          console.log(`Chat request is wrong`);
          break
        }
      }
    }

    return (
      <div className='chat-container'>
        { renderChatComponents() }
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.appState.currentUser,
    recipientUser: state.appState.recipientUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsers: (users) => dispatch(updateUsers(users)),
    updateRecipientUser: (user) => dispatch(updateRecipientUser(user)),
    openChat: (chat) => dispatch(openChat(chat)),
    updateMessages: (messages) => dispatch(updateMessages(messages)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatContainer));
