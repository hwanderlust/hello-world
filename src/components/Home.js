import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { connect } from 'react-redux'

class Home extends React.Component {
  state = {
    users: null
  }

  componentDidMount() {
    this.setState({users: this.props.users}, () => console.log(this.state))
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.users && this.state.users && prevState.users.length === this.state.users.length) {
    } else {
      this.renderUsers()
    }
  }

  handleClick = (clickedUser) => {
    this.props.handleNewChat({recipient_id: clickedUser.id})
    this.props.renderChat()
  }

  handleReceivedUser = (response) => {
    const updatedUsers = [...this.state.users, response].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    this.setState({...this.state,
      users: updatedUsers
    }, () => console.log(this.state))
  }

  renderUsers = () => {
    const { users } = this.state
    return users ? users.map(user => <li key={user.id} style={{border: '1px solid black', listStyle: 'none', padding: '20px', textAlign: 'center'}} onClick={() => this.handleClick(user)}>{user.username}</li>) : null
  }

  render() {

    return (
      <div>
        <h1 className='header'>Hello World</h1>
        <ActionCable channel={{ channel: 'UsersChannel' }} onReceived={this.handleReceivedUser} />
        <ul>
          { this.renderUsers() }
        </ul>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     users: state.appState.users,
//   }
// }

export default connect()(Home);
