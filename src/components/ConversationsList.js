import React from 'react';

import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

class ConversationsList extends React.Component {
  state = {
    conversations: [],
    activeConversation: null,
  }

  componentDidMount() {
    fetch(`${API_ROOT}/conversations`)
      .then(r => r.json())
      .then(conversations => this.setState({ conversations }))
  }

  handleClick = activeConversation => {
    this.setState({ activeConversation })
  }

  handleReceivedConversation = conversation => {
    this.setState({conversations: [...this.state.conversations, conversation]})
  }

  handleReceivedMessage = response => {
    const conversations = [...this.state.conversations]
    const conversation = conversations.find(conversation => conversation.id === response.conversation_id)

    if(conversation.messages) {
      conversation.messages = [...conversation.messages, response]
    } else {
      conversation.messages = [response]
    }

    this.setState({ conversations })
  }

  mapConversations = () => {
    return this.state.conversations.map(conversation => {
      return (
        <li key={conversation.id} onClick={() => this.handleClick(conversation)}>
          {conversation.title}
        </li>
      )
    })
  }

  render = () => {
    const { conversations, activeConversation } = this.state

    return (
      <div className='conversationsList'>
        <ActionCable channel={{ channel: 'ConversationsChannel' }} onReceived={this.handleReceivedConversation} />
        <h2>Conversations</h2>
        { this.state.conversations ? <Cable conversations={conversations} handleReceivedMessage={this.handleReceivedMessage} /> : null}
        <ul>
          { conversations ? this.mapConversations() : null }
        </ul>
        <NewConversationForm />
        { activeConversation ?
          <MessagesArea conversation={this.state.activeConversation} />
        : null }
      </div>
    )
  }
}

export default ConversationsList
