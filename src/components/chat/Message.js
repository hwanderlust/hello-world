import React from 'react';
import { connect } from 'react-redux'
import { setTranslateTerm } from '../../actions'
import Popup from "reactjs-popup";

class Message extends React.Component {
  state = {
    popup: false,
  }

  handleSpeech = (message) => {
    this.hidePopup()
    this.props.handleSpeechClick(message.text)
  }

  handleTranslate = (message) => {
    // show form
    // this.props.toggleTranslationForm()
    this.props.handleTranslationClick()
    
    console.log(message.text);

    const term = encodeURI(message.text)
    console.log(term);
    this.props.setTranslateTerm(term)
    this.hidePopup()
  }

  hidePopup = () => {
    this.setState({popup: false})
  }

  showPopup = () => {
    this.setState({popup: true})
  }

  render() {
    const { msg, currentUser } = this.props

    const renderSenderMessages = () => {
      return (
          <li key={msg.id} className='message sender' onClick={this.showPopup} >
            {msg.text}

            { this.state.popup ? (

              <Popup
                trigger={
                  <React.Fragment>
                    <br/><br/>
                    <div onDoubleClick={() => this.handleSpeech(msg)} className="popup speech"></div>
                    <div onDoubleClick={() => this.handleTranslate(msg)} className="popup translate"></div>
                  </React.Fragment>
                }
                position='bottom center'
              >
              </Popup>

            ) : null }

          </li>
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
