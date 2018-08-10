import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import Message from './Message'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.chatWindow = React.createRef();
    this.form = React.createRef();
    this.state = {
      chat: '',
      messages: '',
      text: '',
    };
  };

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
      this.setState({messages: this.props.messages}, () => {
        console.log(this.state)
        this.scrollToBottom()
      })
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
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
    this.props.setChatMessages()
    this.scrollToBottom()
  }

  render() {
    const renderMessages = () => {
      const sortedMessages = this.state.messages.slice().sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
      return sortedMessages.map(msg => <Message key={msg.id} msg={msg} />)
    }

    const renderMsgActionCable = () => {
      if(this.state.chat) {
        return (
          <ActionCable channel={{ channel: 'MessagesChannel', chat: this.state.chat.id }} onReceived={this.handleReceiveMsgs} />
        )
      }
    }

    return (
      <div>
        <ActionCable channel={{ channel: 'ChatsChannel' }} onReceived={this.handleReceivedChat} />
        { renderMsgActionCable() }

        <h1>Chat Window</h1>
        <div ref={this.chatWindow} id='messages' style={{border: '1px solid black', width: '500px', height: '300px', listStyle: 'none', overflow: 'scroll'}}>
          { this.state.messages ? renderMessages() : null}
          <div style={{marginTop: '30px'}} ref={el => this.messagesEnd = el }></div>
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
