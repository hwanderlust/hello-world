import React from 'react';
import { API_ROOT, HEADERS } from '../constants'

class NewConversationForm extends React.Component {
  state = {
    title: ''
  }

  handleChange = (e) => {
    this.setState({title: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({conversation: this.state})
    }
    fetch(`${API_ROOT}/conversations`, options)
    this.setState({title: ''})
  }

  render = () => {
    return (
      <div className='NewConversationForm'>
        <form onSubmit={this.handleSubmit} >
          <label>New Conversation:</label>
          <br />
          <input type='text' value={this.state.title} onChange={this.handleChange} />
          <input type='submit' />
        </form>
      </div>
    )
  }

}

export default NewConversationForm
