import React from 'react';

class Auth extends React.Component {
  state = {
    username: '',
    password: '',
    login: false
  }

  componentDidMount() {
    if(window.location.pathname === '/login') {
      this.setState({login: !this.state.login}, () => console.log(this.state))
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state);
    this.props.handleAuth(this.state)
  }

  render() {
    const renderHeader = () => {
      return this.state.login ? <h1>Login</h1> : <h1>Signup</h1>
    }

    return (
      <div>
        { renderHeader() }
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

export default Auth;
