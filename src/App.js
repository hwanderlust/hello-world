import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import AuthContainer from './components/auth/AuthContainer'
import ChatContainer from './components/chat/ChatContainer'

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

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={props => {
            return <Redirect to='/login' />
          }}/>
          <Route path='/signup' render={props => {
            return <AuthContainer authRequest='signup' />
          }} />
          <Route path='/login' render={props => {
            return <AuthContainer authRequest='login' />
          }} />
          <Route path='/chat' render={props => {
            return <ChatContainer chatReq='chat' />
          }} />
          <Route path='/logout' render={props => {
            return <AuthContainer authRequest='logout' />
          }} />
          <Route path='/home' render={props => {
            return <ChatContainer chatReq='home' />
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
