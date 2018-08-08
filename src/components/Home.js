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

  handleClick = (clickedUser) => {
    this.props.newChat({sender_id: this.props.currentUser.id, recipient_id: clickedUser.id})
    // this.props.newChat()
    this.props.history.push('/chat')
  }

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
