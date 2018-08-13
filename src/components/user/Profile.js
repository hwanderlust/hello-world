import React from 'react';
import { connect } from 'react-redux'
import spoken from '../../../node_modules/spoken/build/spoken.js';

// people you've spoken with
// profile picture
// saved notes
// auto save terms translated
//

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.selectedLang = React.createRef()

    this.state = {
      text: ''
    }
  }
  state = {
    text: '',
  }

  handleClick = () => {
    spoken.voices().then( voices => console.log(voices) );
    // spoken.recognition.language = 'en-AU';
    // spoken.recognition.language = 'ja-JP';
    // spoken.say('hello!', 'Karen')
  }

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

  handleChange = (e) => {
    this.setState({text: e.target.value}, () => console.log(this.state))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const voice = this.voices().find(v => v.lang === e.target.querySelector('#selected-lang').value)
    console.log(voice);
    spoken.say(this.state.text, voice.name)
  }

  render() {

    const renderLanguages = () => {
      return this.languages().map(lang => <option id={lang.code} key={lang.code} value={lang.code}>{lang.name}</option>)
    }

    return (
      <div className='profile'>
        {this.props.currentUser ? <h1 className='header'>{this.props.currentUser.username}</h1> : null}

        {this.props.currentUser ? <div className='img-wrapper'><img src={this.props.currentUser.profile_picture}/></div> : null}

        <section>
          <h3>Languages</h3>
          <p>English, Japanese, Korean</p>
          <h3>Description</h3>
          <p>Loves to travel</p>
          <h3>Goals</h3>
          <p>Brush up on language skills through daily conversation and about life</p>
        </section>


        {/* make into component   */}
        <aside>
          <span><h1>Saved Notes</h1></span>
          <main>
            <h3>List Name</h3>
            <h3>List Name</h3>
            <h3>List Name</h3>
          </main>
        </aside>

        {/* <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.text} onChange={this.handleChange} />
          <select ref={this.selectedLang} id='selected-lang'>{ renderLanguages() }</select>
          <input type='submit'/>
        </form> */}
        {/* <button onClick={this.handleClick}>Click Me</button> */}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.appState.currentUser,
  }
}

export default connect(mapStateToProps)(Profile)
