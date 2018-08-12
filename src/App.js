import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './App.css'

import AuthContainer from './components/auth/AuthContainer'
import ChatContainer from './components/chat/ChatContainer'
import Profile from './components/user/Profile'

import { getUser } from './adapter'
import { updateUser } from './actions/index'

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
    }
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
            return <AuthContainer />
          }} />
          <Route path='/login' render={props => {
            return <AuthContainer />
          }} />
          <Route path='/chat' render={props => {
            this.checkLogin()
            return <ChatContainer chatReq='chat' />
          }} />
          <Route path='/logout' render={props => {
            return <AuthContainer />
          }} />
          <Route path='/home' render={props => {
            this.checkLogin()
            return <ChatContainer chatReq='home' />
          }}/>
          <Route path='/user-profile' render={props => {
            this.checkLogin()
            return <Profile />
          }}/>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
