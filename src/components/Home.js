import React from 'react';
import { withRouter } from 'react-router-dom'

class Home extends React.Component {
  state = {
    users: null
  }

  componentDidMount() {
    this.props.users().then(users => this.setState({users}, () => console.log(this.state)))
  }

  renderUsers = () => {
    return this.state.users ? this.state.users.map(user => <li key={user.id} onClick={() => this.handleClick(user)}>{user.username}</li>) : null
  }

  handleClick = (user) => {
    // post request to create a chat
    debugger
    this.props.newChat()
    this.props.history.push('/chat')
    // open/render/redirect to chat
  }

  // user logs in and a broadcast starts
  // click on a user to start a chat

  render() {
    return (
      <div>
        <h1>Home</h1>
        <ul>
          { this.state.users ? this.renderUsers() : null }
        </ul>
      </div>
    )
  }
}

export default withRouter(Home)
