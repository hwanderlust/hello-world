import React from 'react';
import { connect } from 'react-redux'
import { setTranslateTerm } from '../../actions'

class Message extends React.Component {

  handleClick = (message) => {
    this.props.handleMsgClick()
    console.log(message.text);

    const term = encodeURI(message.text)
    console.log(term);
    this.props.setTranslateTerm(term)

    
    // must wait for user to select a language from the select dropdown first
    // translateText(term, language).then(r => {
    //   console.log(r);
    //   console.log(r.data.translations);
    //   const data = r.data.translations[0].translatedText
    //   const check = data.match(/=>(.*)\S/) ? true : false
    //
    //   const translation = check ? data.match(/=>(.*)\S/)[1].trim() : data
    //   console.log(translation);
    // })
    //
    // translateText(term).then(r => {
    //   console.log(r);
    //   console.log(r.data.translations);
    //   const data = r.data.translations[0].translatedText
    //   const check = data.match(/=>(.*)\S/) ? true : false
    //
    //   const translation = check ? data.match(/=>(.*)\S/)[1].trim() : data
    //   console.log(translation);
    // })
  }

  render() {
    const { msg } = this.props

    return (
      <li key={msg.id} onClick={() => this.handleClick(msg)}>{msg.text}</li>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     language: state.appState.language
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    setTranslateTerm: (term) => dispatch(setTranslateTerm(term))
  }
}

export default connect(null, mapDispatchToProps)(Message);
