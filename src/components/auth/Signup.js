import React from 'react';

class Signup extends React.Component {
  state = {
    username: '',
    password: '',
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSignup(this.state)
  }

  render() {
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

export default Signup
