import React from 'react';

class NewMessageForm extends React.Component {
  state = {
    text: '',
  }

  handleChange = (e) => {
    this.setState({text: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state.text)
    this.setState({text: ''})
  }

  render = () => {
    return (
      <div className='NewMessageForm'>
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input type='text' value={this.state.text} onChange={this.handleChange} />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default NewMessageForm
