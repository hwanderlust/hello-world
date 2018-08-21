import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './css/App.css'
import './css/Nav.css'
import './css/TopBorder.css'
import './css/Profile.css'
import './css/Chat.css'
import './css/Auth.css'
import './css/List.css'
import './css/Lists.css'
import './css/Contact.css'

import AuthContainer from './components/auth/AuthContainer'
import ChatContainer from './components/chat/ChatContainer'
import Nav from './components/nav/Nav'
import TopBorder from './components/topborder/TopBorder'
import About from './components/About'
import Contact from './components/Contact'
import Profile from './components/user/Profile'
import ListContainer from './components/user/list/ListContainer'
import Home from './components/Home';

import { getUser } from './adapter'
import { updateUser } from './actions/index'

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
        <Nav />
        <TopBorder />
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
            return <ChatContainer />
          }} />
          <Route path='/logout' render={props => {
            return <AuthContainer />
          }} />
          <Route path='/home' component={Home}/>
          <Route path='/profile' render={props => {
            this.checkLogin()
            return <Profile />
          }}/>
          <Route path='/lists' render={props => {
            this.checkLogin()
            return <ListContainer listReq='lists' />
          }} />
          <Route path='/list' render={props => {
            this.checkLogin()
            return <ListContainer listReq='list' />
          }} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
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
