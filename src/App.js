import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import { API_ROOT, HEADERS } from './constants'

import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Chat from './components/Chat'
import { login, signup, getUser, allUsers, createChat, getChatMessages } from './adapter'

class App extends Component {
  state = {
    currentUser: null,
    chat: null,
    messages: null,
  }

  componentDidMount() {
    const loggedIn = localStorage.getItem('token')
    if (loggedIn) {
      getUser(loggedIn).then(user => {
        if (user){
          this.setState({
            currentUser: user
          }, () => this.chatMessages())
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
        this.chatMessages()
        this.props.history.push('/home')
      })
    })
  }

  handleSignup = (user) => {
    signup(user).then(userData => {
      localStorage.setItem('token', userData.id)
      this.setState({currentUser: userData}, () => {
        this.chatMessages()
        this.props.history.push('/home')
      })
    })
  }

  handleLogout = () => {
    localStorage.removeItem("token")
    this.setState({
      currentUser: null
    })
  }

  getAllUsers = () => {
    allUsers()
  }

  newChat = () => {
    createChat().then(chat => this.setState({chat}))
  }

  newMessage = (message) => {
    const options = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({...message, user_id: this.state.currentUser.id})
    }

    fetch(`${API_ROOT}/messages`, options)
  }

  chatMessages = () => {
    getChatMessages(this.state.currentUser.id).then(messages => this.setState({messages}, () => console.log(this.state)))
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
            return <Chat chat={this.state.chat} newMessage={this.newMessage} chatMessages={this.chatMessages} messages={this.state.messages} />
          }} />
          <Route path='/logout' render={props => {
            this.handleLogout()
            return <Redirect to='/login' />
          }}/>
          <Route path='/home' render={props => {
            return this.state.currentUser ? <Home users={allUsers} newChat={this.newChat} /> : <Redirect to='/login' />
          }}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
