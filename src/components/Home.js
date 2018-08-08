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
    console.log(`HOME COMPONENTDIDUPDATE`, this.state);
  }

  renderUsers = () => {
    const { users } = this.state
    return users ? users.map(user => <li key={user.id} onClick={() => this.handleClick(user)}>{user.username}</li>) : null
  }

  handleClick = (clickedUser) => {
    this.props.handleNewChat({recipient_id: clickedUser.id})
    this.props.renderChat()
  }

  handleReceivedUser = (response) => {
    // const { users } = this.props
    // this.props.users().then(users => this.setState({users}, () => console.log(this.state)))
    const { handleUsers } = this.props
    handleUsers()
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
