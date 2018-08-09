import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Signup from './Signup'
import Login from './Login'

import { login, signup } from '../../adapter'
import { updateUser, removeUser } from '../../actions/index'

// App renders AuthContainer
// App passes down the type of request -- login or signup
// based on the props => render login or signup component
// updates currentUser in store
// login and signup will have state for username and password
// AuthContainer will make login and signup requests via adapter
// setChatMessages() => do this in ChatController instead

class AuthContainer extends React.Component {

  renderAuthComponents = () => {
    const { authRequest } = this.props

    switch(authRequest) {
      case 'signup':
        return <Signup handleSignup={this.handleSignup} />
      case 'login':
        return <Login handleLogin={this.handleLogin} />
      case 'logout':
        this.handleLogout()
        break
      default:
        console.log('auth request failed');
    }
  }

  setupUser = (userData) => {
    const { updateUser, history } = this.props

    localStorage.setItem('token', userData.id)
    updateUser(userData)
    history.push('/home')
  }

  handleLogin = (user) => {
    login(user).then(userData => this.setupUser(userData))
  }

  handleSignup = (user) => {
    signup(user).then(userData => this.setupUser(userData))
  }

  handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('chat')
    localStorage.removeItem('msgs')
    removeUser()
    this.props.history.push('/login')
  }

  render() {

    return (
      <div>
        { this.renderAuthComponents() }
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    removeUser: () => dispatch(removeUser())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(AuthContainer));
