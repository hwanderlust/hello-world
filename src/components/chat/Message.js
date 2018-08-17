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

  showPopup = (message) => {
    this.setState({popup: true})
    this.setState({message}, () => console.log(this.state))
  }

  render() {
    const { msg, currentUser } = this.props

    const renderSenderMessages = () => {
      return (
        // <div className=''>
          <li key={msg.id} className='message sender' onClick={() => this.showPopup(msg)} >
            {msg.text}

            { this.state.popup ? (

              <Popup
                trigger={
                  <React.Fragment>
                    <br/><br/>

                    <div id='speech' onDoubleClick={() => this.handleSpeech()} className="popup speech"></div>

                    <div id='translate' onDoubleClick={() => this.handleTranslate()} className="popup translate"></div>

                    <div id='save' onDoubleClick={() => this.handleSave()} className="popup save"></div>
                  </React.Fragment>
                }
                position='bottom center'
              >
              </Popup>

            ) : null }

          </li>
        // </div>
      )
    }

    const renderRecipientMessages = () => {
      return (
          // <div className=''>
            <li key={msg.id} className='message recipient' onClick={() => this.showPopup(msg)} >
              {msg.text}

              { this.state.popup ? (

                <Popup
                  trigger={
                    <React.Fragment>
                      <br/><br/>

                      <div id='speech' onDoubleClick={() => this.handleSpeech()} className="popup speech"></div>

                      <div id='translate' onDoubleClick={() => this.handleTranslate()} className="popup translate"></div>

                      <div id='save' onDoubleClick={() => this.handleSave()} className="popup save"></div>
                    </React.Fragment>
                  }
                  position='bottom center'
                >
                </Popup>

              ) : null }

            </li>
          // </div>
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
