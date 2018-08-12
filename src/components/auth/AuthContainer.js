import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Auth from './Auth'

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
  state ={
    login: false,
  }

  componentDidMount() {
    if(window.location.pathname === '/logout') {
      this.handleLogout()
    } else {
      const loggedIn = localStorage.getItem('token')
      if(loggedIn) {
        this.props.history.push('/home')
      }
    }
  }

  setupUser = (userData) => {
    const { updateUser, history } = this.props

    localStorage.setItem('token', userData.id)
    this.setState({login: true}, () => console.log(this.state))

    updateUser(userData)
    history.push('/home')
  }

  handleAuth = (user) => {
    window.location.pathname === '/login' ?

    login(user).then(userData => this.setupUser(userData))

    : signup(user).then(userData => this.setupUser(userData))
  }

  handleLogout = () => {
    localStorage.removeItem("token")
    this.setState({login: false}, () => console.log(this.state))
    // localStorage.removeItem("chat")
    // localStorage.removeItem("msgs")
    removeUser()
    this.props.history.push('/login')
  }

  render() {

    return (
      <div>
        <Auth handleAuth={this.handleAuth} login={this.state.login} />
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
