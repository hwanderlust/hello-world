import React from 'react';
import { connect } from 'react-redux'

import MessageContainer from '../../chat/MessageContainer'
import Translate from '../../features/Translate'
import Speech from '../../features/Speech'

import { toggleSpeech, updateSelectedMsg, toggleTranslate, toggleMove, updateListMsgs, clearTranslation } from '../../../actions'
import { createList, getLists, addMessage, getListMsgs, removeMsgFromList } from '../../../adapter'

const bgColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const rgbColor = "rgb(" + r + "," + g + "," + b + ")";
  return rgbColor
}

const positionX = (i) => {
  const x = (i + 5) + Math.random() * 5
  return `${x}vw`
}

const positionY = (i) => {
  return `${i + 15}vh`
}

class List extends React.Component {
  state = {
    messages: null,
    message: null,
    saveMsgStatus: false,
    newList: '',
    saveMsg: false,
  }
  componentDidMount() {
    this.setState({messages: this.props.messages}, () => console.log(this.state))
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.messages !== this.props.messages) {
      this.setState({messages: this.props.messages}, () => console.log(this.state))
    }
  }

  handleSpeechClick = (msg) => {
    this.props.toggleSpeech()
    this.props.updateSelectedMsg(msg)
  }

  handleTranslateClick = (msg) => {
    this.props.toggleTranslate()
    console.log(msg.text);
    const term = encodeURI(msg.text)
    this.props.updateSelectedMsg(term)
  }

  handleMoveClick = (msg) => {
    this.setState({message: msg}, () => console.log(this.state))

    if(!this.props.lists) {
      getLists(this.props.currentUser.id).then(lists => this.props.updateLists(lists))
    }

    this.setState({saveMsg: true})
    this.props.toggleMove()
  }

  handleNewList = (e) => {
    e.preventDefault()

    createList({name: this.state.newList, user_id: this.props.currentUser.id})
      .then(newList => {
        console.log(newList)
        this.handleSavingMsg(newList.id)
      })
    this.setState({newList: ''})
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value}, () => console.log(this.state))
  }

  handleExistingList = () => {
    this.handleRemovingMsg()

    const listId = this.existingList.value
    this.handleSavingMsg(listId)
  }

  handleRemovingMsg = () => {
    removeMsgFromList({msg_id: this.state.message.id, list_id: this.props.list.id})
      .then(r => {
        console.log(r);

        getListMsgs(this.props.list.id)
          .then(messages => {
            this.setState({messages}, () => console.log(this.state))
            this.props.updateListMsgs(messages)
          })
      })
  }

  handleSavingMsg = (listId) => {
    addMessage({msg_id: this.state.message.id, list_id: listId})
      .then(messages => {
        console.log(messages)
        this.setState({saveMsgStatus: true}, () => console.log(this.state))
        this.props.toggleMove()
      })
  }

  clearTranslation = () => {
    this.props.clearTranslation()
  }

  render() {
    const { list } = this.props
    const { messages } = this.state

    const renderMessages = () => {
      return messages.map((msg, i) => {
        console.log(msg, i);
        const msgStyle = {
          color: bgColor(),
          left: positionX(i),
          top: positionY(i),
        }
        return (
          <MessageContainer listReq handleSpeechClick={this.handleSpeechClick} handleTranslateClick={this.handleTranslateClick} handleMoveClick={this.handleMoveClick} msg={msg} styles={msgStyle} />
        )
      })
    }

    const renderMoveForm = () => {
      return (
        <div className='save-msg'>
          <div className='existing-container'>
            <label>List to Move to:</label>
            <select name='existingList' ref={el => this.existingList = el }>
              { this.props.lists ? this.props.lists.map(list => <option key={list.id} value={list.id}>{list.name}</option>) : <option disabled>No Lists</option> }
            </select>
            <button onClick={this.handleExistingList}>Move to this List</button>
          </div>

          <h1 className='save-msg-title'>Move the Message Here</h1>

          <form onSubmit={this.handleNewList}>
            <input type='text' name='newList' value={this.state.newList} onChange={this.handleChange} placeholder='Create New List--Name Here' autoFocus={true}/>
          </form>
        </div>
      )
    }

    const renderTranslation = () => {
      setTimeout(this.clearTranslation, 3000)
      return <span onClick={this.clearTranslation}>{this.props.translation}</span>
    }

    const renderAdvice = () => {
      const advice = ['If empty, go chat with someone and click on a message to save it to a list!', 'Click and drag a message to delete or remove it.', 'Click a message to access text-to-speech and translation features.', 'Did you know you can move a message to a different list if you clicked on it?']
      return advice[Math.floor(Math.random() * advice.length)]
    }

    return(
      <div className='list-container'>
        <header className='header'>
          { list ? list.name : null}
        </header>

        <section>
          { this.props.speechPrompt ? <Speech /> : null }
          { this.props.translatePrompt ? <Translate /> : null }
          { this.props.translation ? renderTranslation() : null }
          { this.props.movePrompt ? renderMoveForm() : null }
          { this.props.speechPrompt || this.props.translatePrompt || this.props.translation || this.props.movePrompt ? null : renderAdvice() }
        </section>

        <main className='list-messages'>
          { messages ? renderMessages() : null }
        </main>
      </div>
    )

  }
};

const mapStateToProps = (state) => {
  return {
    speechPrompt: state.appState.prompts.speechPrompt,
    selectedMessage: state.appState.selectedMessage,
    translation: state.appState.translation,
    translatePrompt: state.appState.prompts.translatePrompt,
    currentUser: state.appState.currentUser,
    movePrompt: state.appState.prompts.movePrompt,
    messages: state.appState.messages,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSpeech: () => dispatch(toggleSpeech()),
    updateSelectedMsg: (msg) => dispatch(updateSelectedMsg(msg)),
    toggleTranslate: () => dispatch(toggleTranslate()),
    toggleMove: () => dispatch(toggleMove()),
    updateListMsgs: (msgs) => dispatch(updateListMsgs(msgs)),
    clearTranslation: () => dispatch(clearTranslation()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
