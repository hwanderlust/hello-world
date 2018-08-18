import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { connect } from 'react-redux'
import spoken from '../../../node_modules/spoken/build/spoken.js';
import { createList, addMessage, getLists, createMessage, getChatMessages } from '../../adapter'
import { updateLists, updateMessages } from '../../actions'

import Chatbox from './Chatbox'
import Translate from './Translate'
import { voices, languages } from './Speech'
import Message from './Message'

import {Tabs, TabList, Tab, PanelList, Panel} from 'react-tabtab';
// import {styled} from 'react-tabtab';
// let {PanelStyle} = styled;
//
// PanelStyle = PanelStyle.extend`
//   height: '50vh',
//   overflowY: 'scroll'
// `;
//
// module.exports = {Panel: PanelStyle}

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
      saveMsg: false,
      message: null,
      newList: '',
      saveMsgStatus: false,
      existingList: null,
      // lists: null,
    };
  };

  componentDidMount() {
    console.log('COMPONENTDIDMOUNT', this.props);
    if(this.props.users) {
      this.setState({users: this.props.users}, () => console.log(this.state))
    }
    if(this.props.chat) {
      this.setState({chat: this.props.chat}, () => console.log(this.state))
    }
    // if(this.props.messages) {
    //   this.setState({messages: this.props.messages}, () => console.log(this.state))
    // }
    // if(this.props.lists) {
    //   this.setState({lists: this.props.lists}, () => console.log(this.state))
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('COMPONENTDIDUPDATE', this.props);
    if(prevState.users && this.state.users && prevState.users.length === this.state.users.length) {
    } else {
      this.renderUsers()
    }

    if(this.state.chat !== this.props.chat) {
      this.setState({chat: this.props.chat})
    }

    // if(this.state.messages !== this.props.messages) {
    //   this.setState({messages: this.props.messages}, () => {
    //     console.log(this.state)
    //     // this.scrollToBottom()
    //   })
    // }

    // if(this.state.lists !== this.props.lists) {
    //   this.setState({lists: this.props.lists}, () => console.log(this.state))
    // }
  }

  handleClick = (clickedUser) => {
    this.props.handleNewChat({recipient_id: clickedUser.id})
    // this.props.renderChat()
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
    this.setState({[e.target.name]: e.target.value}, () => console.log(this.state))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.newMessage({chat_id: e.target.dataset.id, text: this.state.text})
    this.setState({text: ''})
  }

  newMessage = (message) => {
    const users = {sender_id: this.props.currentUser.id, recipient_id: this.props.recipientUser.id}
    createMessage({...message, ...users})
  }

  handleReceivedChat = response => {
    console.log(response);
    if(this.state.chat) {
      this.setState({chat: response})
    }
  }

  handleReceiveMsgs = response => {
    console.log(response);
    // this.props.setChatMessages()
    // {id: 39, text: "hello", chat_id: 2, sender_id: 3, recipient_id: 2, sender_id: 3, text: "hello", updated_at: "2018-08-18T19:41:28.730Z"}
    getChatMessages(response.chat_id).then(messages => {
      const chatObj = {id: response.chat_id, messages}
      this.props.updateMessages(chatObj)
      this.scrollToBottom()
    })
  }

  // handleClick = () => {
    // spoken.voices().then( voices => console.log(voices) );
    // spoken.recognition.language = 'en-AU';
    // spoken.recognition.language = 'ja-JP';
    // spoken.say('hello!', 'Karen')
  // }

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
    // e.persist()
    // debugger
    console.log(this.existingList.value);
    this.setState({existingList: this.existingList.value}, () => this.handleSavingMsg(this.state.existingList))
    this.hideForms('save')
  }

  // handleSpeechClick = (msg) => {
  //   this.checkRenderedForms('speech')
  //   this.handleSpeechChange(msg)
  // }
  //
  // handleTranslationClick = () => {
  //   this.checkRenderedForms('translation')
  //   this.setState({langPrompt: true})
  // }
  //
  // handleSaveMsgClick = (msg) => {
  //   this.checkRenderedForms('save')
  //   this.setState({message: msg})
  //   this.props.lists ? null : getLists(this.props.currentUser.id).then(lists => this.props.updateLists(lists))
  //
  //   this.setState({saveMsg: true})
  // }

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
    // const renderMessages = () => {
    //   const sortedMessages = this.state.messages.slice().sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
    //   return sortedMessages.map(msg => <Message handleSpeechClick={this.handleSpeechClick} handleTranslationClick={this.handleTranslationClick} handleSaveMsgClick={this.handleSaveMsgClick} key={msg.id} msg={msg} />)
    // }

    const renderMsgActionCable = (chat) => {
      // if(this.state.chat) {
        return (
          <ActionCable channel={{ channel: 'MessagesChannel', chat: chat.id }} onReceived={this.handleReceiveMsgs} />
        )
      // }
    }

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

    // const renderChatInput = () => {
    //   return (
    //     <form className='chat-input-container'onSubmit={(e) => this.handleSubmit(e)}>
    //       <div className='chat-input-wrapper'>
    //         <input className='chat-input' type='text' name='text' value={this.state.text} onChange={e => this.handleChange(e)} />
    //         <input type='submit' className='chat-submit' />
    //       </div>
    //       <div className='chat-submit-wrapper'>
    //       </div>
    //     </form>
    //   )
    // }

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

    // const renderChatBoxes = () => {
    //   // 1. need input to be a master input for all chats
    //   // 2. save multiple recipients to store (need to connect with chats)
    //   // 3. save multiple chat messages to store (need to connect w chats)
    //   return this.props.openChats ? this.props.openChats.map(chat => <Chatbox checkRenderedForms={this.checkRenderedForms} handleSpeechChange={this.handleSpeechChange} handleTranslation={this.handleTranslation} handleSaveMsgChange={this.handleSaveMsgChange} chat={chat} />) : null
    // }

    const renderTabs = () => {
      return this.props.openChats.map(chat => {
        return <Tab key={chat.id}>{chat.id}</Tab>
      })
    }

    const renderPanels = () => {
      return this.props.openChats.map(chat => {
        if(chat.messages) {
          const msgs = chat.messages.map(msg => <Message msg={msg} currentUser={this.props.currentUser}>{msg.text}</Message>)
          return (
            <Panel key={chat.id} className='panel'>
              { renderMsgActionCable(chat) }
              {msgs}
              <div style={{marginTop: '0.3rem'}} ref={el => this.messagesEnd = el }></div>
              <form onSubmit={this.handleSubmit} data-id={chat.id}>
                <input type='text' name='text' value={this.state.text} onChange={this.handleChange} />
              </form>
            </Panel>)
        }
      })
    }

    return (
      <React.Fragment>

        <ActionCable channel={{ channel: 'UsersChannel' }} onReceived={this.handleReceivedUser} />

        <aside className='users-list'>
          { this.renderUsers() }
        </aside>

        <ActionCable channel={{ channel: 'ChatsChannel' }} onReceived={this.handleReceivedChat} />
        {/* { renderMsgActionCable() } */}

        <div className='messaging-area'>
          {/* <h1 className='header'>Chat Window</h1> */}

          <section className='chat-features'>
            { this.state.speech ? renderSpeechForm() : null}
            { this.state.langPrompt ? <Translate hideForms={this.hideForms} /> : null }
            { this.state.saveMsg ? renderSaveMsgForm() : null }
            { this.state.saveMsgStatus ? renderCheckmark() : null }
          </section>

          <Tabs>
            <TabList>
              { this.props.openChats ? renderTabs() : null }
            </TabList>
            <PanelList>
              { this.props.openChats ? renderPanels() : null }
            </PanelList>
          </Tabs>

          {/* { renderChatBoxes() } */}

          {/* <main id='messages' >

            { this.state.messages ? renderMessages() : null}

            <div style={{marginTop: '0.3rem'}} ref={el => this.messagesEnd = el }></div>
          </main> */}
        </div>

        {/* { renderChatInput() } */}

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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLists: (lists) => dispatch(updateLists(lists)),
    updateMessages: (messages) => dispatch(updateMessages(messages)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
