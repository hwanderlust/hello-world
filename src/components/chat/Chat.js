import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import Message from './Message'
import SelectLang from './SelectLang'

class Chat extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: null,
      chat: '',
      messages: '',
      text: '',
      langPrompt: false,
    };
  };

  componentDidMount() {
    if(this.props.users) {
      this.setState({users: this.props.users}, () => console.log(this.state))
    }
    if(this.props.chat) {
      this.setState({chat: this.props.chat})
    }
    if(this.props.messages) {
      this.setState({messages: this.props.messages}, () => console.log(this.state))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.users && this.state.users && prevState.users.length === this.state.users.length) {
    } else {
      this.renderUsers()
    }

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
    return users ? users.map(user => <li key={user.id} className='user' onClick={() => this.handleClick(user)}>{user.username}</li>) : null
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

  handleMsgClick = () => {
    this.setState({langPrompt: !this.state.langPrompt})
  }

  render() {
    const renderMessages = () => {
      const sortedMessages = this.state.messages.slice().sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
      return sortedMessages.map(msg => <Message handleMsgClick={this.handleMsgClick} key={msg.id} msg={msg} />)
    }

    const renderMsgActionCable = () => {
      if(this.state.chat) {
        return (
          <ActionCable channel={{ channel: 'MessagesChannel', chat: this.state.chat.id }} onReceived={this.handleReceiveMsgs} />
        )
      }
    }

    return (
      <React.Fragment>
        <ActionCable channel={{ channel: 'UsersChannel' }} onReceived={this.handleReceivedUser} />
        <aside className='users-list'>
          { this.renderUsers() }
        </aside>

        <ActionCable channel={{ channel: 'ChatsChannel' }} onReceived={this.handleReceivedChat} />
        { renderMsgActionCable() }

        <div className='messaging-area'>
          <h1 className='header'>Chat Window</h1>
          <main id='messages' >
            { this.state.messages ? renderMessages() : null}
            <div style={{marginTop: '30px'}} ref={el => this.messagesEnd = el }></div>
          </main>
        </div>

        { this.state.langPrompt ? <SelectLang handleMsgClick={this.handleMsgClick} /> : null }

        <form className='chat-input'onSubmit={(e) => this.handleSubmit(e)}>
          <input className='inputs' type='text' name='text' value={this.state.text} onChange={e => this.handleChange(e)} />
          <input type='submit' />
        </form>
      </React.Fragment>
    )
  }
}

export default Chat
