import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { connect } from 'react-redux'
import spoken from '../../../node_modules/spoken/build/spoken.js';
import { withRouter } from 'react-router-dom'

import { createList, addMessage, getLists, createMessage } from '../../adapter'
import { updateLists, updateMessages, updateChat, closeChat, clearTranslation, toggleSpeech, updateSelectedMsg, toggleTranslate, toggleSave, updateRecipientUser, toggleUserPf, clearSelectedMsg } from '../../actions'

import Chatbox from './Chatbox'
import Translate from './Translate'
import { spokenVoices, spokenLanguages } from '../../constants'
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
      // langPrompt: false,
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

    if(!this.props.speechPrompt && !this.props.savePrompt && !this.props.translatePrompt) {
      this.inputFocus.focus()
    }

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
      // this.setState({textInputFocus: true}, () => console.log(this.state))
      // this.inputFocus.focus()
    }
  }

  handleKeyDown = (e) => {
    if(e.key === 'Escape') {
      if(this.state.text) {
        this.setState({text: ''}, () => console.log(this.state))
      }
      if(this.props.translation) {
        this.setState({text: ''}, () => this.props.clearTranslation())
        this.props.clearSelectedMsg()
      }
      if(this.props.speechPrompt) {
        this.props.toggleSpeech()
      }
      if(this.props.translatePrompt) {
        this.props.toggleTranslate()
      }
      if(this.props.savePrompt) {
        this.props.toggleSave()
      }
      if(this.props.movePrompt) {
        this.props.toggleMove()
      }

    } else if(e.key === 'Backspace') {
      if(this.state.text.length === 1) {
        this.setState({text: ''}, () => console.log(this.state))
        this.props.clearTranslation()
      }

    } else if (e.key === 'Alt') {
      this.setState({textInputFocus: true}, () => console.log(this.state))
      this.inputFocus.focus()
    }
  }

  handleClick = (e, clickedUser) => {
    if(e.target.tagName !== 'IMG') {

      const check = this.props.openChats.filter(chat => chat.recipient_user.id === clickedUser.id)

      if(check.length === 0) {
        this.props.handleNewChat({recipient_id: clickedUser.id})
        this.setState({
          x: this.state.x + 100,
          y: this.state.y + 100,
          chatBoxBgColor: bgColor()
        }, () => console.log(this.state))

      } else {
        alert('you already have a chat going, silly you')

        this.props.updateChat(clickedUser.id)
        const recUser = {id: clickedUser.id, username: clickedUser.username}
        this.props.updateRecipientUser(recUser)
      }

    } else {
      console.log(`clicked IMG`, clickedUser);
      this.props.toggleUserPf(clickedUser)
    }
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
    const chattingUsers = this.props.openChats.map(chat => chat.recipient_user.id)
    console.log(chattingUsers);
    let openChatClass = null

    return filtered ? filtered.map(user => {

      if(chattingUsers.includes(user.id)) {
        openChatClass = 'user active-chat'
      } else {
        openChatClass = 'user'
      }

      return (
      <div key={user.id} className={openChatClass} onClick={(e) => this.handleClick(e, user)}>
        <UserIcon onClick={this.handleUserPicClick} containerStyle={containerStyle} imgStyle={imgStyle} imgSrc={user.profile_picture} />
        <p>{user.username}</p>
      </div>
    )}) : null
  }

  handleUserPicClick = () => {
    this.props.history.push('/profile')
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value}, () => console.log(this.state))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    e.persist()
    this.handleFeatures(e)
    this.setState({textInputFocus: false}, () => console.log(this.state))
  }

  handleFeatures = (e) => {

    switch(e.type) {
      case 'submit':
        return this.handleTextShortcuts()

      case 'click':
        return this.handleFeatureBtnClicks(e)

      default:
        return console.log('something is wrong..');
    }
  }

  handleTextShortcuts = () => {
    const splitted = this.state.text.split(' ')
    // eslint-disable-next-line
    const [firstWord, secondWord] = splitted

    switch(firstWord) {
      case '//T':
        return this.handleTranslateShortcut()
      case '//L':
        return this.handleTranscribeShortcut()
      case '//C':
        return this.handleCloseChatShortcut()

      default:
        if(this.state.text === '' && this.props.translation) {
          this.newMessage({chat_id: this.props.chat, text: this.props.translation})
          this.props.clearTranslation()
          return this.setState({text: '', textInputFocus: false}, () => console.log(this.state))

        } else {
          this.newMessage({chat_id: this.props.chat, text: this.state.text})
          return this.setState({text: '', textInputFocus: false}, () => console.log(this.state))
        }
    }
  }

  handleFeatureBtnClicks = (e) => {
    switch(e.target.id) {
      case 'translateBtn':
        return this.handleTranslateShortcut()
      case 'transcribeBtn':
        return this.handleTranscribeShortcut()
      default:
        return console.log(`there's another button???`);
    }
  }

  handleTranslateShortcut = () => {
    this.setState({text: ''}, () => console.log(this.state))
    this.props.toggleTranslate()
  }

  handleTranscribeShortcut = () => {
    this.setState({text: 'speak now'}, () => console.log(this.state))
    this.handleTranscription()
  }

  handleCloseChatShortcut = () => {
    const splitted = this.state.text.split(' ')
    // eslint-disable-next-line
    const [firstWord, secondWord] = splitted

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
  }

  newMessage = (message) => {
    if(this.props.recipientUser) {
      const users = {sender_id: this.props.currentUser.id, recipient_id: this.props.recipientUser.id}
      createMessage({...message, ...users})
    } else {
      alert(`you may have to choose someone to chat with first...`)
    }
  }

  handleReceivedChat = response => {
    console.log(response);
  }

  handleSpeechChange = (e) => {
    this.props.updateSelectedMsg(e.target.value)
  }

  handleSpeechSubmit = (e) => {
    const voice = spokenVoices.find(v => v.lang === e.target.value)
    console.log(voice);
    spoken.say(this.props.selectedMessage.text, voice.name)
    this.props.updateSelectedMsg('')
    this.props.toggleSpeech()
  }

  handleSavingMsg = (listId) => {
    addMessage({msg_id: this.state.message.id, list_id: listId})
      .then(messages => {
        console.log(messages)
        this.setState({saveMsgStatus: true}, () => console.log(this.state))
        this.props.toggleSave()
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
    // this.hideForms('save')
    this.setState({newList: ''})
  }

  handleExistingList = () => {
    console.log(this.existingList.value);
    this.setState({existingList: this.existingList.value}, () => this.handleSavingMsg(this.state.existingList))
    // this.hideForms('save')
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

  handleSaveMsgChange = (msg) => {
    this.setState({message: msg}, () => console.log(this.state))

    if(!this.props.lists) {
      getLists(this.props.currentUser.id).then(lists => this.props.updateLists(lists))
    }

    this.setState({saveMsg: true})
  }

  handleTranscription = () => {
    spoken.listen()
    .then( transcript => {
      console.log(transcript)
      this.setState({text: transcript}, () => console.log(this.state))
    })
    .catch(     error => console.warn(error.message) )
  }

  render() {

    const renderHeader = () => {
      const className = this.props.speechPrompt || this.props.translatePrompt || this.props.savePrompt || this.state.saveMsgStatus ? 'chat-header active' : 'chat-header'
      return (
        <React.Fragment>

          { this.props.speechPrompt || this.props.translatePrompt || this.props.savePrompt || this.state.saveMsgStatus ?
            <div className={className}>
              { this.props.speechPrompt ? renderSpeechForm() : null }
              { this.props.translatePrompt ? <Translate toggleTranslate={this.props.toggleTranslate} /> : null }
              { this.props.savePrompt ? renderSaveMsgForm() : null }
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
            <input type='text' value={this.props.selectedMessage.text} onChange={this.handleSpeechChange} />
          </div>

          <div>
            <label>Choose an appropriate voice:</label>
            <select id='selected-lang' onChange={this.handleSpeechSubmit}>{ renderLanguages() }</select>
          </div>
        </form>
      )
    }

    const renderLanguages = () => {
      return spokenLanguages.map(lang => <option id={lang.code} key={lang.code} value={lang.code}>{lang.name}</option>)
    }

    const renderChatInput = () => {
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', this.state);
      return (
        <form class='chat-input-wrapper' onSubmit={(e) => this.handleSubmit(e)}>
          <input class='chat-input' type='text' name='text' placeholder={this.state.placeholder} value={this.state.text || this.props.translation || ""} onChange={e => this.handleChange(e)} autoFocus="true" ref={c => this.inputFocus = c} />
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
          <Chatbox handleSaveMsgChange={this.handleSaveMsgChange} chat={obj} x={this.state.x} y={this.state.y} bgColor={this.state.chatBoxBgColor}/>
        )
      }) : null
    }

    const renderFeatureBtns = () => {

      const className = this.props.speechPrompt || this.props.translatePrompt || this.props.savePrompt || this.state.saveMsgStatus ? 'chat-header feature-btns' : 'chat-header active feature-btns'

      return (
        <section className={className}>
          <button onClick={this.handleFeatures} id='translateBtn'>Translate</button>
          <button onClick={this.handleFeatures} id='transcribeBtn'>Transcribe</button>
        </section>
      )
    }

    const renderTips = () => {
      const tips = ['enter //T for translation prompt', 'enter //C # to close a certain chat window', 'enter //L for transcribe prompt', 'press esc to remove prompts and/or clear text field', 'press alt or option to start typing in main text field']
      return (
        <div className='tip-container'>
          <h1 className='tip'>{ tips[Math.floor(Math.random() * 5)] }</h1>
        </div>
      )
    }

    return (
      <React.Fragment>
        <ActionCable channel={{ channel: 'UsersChannel' }} onReceived={this.handleReceivedUser} />
        <ActionCable channel={{ channel: 'ChatsChannel' }} onReceived={this.handleReceivedChat} />

        { renderHeader() }

        { this.props.speechPrompt || this.props.translatePrompt || this.props.savePrompt || this.state.saveMsgStatus ? null : renderFeatureBtns() }

        <aside className='users-list'>
          { this.renderUsers() }
        </aside>

        <div className='messaging-area'>

          { renderChatBoxes() }

        </div>

        { renderChatInput() }

        { renderTips() }


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
    speechPrompt: state.appState.prompts.speechPrompt,
    selectedMessage: state.appState.selectedMessage,
    translation: state.appState.translation,
    translatePrompt: state.appState.prompts.translatePrompt,
    savePrompt: state.appState.prompts.savePrompt,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLists: (lists) => dispatch(updateLists(lists)),
    updateMessages: (messages) => dispatch(updateMessages(messages)),
    updateChat: (chat) => dispatch(updateChat(chat)),
    closeChat: (chats) => dispatch(closeChat(chats)),
    clearTranslation: () => dispatch(clearTranslation()),
    toggleSpeech: () => dispatch(toggleSpeech()),
    updateSelectedMsg: (msg) => dispatch(updateSelectedMsg(msg)),
    toggleTranslate: () => dispatch(toggleTranslate()),
    toggleSave: () => dispatch(toggleSave()),
    updateRecipientUser: (user) => dispatch(updateRecipientUser(user)),
    toggleUserPf: (user) => dispatch(toggleUserPf(user)),
    clearSelectedMsg: () => dispatch(clearSelectedMsg()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));
