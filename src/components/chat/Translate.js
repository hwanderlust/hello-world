import React from 'react';
import { connect } from 'react-redux'
import { updateLang, setTranslation } from '../../actions'
import { translateText, detectLang } from '../../adapter'
import { googleLanguages } from '../../constants'

class Translate extends React.Component {
  state = {
    detectedLang: {
      name: 'English',
      code: 'en'
    },
    input: '',
  }

  componentDidMount() {
    console.log(this.state);
    if(this.props.selectedMessage) {
      detectLang(this.props.selectedMessage)

      .then(data => {
        const lang = data["data"]["detections"][0][0]["language"]
        const langOption = googleLanguages.find(item => item.code === lang)
        console.log(langOption);

        if(langOption) {
          this.setState({detectedLang: {name: langOption.name, code: langOption.code}}, () => console.log(this.state))
        }
      })

    } else {
      console.log('focussssssss');
      this.inputFocus.focus()
    }
  }

  handleChange = (e) => {
    e.persist()

    switch(e.target.name) {
      case 'fromLang':
        return this.setState({detectedLang: {
          name: e.target.selectedOptions[0].value,
          code: e.target.selectedOptions[0].id
        }}, () => console.log(this.state))
      case 'toLang':
        return this.handleTranslation(e)
      default:
        return console.log('fked up');
    }
  }

  handleInput = (e) => {
    this.setState({input: e.target.value}, () => console.log(this.state))
  }

  handleTranslation = (e) => {
    e.persist()
    this.props.updateLang(e.target.selectedOptions[0].id)

      if(this.state.input) {
        const term = encodeURI(this.state.input)
        translateText(term, this.state.detectedLang.code, e.target.selectedOptions[0].id)

        .then(r => {
          const translation = this.formatTranslation(r)
          this.props.setTranslation(translation)
        })

      } else if(this.props.selectedMessage) {
        translateText(this.props.selectedMessage, this.state.detectedLang.code, e.target.selectedOptions[0].id)

        .then(r => {
          const translation = this.formatTranslation(r)
          this.props.setTranslation(translation)
        })
      }

    this.props.toggleTranslate()
  }

  formatTranslation = (r) => {
    const data = r.data.translations[0].translatedText
    const check = data.match(/=>(.*)\S/) ? true : false
    const translation = check ? data.match(/=>(.*)\S/)[1].trim() : data
    console.log(translation);
    return translation
  }

  render() {

    const renderLanguages =  () => {
      return googleLanguages.map(lang => <option key={lang.code} id={lang.code}>{lang.name}</option>)
    }

    return (
      <React.Fragment>

        { this.props.selectedMessage ? null : (
          <div className='translate-form'>
            <input type='text' placeholder='What would you like to translate?' value={this.state.input} onChange={this.handleInput} autoFocus='true' ref={c => this.inputFocus = c} />
          </div>
        ) }

        <div className='translate-form'>
          <label>Translate from:</label>
          <select onChange={this.handleChange} name='fromLang' value={this.state.detectedLang.name}>
            { renderLanguages() }
          </select>
        </div>

        <div className='translate-form'>
          <label>Translate to:</label>
          <select onChange={this.handleChange} name='toLang'>
            { renderLanguages() }
          </select>
        </div>

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.appState.language,
    translateTerm: state.appState.translateTerm,
    selectedMessage: state.appState.selectedMessage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLang: (lang) => dispatch(updateLang(lang)),
    setTranslation: (translation) => dispatch(setTranslation(translation)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Translate);
