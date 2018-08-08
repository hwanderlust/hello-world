import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Chat from './components/Chat'
import { login, signup, getUser, getAllUsers, createChat, getChatMessages, createMessage } from './adapter'

class App extends Component {
  state = {
    currentUser: null,
    chat: null,
    messages: null,
    recipientUser: null,
  }

  componentDidMount() {
    const loggedIn = localStorage.getItem('token')
    if (loggedIn) {
      getUser(loggedIn).then(user => {
        if (user) {
          this.setState({currentUser: user}, () => this.setChatMessages())
        } else {
          this.handleLogout()
          this.props.history.push('/login')
        }
      })
    }
  }

  handleLogin = (user) => {
    login(user).then(userData => {
      localStorage.setItem('token', userData.id)
      this.setState({currentUser: userData}, () => {
        this.setChatMessages()
        this.props.history.push('/home')
      })
    })
  }

  handleSignup = (user) => {
    signup(user).then(userData => {
      localStorage.setItem('token', userData.id)
      this.setState({currentUser: userData}, () => {
        this.setChatMessages()
        this.props.history.push('/home')
      })
    })
  }

  handleLogout = () => {
    localStorage.removeItem("token")
    this.setState({currentUser: null})
  }

  setAllUsers = () => {
    getAllUsers()
  }

  newChat = (users) => {
    getUser(users.recipient_id).then(user => this.setState({recipientUser: user}))
    createChat(users)
      .then(chat => this.setState({chat}, () => console.log(this.state)))
  }

  newMessage = (message) => {
    const users = {sender_id: this.state.currentUser.id, recipient_id: this.state.recipientUser.id}
    createMessage({...message, ...users})
  }

  setChatMessages = () => {
    getChatMessages(this.state.currentUser.id).then(messages => this.setState({messages}))
  }

  passChatMessages = () => {
    if(this.state.recipientUser) {
      const { messages, currentUser, recipientUser } = this.state

      const sentMsgs = messages.filter(msg => msg.sender_id === currentUser.id && msg.recipient_id === recipientUser.id)

      if(currentUser.id === recipientUser.id) {
        var flags = {};
        var filtered = sentMsgs.filter(msg => {
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

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={props => {
            return <Redirect to='/login' />
          }}/>
          <Route path='/signup' render={props => {
            return <Signup  signup={this.handleSignup} />
          }} />
          <Route path='/login' render={props => {
            return <Login login={this.handleLogin} currentUser={this.state.currentUser} />
          }} />
          <Route path='/chat' render={props => {
            return <Chat chat={this.state.chat} newMessage={this.newMessage} setChatMessages={this.setChatMessages} messages={this.passChatMessages()}  />
          }} />
          <Route path='/logout' render={props => {
            this.handleLogout()
            return <Redirect to='/login' />
          }}/>
          <Route path='/home' render={props => {
            return this.state.currentUser ? <Home users={getAllUsers} newChat={this.newChat} currentUser={this.state.currentUser} /> : <Redirect to='/login' />
          }}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
