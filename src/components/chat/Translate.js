import React from 'react';
import { connect } from 'react-redux'
import { updateLang, setTranslation } from '../../actions'
import { translateText, detectLang } from '../../adapter'

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
    if(this.props.translateTerm) {
      detectLang(this.props.translateTerm)
      .then(data => {
        // returns en but need name to set state
        // map through languages find code and return name
        const lang = data["data"]["detections"][0][0]["language"]
        const langOption = this.languages().find(item => item.code === lang)
        console.log(langOption);
        this.setState({detectedLang: {name: langOption.name, code: langOption.code}}, () => console.log(this.state))
      })
    } else {
      this.inputFocus.focus()
    }
  }

  languages = () => {
    return [
      {name: 'Arabic', code: 'ar'},
      {name: 'ChineseSimplified', code: 'zh-CN'},
      {name: "ChineseTraditional", code: 'zh-TW'},
      {name: 'Croatian', code: 'hr'},
      {name: 'Danish', code: 'da'},
      {name: 'Dutch', code: 'nl'},
      {name: 'English', code: 'en'},
      {name: 'Finnish', code: 'fi'},
      {name: 'French', code: 'fr'},
      {name: 'German', code: 'de'},
      {name: 'Greek', code: 'el'},
      {name: 'Hawaiian', code: 'haw'},
      {name: 'Hebrew', code: 'iw'},
      {name: 'Hindi', code: 'hi'},
      {name: 'Hungarian', code: 'hu'},
      {name: 'Icelandic', code: 'is'},
      {name: 'Indonesian', code: 'id'},
      {name: 'Irish', code: 'ga'},
      {name: 'Italian', code: 'it'},
      {name: 'Japanese', code: 'ja'},
      {name: 'Khmer', code: 'km'},
      {name: 'Korean', code: 'ko'},
      {name: 'Lao', code: 'lo'},
      {name: 'Latin', code: 'la'},
      {name: 'Malay', code: 'ms'},
      {name: 'Maori', code: 'mi'},
      {name: 'Mongolian', code: 'mn'},
      {name: 'Persian', code: 'fa'},
      {name: 'Polish', code: 'pl'},
      {name: 'Portuguese', code: 'pt'},
      {name: 'Punjabi', code: 'pa'},
      {name: 'Russian', code: 'ru'},
      {name: 'Slovak', code: 'sk'},
      {name: 'Spanish', code: 'es'},
      {name: 'Swahili', code: 'sw'},
      {name: 'Swedesh', code: 'sv'},
      {name: 'Tagolog', code: 'tl'},
      {name: 'Thai', code: 'th'},
      {name: 'Turkish', code: 'tr'},
      {name: 'Ukranian', code: 'uk'},
      {name: 'Vietnamese', code: 'vi'}
    ]
  }

  // move detect language feature to Message and do it after setting the term to store
  // then on Mount of SelectLang set state based on store props
  // doesn't rerender even tho mapStateToProps is here... render fn runs but the select and its options doesnt rerender

  handleChange = (e) => {
    e.persist()
    // this.setState({[e.target.name]: e.target.selectedOptions[0].id}, () => console.log(this.state))

    switch(e.target.name) {
      case 'fromLang':
        this.setState({detectedLang: {
          name: e.target.selectedOptions[0].value,
          code: e.target.selectedOptions[0].id
        }}, () => console.log(this.state))
        break
      case 'toLang':
        this.handleTranslation(e)
        break
      default:
        console.log('fked up');
        break
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
          const data = r.data.translations[0].translatedText
          const check = data.match(/=>(.*)\S/) ? true : false
          const translation = check ? data.match(/=>(.*)\S/)[1].trim() : data
          console.log(translation);
          this.props.setTranslation(translation)
        })

      } else if(this.props.translateTerm) {
        // calls on adapter fn to fetch for translation
        translateText(this.props.translateTerm, this.state.detectedLang.code, e.target.selectedOptions[0].id)
        .then(r => {
          // console.log(r);
          // console.log(r.data.translations);
          const data = r.data.translations[0].translatedText
          const check = data.match(/=>(.*)\S/) ? true : false
          const translation = check ? data.match(/=>(.*)\S/)[1].trim() : data
          console.log(translation);
          this.props.setTranslation(translation)
        })
      }

    // unmounts component
    this.props.hideForms('translation')
  }

  render() {

    const renderLanguages =  () => {
      return this.languages().map(lang => <option key={lang.code} id={lang.code}>{lang.name}</option>)
    }

    return (
      <React.Fragment>

        { this.props.translateTerm ? null : (
          <div className='translate-form'>
            <input type='text' placeholder='What would you like to translate?' value={this.state.input} onChange={this.handleInput} autofocus='true' ref={c => this.inputFocus = c} />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLang: (lang) => dispatch(updateLang(lang)),
    setTranslation: (translation) => dispatch(setTranslation(translation)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Translate);
