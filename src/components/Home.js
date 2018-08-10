import React from 'react';
import { ActionCable } from 'react-actioncable-provider';

class Home extends React.Component {
  state = {
    users: null
  }

  componentDidMount() {
    console.log('HOME DID MOUNT');
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
    // just send clickedUser through ?
    // this.props.handleNewChat({recipient_id: clickedUser.id})
    this.props.handleNewChat(clickedUser)
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
          { this.state.users ? this.renderUsers() : null }
        </ul>
      </div>
    )
  }
}

export default Home
