import React, { Fragment } from 'react';
import NewMessageForm from './NewMessageForm'
import { API_ROOT, HEADERS } from '../constants'

class MessagesArea extends React.Component {
  state = {
    conversation: null
  }

  componentDidMount() {
    this.setState({conversation: this.props.conversation})
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.conversation.id !== this.props.conversation.id) {
      this.setState({conversation: this.props.conversation})
    }
  }

  handleSubmit = (text) => {
    const options = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({conversation_id: this.state.conversation.id, text})
    }
    fetch(`${API_ROOT}/messages`, options)
  }

  orderedMessages = () => {
    const messages = this.state.conversation.messages
    if(messages) {
      const sortedMessages = messages.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at)
      })
      return sortedMessages.map(message => <li key={message.id}>{message.text}</li>)
    }
  }

  render = () => {
    const { conversation } = this.state

    const renderPage = () => {
      if(conversation) {
        return (
          <Fragment>
            <h2>{ conversation.title }</h2>
            <ul>{ conversation ? this.orderedMessages() : null }</ul>
          </Fragment>
        )
      }
    }

    return (
      <div className='messagesArea'>
        { renderPage() }
        <NewMessageForm handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default MessagesArea
