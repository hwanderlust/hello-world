import React from 'react';
import { connect } from 'react-redux'
import spoken from '../../../node_modules/spoken/build/spoken.js';
import { toggleSpeech, updateSelectedMsg, clearSelectedMsg, updateSpokenLangs, toggleSpinner } from '../../actions'

class Speech extends React.PureComponent {

  componentDidMount() {
    if(!this.props.spokenLanguages) {
      spoken.voices().then(r => this.props.updateSpokenLangs(r))
    }
  }

  handleSpeechChange = (e) => {
    this.props.updateSelectedMsg(e.target.value)
  }

  handleSpeechSubmit = (e) => {
    this.props.toggleSpinner()
    const voice = this.props.spokenLanguages.find(v => v.lang === e.target.value)
    spoken.say(this.props.selectedMessage.text, voice.name)
    .then(speechInfo => this.props.toggleSpinner())
    this.props.clearSelectedMsg()
    this.props.toggleSpeech()
  }


  render() {
    const { spokenLanguages, selectedMessage } = this.props

    const renderLanguages = () => {
      return spokenLanguages.map(language => <option id={language.lang} key={language.voiceURI} value={language.lang}>{language.name}</option>)
    }

    return (
      <form className='speech-form'>
        <div>
          <label>Listen to:</label>
          <input type='text' value={selectedMessage.text} onChange={this.handleSpeechChange} />
        </div>

        <div>
          <label>Choose an appropriate voice:</label>
          <select id='selected-lang' onChange={this.handleSpeechSubmit}>
            <option key='default' id='default' disabled selected>Choose one</option>
            { spokenLanguages ? renderLanguages() : null }
          </select>
        </div>
      </form>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    selectedMessage: state.appState.selectedMessage,
    spokenLanguages: state.appState.spokenLanguages,
    loading: state.appState.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSpeech: () => dispatch(toggleSpeech()),
    updateSelectedMsg: (msg) => dispatch(updateSelectedMsg(msg)),
    clearSelectedMsg: () => dispatch(clearSelectedMsg()),
    updateSpokenLangs: (langs) => dispatch(updateSpokenLangs(langs)),
    toggleSpinner: () => dispatch(toggleSpinner()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Speech);
