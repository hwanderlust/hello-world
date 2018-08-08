import React from 'react';
import { withRouter } from 'react-router-dom'
import { ActionCable } from 'react-actioncable-provider';

class Home extends React.Component {
  state = {
    users: null
  }

  componentDidMount() {
    this.props.users().then(users => this.setState({users}, () => console.log(this.state)))
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(`HOME COMPONENTDIDUPDATE`, this.state);
  }

  renderUsers = () => {
    console.log(`RENDERUSERS`);
    return this.state.users ? this.state.users.map(user => <li key={user.id} onClick={() => this.handleClick(user)}>{user.username}</li>) : null
  }

  handleClick = (clickedUser) => {
    this.props.newChat({sender_id: this.props.currentUser.id, recipient_id: clickedUser.id})
    this.props.history.push('/chat')
  }

  handleReceivedUser = (response) => {
    this.props.users().then(users => this.setState({users}, () => console.log(this.state)))
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

export default withRouter(Home)
