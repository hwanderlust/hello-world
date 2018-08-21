import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { connect } from 'react-redux'
import spoken from '../../../node_modules/spoken/build/spoken.js';
import { createList, addMessage, getLists, createMessage } from '../../adapter'
import { updateLists, updateMessages, updateChat, closeChat } from '../../actions'

import Chatbox from './Chatbox'
import Translate from './Translate'
import { voices, languages } from './Speech'
import UserIcon from '../user/UserIcon'

const bgColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const rgbColor = "rgb(" + r + "," + g + "," + b + ")";
  return rgbColor
}

const containerStyle = {
  width: '1rem',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  alignSelf: 'center',
  margin: '0',
  position: 'relative',
  top: '0.3rem'
}

const imgStyle = {
  borderRadius: '50%',
  width: '2rem',
  height: '2rem'
}

class Chat extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: null,
      text: '',
      langPrompt: false,
      speech: '',
      saveMsg: false,
      message: null,
      newList: '',
      saveMsgStatus: false,
      existingList: null,
      x: -100,
      y: -100,
      chatBoxBgColor: null,
      textInputFocus: false,
      placeholder: '',
    };
  };

  componentDidMount() {
    console.log('COMPONENTDIDMOUNT', this.props);
    if(this.props.users) {
      this.setState({users: this.props.users}, () => console.log(this.state))
    }
    window.addEventListener('keypress', this.handleKeyPress)
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('COMPONENTDIDUPDATE', this.props);
    if(prevState.users && this.state.users && prevState.users.length === this.state.users.length) {
    } else {
      this.renderUsers()
    }
  }

  handleKeyPress = (e) => {
    if(!this.state.textInputFocus) {
      let i;
      if(e.key > 0 && e.key <= 9) {
        i = e.key - 1
        this.props.updateChat(this.props.openChats[i].id)
      } else if(e.key === 0) {
        i = 8
        this.props.updateChat(this.props.openChats[i].id)
      }
      this.setState({textInputFocus: true}, () => console.log(this.state))
      this.inputFocus.focus()
    }
  }

  handleKeyDown = (e) => {
    if(e.key === 'Escape') {
      this.setState({text: ''}, () => console.log(this.state))
    }
  }

  handleClick = (clickedUser) => {
    this.props.handleNewChat({recipient_id: clickedUser.id})
    this.setState({
      x: this.state.x + 100,
      y: this.state.y + 100,
      chatBoxBgColor: bgColor()
    }, () => console.log(this.state))
  }

  handleReceivedUser = (response) => {
    const updatedUsers = [...this.state.users, response].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    this.setState({...this.state,
      users: updatedUsers
    }, () => console.log(this.state))
  }

  renderUsers = () => {
    const { users } = this.state
    const { currentUser } = this.props

    const filtered = users && currentUser ? users.filter(user => user.id !== currentUser.id) : null

    return filtered ? filtered.map(user => (
      <div key={user.id} className='user' onClick={() => this.handleClick(user)}>
        <UserIcon containerStyle={containerStyle} imgStyle={imgStyle} imgSrc={user.profile_picture} />
        <p>{user.username}</p>
      </div>
    )) : null
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value}, () => console.log(this.state))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const splitted = this.state.text.split(' ')
    const [firstWord, secondWord] = splitted

    switch(firstWord) {
      case '//translate':
        return this.setState({langPrompt: true, text: ''})
      case '//close':
        if(secondWord) {
          if(this.props.openChats.map(c => c.id).includes(Number(secondWord))) {
            const updatedOpenChats = this.props.openChats.filter(chat => chat.id !== Number(secondWord))
            this.props.closeChat(updatedOpenChats)
            return this.setState({text: ''}, () => console.log(this.state))
          } else {
            return alert(`Sorry but that chat isn't even open...`)
          }
        } else {
          return alert(`You gotta give the chat number--you can find it after the user's name on the chat window!`)
        }
      default:
        this.newMessage({chat_id: this.props.chat, text: this.state.text})
        this.setState({text: '', textInputFocus: false}, () => console.log(this.state))
    }
  }

  newMessage = (message) => {
    const users = {sender_id: this.props.currentUser.id, recipient_id: this.props.recipientUser.id}
    createMessage({...message, ...users})
  }

  handleReceivedChat = response => {
    console.log(response);
  }

  handleSpeechChange = (msg) => {
    this.setState({speech: msg}, () => console.log(this.state))
  }

  handleSpeechSubmit = (e) => {
    const voice = voices.find(v => v.lang === e.target.value)
    console.log(voice);
    spoken.say(this.state.speech, voice.name)
    this.hideForms('speech')
  }

  handleSavingMsg = (listId) => {
    addMessage({msg_id: this.state.message.id, list_id: listId})
      .then(messages => {
        console.log(messages)
        this.setState({saveMsgStatus: true}, () => console.log(this.state))
      })
  }

  handleNewList = (e) => {
    e.preventDefault()
    createList({name: this.state.newList, user_id: this.props.currentUser.id})
      .then(newList => {
        console.log(newList)
        this.handleSavingMsg(newList.id)
        getLists(this.props.currentUser.id).then(lists => this.props.updateLists(lists))
      })
    this.hideForms('save')
    this.setState({newList: ''})
  }

  handleExistingList = () => {
    console.log(this.existingList.value);
    this.setState({existingList: this.existingList.value}, () => this.handleSavingMsg(this.state.existingList))
    this.hideForms('save')
  }

  checkRenderedForms = (form) => {
    switch(form) {
      case 'speech':
        this.state.langPrompt ? this.hideForms('translation') : null
        return this.state.saveMsg ? this.hideForms('save') : null
      case 'translation':
        !!this.state.speech ? this.hideForms('speech') : null
        return this.state.saveMsg ? this.hideForms('save') : null
      case 'save':
        this.state.langPrompt ? this.hideForms('translation') : null
        return !!this.state.speech ? this.hideForms('speech') : null
      default:
        return console.log('checkRenderedForms failed');
    }
  }

  hideForms = (form) => {
    switch(form) {
      case 'speech':
        return this.setState({speech: ''}, () => console.log(this.state))
      case 'translation':
        return this.setState({langPrompt: false}, () => console.log(this.state))
      case 'save':
        return this.setState({saveMsg: false}, () => console.log(this.state))
      default:
        return console.log('hideForms failed');
    }
  }

  handleTranslation = () => {
    this.setState({langPrompt: true})
  }

  handleSaveMsgChange = (msg) => {
    this.setState({message: msg}, () => console.log(this.state))
    this.props.lists ? null : getLists(this.props.currentUser.id).then(lists => this.props.updateLists(lists))
    this.setState({saveMsg: true})
  }

  render() {

    const renderHeader = () => {
      const className = this.state.speech || this.state.langPrompt || this.state.saveMsg || this.state.saveMsgStatus ? 'chat-header active' : 'chat-header'
      return (
        <React.Fragment>

          { this.state.speech || this.state.langPrompt || this.state.saveMsg || this.state.saveMsgStatus ?
            <div className={className}>
              { this.state.speech ? renderSpeechForm() : null}
              { this.state.langPrompt ? <Translate hideForms={this.hideForms} /> : null }
              { this.state.saveMsg ? renderSaveMsgForm() : null }
              { this.state.saveMsgStatus ? renderCheckmark() : null }
            </div>
          : null}

        </React.Fragment>
          )
    }

    const renderSpeechForm = () => {
      return (
        <form className='speech-form'>
          <div>
            <label>Listen to:</label>
            <input type='text' value={this.state.speech} onChange={this.handleSpeechChange} />
          </div>

          <div>
            <label>Choose an appropriate voice:</label>
            <select id='selected-lang' onChange={this.handleSpeechSubmit}>{ renderLanguages() }</select>
          </div>
        </form>
      )
    }

    const renderLanguages = () => {
      return languages.map(lang => <option id={lang.code} key={lang.code} value={lang.code}>{lang.name}</option>)
    }

    const renderChatInput = () => {
      return (
        <form class='chat-input-wrapper' onSubmit={(e) => this.handleSubmit(e)}>
          <input class='chat-input' type='text' name='text' placeholder={this.state.placeholder} value={this.state.text} onChange={e => this.handleChange(e)} autofocus="true" ref={c => this.inputFocus = c} />
        </form>
      )
    }

    const renderSaveMsgForm = () => {
      return (
        <div className='save-msg'>
          <div className='existing-container'>
            <label>List to Save to:</label>
            <select name='existingList' ref={el => this.existingList = el }>
              { this.props.lists ? this.props.lists.map(list => <option key={list.id} value={list.id}>{list.name}</option>) : <option disabled>No Lists</option> }
            </select>
            <button onClick={this.handleExistingList}>Add to this List</button>
          </div>

          <h1 className='save-msg-title'>Save a Message to Review!</h1>

          <form onSubmit={this.handleNewList}>
            <input type='text' name='newList' value={this.state.newList} onChange={this.handleChange} placeholder='Create New List--Name Here' autoFocus={true}/>
          </form>
        </div>
      )
    }

    const renderCheckmark = () => {
      setTimeout(() => this.setState({saveMsgStatus: false}), 600);
      return <img className='checkmark' src='https://png.icons8.com/cotton/2x/checkmark.png' alt='check mark'/>
    }

    const renderChatBoxes = () => {
      return this.props.openChats ? this.props.openChats.map((chat, i) => {
        const obj = {...chat, index: i}
        console.log(obj);
        return (
          <Chatbox checkRenderedForms={this.checkRenderedForms} handleSpeechChange={this.handleSpeechChange} handleTranslation={this.handleTranslation} handleSaveMsgChange={this.handleSaveMsgChange} chat={obj} x={this.state.x} y={this.state.y} bgColor={this.state.chatBoxBgColor}/>
        )
      }) : null
    }

    return (
      <React.Fragment>
        <ActionCable channel={{ channel: 'UsersChannel' }} onReceived={this.handleReceivedUser} />
        <ActionCable channel={{ channel: 'ChatsChannel' }} onReceived={this.handleReceivedChat} />

        { renderHeader() }

        <aside className='users-list'>
          { this.renderUsers() }
        </aside>

        <div className='messaging-area'>

          <section className='chat-features'>

          </section>

          { renderChatBoxes() }

        </div>

        { renderChatInput() }

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.appState.currentUser,
    lists: state.appState.lists,
    openChats: state.appState.openChats,
    recipientUser: state.appState.recipientUser,
    chat: state.appState.chat,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLists: (lists) => dispatch(updateLists(lists)),
    updateMessages: (messages) => dispatch(updateMessages(messages)),
    updateChat: (chat) => dispatch(updateChat(chat)),
    closeChat: (chats) => dispatch(closeChat(chats)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
