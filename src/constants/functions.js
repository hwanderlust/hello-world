import { voices } from '../components/chat/Speech'
import spoken from 'spoken'

const checkRenderedForms = (form) => {
  debugger
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

const handleSpeechChange = (msg) => {
  this.setState({speech: msg}, () => console.log(this.state))
}

const handleSpeechSubmit = (e) => {
  const voice = voices.find(v => v.lang === e.target.value)
  console.log(voice);
  spoken.say(this.state.speech, voice.name)
  this.hideForms('speech')
}

export {
  checkRenderedForms,
  handleSpeechChange,
  handleSpeechSubmit
}
