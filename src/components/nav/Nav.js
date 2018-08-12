import React from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 10vw;
  justify-content: center;
  border: 1px solid black;
`

const Link = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
)

const NavItem = styled(Link)`
  font-family: 'Shrikhand', 'cursive';
  font-size: 1em;
  list-style: none;
  align-self: center;
  flex: 1;
  margin: 1vw;
`

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
          <NavItem>Profile</NavItem>
          <NavItem>Chats</NavItem>
        </React.Fragment>
      )
    }

    const NotLoggedInItems = () => {
      return (
        <React.Fragment>
          <NavItem>Signup</NavItem>
          <NavItem>Login</NavItem>
        </React.Fragment>
      )
    }

    return (
      <NavWrapper>
        {/* <a href='/home'><li>Home</li></a> */}
        <NavItem>Home</NavItem>
        <NavItem>About</NavItem>
        <NavItem>Contact</NavItem>
        { this.state.loggedIn ? loggedInItems() : NotLoggedInItems() }
      </NavWrapper>
    )
  }

};

const mapStateToProps = (state) => {
  return {
    currentUser: state.appState.currentUser
  }
}

export default connect(mapStateToProps)(Nav);
