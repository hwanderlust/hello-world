import React from 'react';
import { connect } from 'react-redux'

class Nav extends React.Component {

  state = {
    loggedIn: false,
    // nav: 'nav is-closed',
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

  // handleMouseOver = () => {
  //   if(this.state.nav === 'nav is-closed') {
  //     this.setState({nav: 'nav is-open'}, () => console.log(this.state))
  //   }
  // }
  //
  // handleMouseLeave = () => {
  //   if(this.state.nav === 'nav is-open') {
  //     this.setState({nav: 'nav is-closed'}, () => console.log(this.state))
  //   }
  // }

  render() {

    const loggedInItems = () => {
      return (
        <React.Fragment>
          <a href='/profile' className='nav-item'>
            <li><i class="far fa-user-circle"></i><br/>Profile</li>
          </a>
          <a href='/lists' className='nav-item'>
            <li><i class="far fa-list-alt"></i><br/>Lists</li>
          </a>
          <a href='/chat' className='nav-item'>
            <li><i class="far fa-comment-alt"></i><br />Chat</li>
          </a>
          <a href='/logout' className='nav-item'>
            <li><i class="fas fa-sign-out-alt"></i><br/>Logout</li>
          </a>
        </React.Fragment>
      )
    }

    const NotLoggedInItems = () => {
      return (
        <React.Fragment>
          <a href='/login' className='nav-item'>
            <li><i class="fas fa-sign-in-alt"></i><br/>Login</li>
          </a>
        </React.Fragment>
      )
    }

    // const renderHamburger = () => {
    //   return (
    //     <button className='hamburger'>
    //       <span className='hamb hamb-top'></span>
    //       <span className='hamb hamb-mid'></span>
    //       <span className='hamb hamb-bot'></span>
    //     </button>
    //   )
    // }

    const renderNav = () => {
      return (
        <React.Fragment>
          <a href='/home' className='nav-item'>
            <li><i class="fas fa-home"></i><br/>Home</li>
          </a>
          <a href='/about' className='nav-item'>
            <li><i class="fas fa-info-circle"></i><br/>About</li>
          </a>
          <a href='/contact' className='nav-item'>
            <li><i class="far fa-address-card"></i><br/>Contact</li>
          </a>
          { this.state.loggedIn ? loggedInItems() : NotLoggedInItems() }
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>

        {/* { renderHamburger() } */}

        <div className='nav' onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} >

          { renderNav() }

        </div>

      </React.Fragment>
    )
  }

};

const mapStateToProps = (state) => {
  return {
    currentUser: state.appState.currentUser
  }
}

export default connect(mapStateToProps)(Nav);
