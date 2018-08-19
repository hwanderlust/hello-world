import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from '../Home';
import Chat from './Chat'

import { getAllUsers, getUser, createChat, getChatMessages } from '../../adapter';
import { updateUsers, updateRecipientUser, openChat, updateMessages, updateChat } from '../../actions'

class ChatContainer extends React.Component {
  state = {
    users: null,
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
      this.props.updateRecipientUser(user)
    })
  }

  handleNewChat = (user) => {
    getUser(user.recipient_id).then(user => {
      this.props.updateRecipientUser(user)
    }).then(data => {
      createChat({...user, sender_id: this.props.currentUser.id})
        .then(chat => {
          this.props.updateChat(chat.id)
          // construct chat obj here with recipientUser
          const chatObj = {...chat,
            recipient_user: {id: this.props.recipientUser.id, username: this.props.recipientUser.username}
          }
          this.props.openChat(chatObj)
          getChatMessages(chat.id).then(messages => {
            const chatObjMsgs = {...chatObj, messages}
            this.props.updateMessages(chatObjMsgs)
          })
        })
    })
  }

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
    updateChat: (chat) => dispatch(updateChat(chat)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatContainer));
