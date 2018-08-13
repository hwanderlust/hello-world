import React from 'react';
import { connect } from 'react-redux'

class Nav extends React.Component {

  state = {
    loggedIn: false,
  }

  componentDidMount() {
    if(this.props.currentUser) {
      this.setState({loggedIn: true}, () => console.log(this.state))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.currentUser && !this.state.loggedIn) {
      this.setState({loggedIn: true}, () => console.log(this.state))
    }
  }


  render() {

    const loggedInItems = () => {
      return (
        <React.Fragment>
          <a href='/profile' className='nav-item'><li>Profile</li></a>
          <a href='/chat' className='nav-item'><li>Chat</li></a>
        </React.Fragment>
      )
    }

    const NotLoggedInItems = () => {
      return (
        <React.Fragment>
          <a href='/signup' className='nav-item'><li>Signup</li></a>
          <a href='/login' className='nav-item'><li>Login</li></a>
        </React.Fragment>
      )
    }

    return (
      <div className='nav' >
        <a href='/home' className='nav-item'><li>Home</li></a>
        <a href='/about' className='nav-item'><li>About</li></a>
        <a href='/contact' className='nav-item'><li>Contact</li></a>
        { this.state.loggedIn ? loggedInItems() : NotLoggedInItems() }
      </div>
    )
  }

};

const mapStateToProps = (state) => {
  return {
    currentUser: state.appState.currentUser
  }
}

export default connect(mapStateToProps)(Nav);
