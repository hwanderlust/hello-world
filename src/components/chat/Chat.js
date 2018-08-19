import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { connect } from 'react-redux'
import spoken from '../../../node_modules/spoken/build/spoken.js';
import { createList, addMessage, getLists, createMessage } from '../../adapter'
import { updateLists, updateMessages } from '../../actions'

import Chatbox from './Chatbox'
import Translate from './Translate'
import { voices, languages } from './Speech'

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
    };
  };

  componentDidMount() {
    console.log('COMPONENTDIDMOUNT', this.props);
    if(this.props.users) {
      this.setState({users: this.props.users}, () => console.log(this.state))
    }
    window.addEventListener('keypress', this.handleKeyPress)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('COMPONENTDIDUPDATE', this.props);
    if(prevState.users && this.state.users && prevState.users.length === this.state.users.length) {
    } else {
      this.renderUsers()
    }
  }

  handleKeyPress = () => {
    this.inputFocus.focus()
  }

  handleClick = (clickedUser) => {
    this.props.handleNewChat({recipient_id: clickedUser.id})
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

    return filtered ? filtered.map(user => <li key={user.id} className='user' onClick={() => this.handleClick(user)}>{user.username}</li>) : null
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value}, () => console.log(this.state))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.newMessage({chat_id: this.props.chat, text: this.state.text})
    this.setState({text: ''})
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
    debugger
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

    const renderSpeechForm = () => {
      return (
        <form >
          <input type='text' value={this.state.speech} onChange={this.handleSpeechChange} />
          <select id='selected-lang' onChange={this.handleSpeechSubmit}>{ renderLanguages() }</select>
        </form>
      )
    }

    const renderLanguages = () => {
      return languages.map(lang => <option id={lang.code} key={lang.code} value={lang.code}>{lang.name}</option>)
    }

    const renderChatInput = () => {
      return (
        <form class='chat-input-wrapper' onSubmit={(e) => this.handleSubmit(e)}>
          <input class='chat-input' type='text' name='text' value={this.state.text} onChange={e => this.handleChange(e)} autofocus="true" ref={c => this.inputFocus = c} />
        </form>
      )
    }

    const renderSaveMsgForm = () => {
      return (
        <React.Fragment>
          <label>List to Save to:</label>
          <select name='existingList' ref={el => this.existingList = el }>
            { this.props.lists ? this.props.lists.map(list => <option key={list.id} value={list.id}>{list.name}</option>) : <option disabled>No Lists</option> }
          </select>
          <button onClick={this.handleExistingList}></button>

          <form onSubmit={this.handleNewList}>
            <input type='text' name='newList' value={this.state.newList} onChange={this.handleChange} placeholder='Create New List--Name Here' autoFocus={true}/>
          </form>
        </React.Fragment>
      )
    }

    const renderCheckmark = () => {
      setTimeout(() => this.setState({saveMsgStatus: false}), 600);
      return <img className='checkmark' src='https://png.icons8.com/cotton/2x/checkmark.png' alt='check mark'/>
    }

    const renderChatBoxes = () => {
      return this.props.openChats ? this.props.openChats.map(chat => <Chatbox checkRenderedForms={this.checkRenderedForms} handleSpeechChange={this.handleSpeechChange} handleTranslation={this.handleTranslation} handleSaveMsgChange={this.handleSaveMsgChange} chat={chat} />) : null
    }

    return (
      <React.Fragment>

        <ActionCable channel={{ channel: 'UsersChannel' }} onReceived={this.handleReceivedUser} />

        <aside className='users-list'>
          { this.renderUsers() }
        </aside>

        <ActionCable channel={{ channel: 'ChatsChannel' }} onReceived={this.handleReceivedChat} />

        <div className='messaging-area'>

          <section className='chat-features'>
            { this.state.speech ? renderSpeechForm() : null}
            { this.state.langPrompt ? <Translate hideForms={this.hideForms} /> : null }
            { this.state.saveMsg ? renderSaveMsgForm() : null }
            { this.state.saveMsgStatus ? renderCheckmark() : null }
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
