import React from 'react';
import { connect } from 'react-redux'
import { setTranslateTerm } from '../../actions'
import Popup from "reactjs-popup";

class Message extends React.Component {
  state = {
    popup: false,
    message: null,
  }

  handleSpeech = () => {
    this.hidePopup()
    this.props.handleSpeechClick(this.state.message.text)
  }

  handleTranslate = () => {
    this.props.handleTranslationClick()

    console.log(this.state.message.text);

    const term = encodeURI(this.state.message.text)
    console.log(term);
    this.props.setTranslateTerm(term)
    this.hidePopup()
  }

  handleSave = () => {
    this.hidePopup()
    this.props.handleSaveMsgClick(this.state.message)
  }

  hidePopup = () => {
    this.setState({popup: false})
  }

  togglePopup = (e, msg) => {
    console.log(e.target);
    switch(e.target.id) {
      case 'speech':
        return this.handleSpeech()
      case 'translate':
        return this.handleTranslate()
      case 'save':
        return this.handleSave()
      default:
        return this.setState({
          popup: !this.state.popup,
          message: msg
        }, () => console.log(this.state))
    }
  }

  render() {
    const { msg, currentUser } = this.props

    const renderSenderMessages = () => {
      return (
          <li id='msg' key={msg.id} className='message sender' onClick={(e) => this.togglePopup(e, msg)} >
            {msg.text}

            { this.state.popup ? (

              <Popup
                trigger={
                  <React.Fragment>
                    <br/><br/>

                    <div id='speech' className="popup speech"></div>

                    <div id='translate' className="popup translate"></div>

                    <div id='save' className="popup save"></div>
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
            <li id='msg' key={msg.id} className='message recipient' onClick={(e) => this.togglePopup(e, msg)} >
              {msg.text}

              { this.state.popup ? (

                <Popup
                  trigger={
                    <React.Fragment>
                      <br/><br/>

                      <div id='speech' className="popup speech"></div>

                      <div id='translate' className="popup translate"></div>

                      <div id='save' className="popup save"></div>
                    </React.Fragment>
                  }
                  position='bottom center'
                >
                </Popup>

              ) : null }

            </li>
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
    setTranslateTerm: (term) => dispatch(setTranslateTerm(term)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);
