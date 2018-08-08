import React from 'react';
import { ActionCable } from 'react-actioncable-provider';

class Home extends React.Component {
  state = {
    users: null
  }

  componentDidMount() {
    this.setState({users: this.props.users})
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.users && this.state.users && prevState.users.length === this.state.users.length) {
    } else {
      this.renderUsers()
    }
  }

  renderUsers = () => {
    const { users } = this.state
    return users ? users.map(user => <li key={user.id} style={{border: '1px solid black', listStyle: 'none', padding: '20px', textAlign: 'center'}} onClick={() => this.handleClick(user)}>{user.username}</li>) : null
  }

  handleClick = (clickedUser) => {
    this.props.handleNewChat({recipient_id: clickedUser.id})
    this.props.renderChat()
  }

  handleReceivedUser = (response) => {
    this.setState({...this.state,
      users: [...this.state.users, response]
    })
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <ActionCable channel={{ channel: 'UsersChannel' }} onReceived={this.handleReceivedUser} />
        <ul>
          { this.renderUsers() }
        </ul>
      </div>
    )
  }
}

export default Home
