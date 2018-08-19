import React from 'react';
import { connect } from 'react-redux'
import { setTranslateTerm } from '../../actions'
import Popup from "reactjs-popup";

class Message extends React.Component {
  state = {
    popup: false,
    message: null,
    timeSent: null,
    // timeNow: null,
    timeDiff: null,
  }

  componentDidMount() {
    const { msg } = this.props
    const sent = new Date(msg.created_at)
    const timeSent = sent.getTime()
    // const now = new Date(Date.now())
    // const timeNow = now.getTime()
    this.setState({ timeSent }, () => this.calcMsgTime())
  }

  componentWillUnmount() {
    // clearInterval(this.interval)
  }

  calcMsgTime = () => {
    console.log(`calcMsgTime`);
    // this.interval ? clearInterval(this.interval) : null
    // const sent = new Date(msg.created_at)
    // const timeSent = sent.getTime()
    const now = new Date(Date.now())
    const timeNow = now.getTime()
    const timeDiff = timeNow - this.state.timeSent

    let msec = timeDiff;
    const hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    const mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    const ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    if(hh >= 24) {
      this.setState({timeDiff: `  days ago`}, () => console.log(this.state))

    } else if(hh < 24 && hh > 0) {
      this.setState({timeDiff: `  hours ago`}, () => console.log(this.state))
      // this.interval = setInterval(this.calcMsgTime(), 60000*60)


    } else if(mm <= 60 && mm > 0) {
      this.setState({timeDiff: `  minutes ago`}, () => console.log(this.state))
      // this.interval = setInterval(this.calcMsgTime(), 60000)

    } else if(ss <= 60 && ss > 0) {
      this.setState({timeDiff: `  just now`}, () => console.log(this.state))
      // this.interval = setInterval(this.calcMsgTime(), 1000)

    }
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

    const renderTime = () => {

    }

    const renderSenderMessages = () => {
      return (
          <li id='msg' key={msg.id} class='message sender' onClick={(e) => this.togglePopup(e, msg)} >
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

              <span className='timestamp'>{this.state.timeDiff ? this.state.timeDiff : null}</span>

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
