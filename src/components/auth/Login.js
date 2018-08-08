import React from 'react';
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  // handleRedirect = () => {
  //   if(this.props.currentUser) {
  //     this.props.history.push('/home')
  //   }
  // }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state);
    this.props.handleLogin(this.state)
  }

  render() {
    // this.handleRedirect()
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' value={this.state.username} onChange={(e) => this.handleChange(e)}/>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password'  value={this.state.password} onChange={(e) => this.handleChange(e)} />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default withRouter(Login)
