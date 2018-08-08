import React from 'react';
import { ActionCable } from 'react-actioncable-provider';

class Chat extends React.Component {
  state = {
    chat: '',
    messages: '',
    text: '',
  }

  componentDidMount() {
    if(this.props.chat) {
      this.setState({chat: this.props.chat})
    }
    if(this.props.messages) {
      this.setState({messages: this.props.messages}, () => console.log(this.state))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.chat !== this.props.chat) {
      this.setState({chat: this.props.chat})
    }
    if(this.state.messages !== this.props.messages) {
      this.setState({messages: this.props.messages}, () => console.log(this.state))
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.newMessage({chat_id: this.state.chat.id, text: this.state.text})
    this.setState({text: ''})
  }

  handleReceivedChat = response => {
    console.log(response);
    if(this.state.chat) {
      this.setState({chat: response})
    }
  }

  handleReceiveMsgs = response => {
    console.log(response);
    this.props.chatMessages()
  }

  renderMsgActionCable = () => {
    if(this.state.chat) {
      return (
        <ActionCable channel={{ channel: 'MessagesChannel', chat: this.state.chat.id }} onReceived={this.handleReceiveMsgs} />
      )
    }
  }

  renderMessages = () => {
    return this.state.messages.map(msg => <li>{msg.text}</li>)
  }

  render() {
    { console.log(this.state) }
    return (
      <div>
        <ActionCable channel={{ channel: 'ChatsChannel' }} onReceived={this.handleReceivedChat} />
        { this.renderMsgActionCable() }

        <h1>Chat Window</h1>
        <div style={{border: '1px solid black', width: '500px', height: '300px', listStyle: 'none', overflow: 'scroll'}}>
          { this.state.messages ? this.renderMessages() : null}
        </div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type='text' name='text' value={this.state.text} onChange={e => this.handleChange(e)} />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default Chat
