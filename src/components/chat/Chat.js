import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { connect } from 'react-redux'
import spoken from '../../../node_modules/spoken/build/spoken.js';

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
      speech: '',
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
    const { currentUser } = this.props

    const filtered = users && currentUser ? users.filter(user => user.id !== currentUser.id) : null

    return filtered ? filtered.map(user => <li key={user.id} className='user' onClick={() => this.handleClick(user)}>{user.username}</li>) : null
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

  // handleClick = () => {
    // spoken.voices().then( voices => console.log(voices) );
    // spoken.recognition.language = 'en-AU';
    // spoken.recognition.language = 'ja-JP';
    // spoken.say('hello!', 'Karen')
  // }

  voices = () => {
    return [
      {name: 'Alex', lang: 'en-US'},
      {name: 'Alice', lang: 'it-IT'},
      {name: 'Anna', lang: 'de-DE'},
      {name: 'Daniel', lang: 'en-GB'},
      {name: 'Diego', lang: 'es-AR'},
      {name: 'Joana', lang: 'pt-PT'},
      {name: 'Jorge', lang: 'es-ES'},
      {name: 'Juan', lang: 'es-MX'},
      {name: 'Karen', lang: 'en-AU'},
      {name: 'Kyoko', lang: 'ja-JP'},
      {name: 'Luciana', lang: 'pt-BR'},
      {name: 'Yuna', lang: 'ko-KR'},
      {name: 'Mei-Jia', lang: 'zh-TW'},
      {name: 'Sin-ji', lang: 'zh-HK'},
      {name: 'Ting-Ting', lang: 'zh-CN'},
      {name: 'Tessa', lang: 'en-ZA'},
      {name: 'Thomas', lang: 'fr-FR'}
    ]
  }

  languages = () => {
    return [
      {name: 'American English', code: 'en-US'},
      {name: 'UK English', code: 'en-GB'},
      {name: 'Aussie English', code: 'en-AU'},
      {name: 'South African English', code: 'en-ZA'},
      {name: 'Argentian Spanish', code: 'es-AR'},
      {name: 'Spanish', code: 'es-ES'},
      {name: 'Mexican Spanish', code: 'es-MX'},
      {name: 'German', code: 'de-DE'},
      {name: 'Italian', code: 'it-IT'},
      {name: 'Brazilian Portuguese', code: 'pt-BR'},
      {name: 'Portuguese', code: 'pt-PT'},
      {name: 'Korean', code: 'ko-KR'},
      {name: 'Japanese', code: 'ja-JP'},
      {name: 'Mandarin', code: 'zh-CN'},
      {name: 'Cantonese', code: 'zh-HK'},
      {name: 'Taiwanese', code: 'zh-TW'},
      {name: 'French', code: 'fr-FR'}
    ]
  }

  handleSpeechChange = (msg) => {
    this.setState({speech: msg}, () => console.log(this.state))
  }

  handleSpeechSubmit = (e) => {
    const voice = this.voices().find(v => v.lang === e.target.value)
    console.log(voice);
    spoken.say(this.state.speech, voice.name)
    this.hideForms('speech')
  }

  handleSpeechClick = (msg) => {
    this.checkRenderedForms('translation')
    this.handleSpeechChange(msg)
  }

  handleTranslationClick = () => {
    this.checkRenderedForms('speech')
    this.setState({langPrompt: true})
  }

  checkRenderedForms = (form) => {
    switch(form) {
      case 'speech':
        return this.state.langPrompt ? this.hideForms('translation') : null
      case 'translation':
        return this.state.speech ? this.hideForms('speech') : null
      default:
        console.log('checkRenderedForms failed');
        break
    }
  }

  hideForms = (form) => {
    switch(form) {
      case 'speech':
        this.setState({speech: ''})
        break
      case 'translation':
        this.setState({langPrompt: false})
        break
      default:
        console.log('hideForms failed');
        break
    }
  }

  render() {
    const renderMessages = () => {
      const sortedMessages = this.state.messages.slice().sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
      return sortedMessages.map(msg => <Message handleSpeechClick={this.handleSpeechClick} handleTranslationClick={this.handleTranslationClick} key={msg.id} msg={msg} />)
    }

    const renderMsgActionCable = () => {
      if(this.state.chat) {
        return (
          <ActionCable channel={{ channel: 'MessagesChannel', chat: this.state.chat.id }} onReceived={this.handleReceiveMsgs} />
        )
      }
    }

    const renderSpeechForm = () => {
      return (
        <form >
          <input type='text' value={this.state.speech} onChange={this.handleSpeechChange} />
          <select id='selected-lang' onChange={this.handleSpeechSubmit}>{ renderLanguages() }</select>
          {/* <input type='submit'/> */}
        </form>
      )
    }

    const renderLanguages = () => {
      return this.languages().map(lang => <option id={lang.code} key={lang.code} value={lang.code}>{lang.name}</option>)
    }

    const renderChatInput = () => {
      return (
        <form className='chat-input-container'onSubmit={(e) => this.handleSubmit(e)}>
          <div className='chat-input-wrapper'>
            <input className='chat-input' type='text' name='text' value={this.state.text} onChange={e => this.handleChange(e)} />
            <input type='submit' className='chat-submit' />
          </div>
          <div className='chat-submit-wrapper'>
          </div>
        </form>
      )
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

          <section className='chat-features'>
            { this.state.speech ? renderSpeechForm() : null}
          </section>
          <div className='chat-features'>
            { this.state.langPrompt ? <SelectLang hideForms={this.hideForms} /> : null }
          </div>

          <main id='messages' >

            { this.state.messages ? renderMessages() : null}

            <div style={{marginTop: '30px'}} ref={el => this.messagesEnd = el }></div>
          </main>
        </div>


        { renderChatInput() }


      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.appState.currentUser,
  }
}

export default connect(mapStateToProps)(Chat);
