import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Auth from './Auth'

import { login, signup } from '../../adapter'
import { updateUser, removeUser } from '../../actions/index'

class AuthContainer extends React.Component {
  // state ={
  //   login: false,
  // }

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
    // this.setState({login: true}, () => console.log(this.state))

    updateUser(userData)
    history.push('/chat')
  }

  handleAuth = (user) => {
    if(window.location.pathname === '/login') {
        login(user)
          .then(userData => {
            if(userData.error) {
              alert(userData.error)
            } else {
              this.setupUser(userData)
            }
          })

    } else {
      signup(user).then(userData => {
        if(userData.error) {
          if(typeof userData.error === 'string') {
            alert(userData.error)
          } else {
            const firstErrorKey = Object.keys(userData.error)[0].replace(/^\w/, c => c.toUpperCase())
            alert(`${firstErrorKey} ${userData.error[Object.keys(userData.error)[0]]}`)
          }
          window.location.reload();
        } else {
          this.setupUser(userData)
        }
      })
    }


  }

  handleLogout = () => {
    localStorage.removeItem("token")
    // this.setState({login: false}, () => console.log(this.state))
    // localStorage.removeItem("chat")
    // localStorage.removeItem("msgs")
    removeUser()
    this.props.history.push('/login')
  }

  render() {

    return (
      <React.Fragment>
        {/* <Auth handleAuth={this.handleAuth} login={this.state.login} /> */}
        <Auth handleAuth={this.handleAuth} />
      </React.Fragment>
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
