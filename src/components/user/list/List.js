import React from 'react';
import { connect } from 'react-redux'
import spoken from '../../../../node_modules/spoken/build/spoken';

import MessageContainer from '../../chat/MessageContainer'
import { toggleSpeech, updateSelectedMsg, toggleTranslate } from '../../../actions'
import { voices, languages } from '../../../components/chat/Speech'
import Translate from '../../chat/Translate'
// what if a user navigates to /list without clicking?

const bgColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const rgbColor = "rgb(" + r + "," + g + "," + b + ")";
  return rgbColor
}

const positionX = (i) => {
  const x = (i + 5) + Math.random() * 5
  // const x = Math.floor(Math.random() * 50);
  return `${x}vw`
}

const positionY = (i) => {
  return `${i + 15}vh`
}

class List extends React.Component {

  handleSpeechClick = (msg) => {
    this.props.toggleSpeech()
    this.props.updateSelectedMsg(msg)
  }

  handleSpeechChange = (e) => {
    this.props.updateSelectedMsg(e.target.value)
  }

  handleSpeechSubmit = (e) => {
    const voice = voices.find(v => v.lang === e.target.value)
    console.log(voice);
    spoken.say(this.props.selectedMessage.text, voice.name)
    this.props.updateSelectedMsg('')
    this.props.toggleSpeech()
  }

  handleTranslateClick = (msg) => {
    this.props.toggleTranslate()
    console.log(msg.text);
    const term = encodeURI(msg.text)
    // this.props.setTranslateTerm(term)
    this.props.updateSelectedMsg(term)
  }

  render() {
    this.props.translation ? console.log(this.props.translation) : null
    const { list, messages } = this.props

    const renderMessages = () => {
      return messages.map((msg, i) => {
        console.log(msg, i);
        const msgStyle = {
          color: bgColor(),
          left: positionX(i),
          top: positionY(i),
        }
        return (
          <MessageContainer listReq handleSpeechClick={this.handleSpeechClick} handleTranslateClick={this.handleTranslateClick} msg={msg} styles={msgStyle} />
          // <li style={msgStyle} className='list-msg' key={msg.id}>
          //   {msg.text}
          // </li>
        )
      })
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
      return languages.map(lang => <option id={lang.code} key={lang.code} value={lang.code}>{lang.name}</option>)
    }

    const renderTranslateForm = () => {
      return (
        <Translate toggleTranslate={this.props.toggleTranslate} />
      )
    }

    return(
      <div className='list-container'>
        <header className='header'>
          { list ? list.name : null}
        </header>

        <section>
          { this.props.speechPrompt ? renderSpeechForm() : null }
          { this.props.translatePrompt ? renderTranslateForm() : null }

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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSpeech: () => dispatch(toggleSpeech()),
    updateSelectedMsg: (msg) => dispatch(updateSelectedMsg(msg)),
    toggleTranslate: () => dispatch(toggleTranslate()),
    // setTranslateTerm: (term) => dispatch(setTranslateTerm(term)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
