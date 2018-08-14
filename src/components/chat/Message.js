import React from 'react';
import { connect } from 'react-redux'
import { setTranslateTerm } from '../../actions'

class Message extends React.Component {
  state = {
    sender: null,
    recipient: null,
  }

  componentDidMount() {
    // if(this.props.currentUser) {
    //   this.setState({sender: this.props.currentUser}, () => console.log(this.state))
    // }
    // if(this.props.recipientUser) {
    //   this.setState({recipient: this.props.recipientUser}, () => console.log(this.state))
    // }
  }

  componentDidUpdate(prevProps, prevState) {

  }

  handleClick = (message) => {
    this.props.handleSpeechClick(message.text)
    // console.log(message.text);

    // const term = encodeURI(message.text)
    // console.log(term);
    // this.props.setTranslateTerm(term)


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

  handleDoubleClick = (message) => {
    this.props.toggleTranslationForm()
    console.log(message.text);

    const term = encodeURI(message.text)
    console.log(term);
    this.props.setTranslateTerm(term)
  }

  render() {
    const { msg, currentUser } = this.props

    const renderSenderMessages = () => {
      return (
          <li key={msg.id} className='message sender' onClick={() => this.handleClick(msg)} onDoubleClick={() => this.handleDoubleClick(msg)} >{msg.text}</li>
      )
    }

    const renderRecipientMessages = () => {
      return (
          <li key={msg.id} className='message recipient' onClick={() => this.handleClick(msg)} onDoubleClick={() => this.handleDoubleClick(msg)} >{msg.text}</li>
      )
    }

    const renderMessages = () => {
      if(currentUser) {
        return currentUser.id === msg.sender_id ? renderSenderMessages() : renderRecipientMessages()
      }
    }

    return (
      renderMessages()
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.appState.currentUser,
    recipientUser: state.appState.recipientUser,
    // language: state.appState.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTranslateTerm: (term) => dispatch(setTranslateTerm(term))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);
