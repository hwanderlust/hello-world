import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import AuthContainer from './components/auth/AuthContainer'
import ChatContainer from './components/chat/ChatContainer'

import { getUser, getChat, getMsgs } from './adapter'
import { updateUser, updateChat, updateMessages } from './actions/index'

// App will check to see if a user is already logged in with getUser
// AuthController will take care of login and signup though
//

class App extends Component {

  componentDidMount() {
    const loggedIn = localStorage.getItem('token')
    if (loggedIn) {
      getUser(loggedIn).then(user => {
        if (user) {
          this.props.updateUser(user)
        } else {
          this.props.history.push('/logout')
        }
      })

      const chat = localStorage.getItem('chat')
      if (chat) {
        getChat(chat).then(chat => this.props.updateChat(chat))
      }

      // const msgs = localStorage.getItem('msgs')
      // if (msgs) {
      //   getMsgs(msgs).then(messages => this.props.updateMessages(messages))
      // }
    }
    console.log('App componentDidMount');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');
  }

  checkLogin = () => {
    const loggedIn = localStorage.getItem('token')
    return loggedIn ? null : this.props.history.push('/login')
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={props => {
            this.checkLogin()
            return <Redirect to='/home' />
          }}/>
          <Route path='/signup' render={props => {
            return <AuthContainer authRequest='signup' />
          }} />
          <Route path='/login' render={props => {
            return <AuthContainer authRequest='login' />
          }} />
          <Route path='/chat' render={props => {
            this.checkLogin()
            return <ChatContainer chatReq='chat' />
          }} />
          <Route path='/logout' render={props => {
            return <AuthContainer authRequest='logout' />
          }} />
          <Route path='/home' render={props => {
            this.checkLogin()
            return <ChatContainer chatReq='home' />
          }}/>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    updateChat: (chat) => dispatch(updateChat(chat)),
    updateMessages: (msgs) => dispatch(updateMessages(msgs))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
