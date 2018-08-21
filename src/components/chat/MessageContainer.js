import React from 'react';
import { connect } from 'react-redux'
import { setTranslateTerm } from '../../actions'
import Message from './Message'

class MessageContainer extends React.Component {
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

  handleSpeech = (msg) => {
    this.hidePopup()
    // this.props.handleSpeechClick(this.state.message.text)
    this.props.handleSpeechClick(msg)
  }

  handleTranslate = (msg) => {
    // this.props.handleTranslationClick()
    //
    // console.log(this.state.message.text);
    //
    // const term = encodeURI(this.state.message.text)
    // console.log(term);
    // this.props.setTranslateTerm(term)
    // this.hidePopup()

    this.props.handleTranslateClick(msg)
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
        return this.handleSpeech(msg)
      case 'translate':
        return this.handleTranslate(msg)
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
    const { msg, currentUser, listReq, styles } = this.props

    const renderSenderMessages = () => {
      return (
          <Message type='chat' classes='message sender' togglePopup={this.togglePopup} msg={msg} popup={this.state.popup} />
      )
    }

    const renderRecipientMessages = () => {
      return (
          <Message type='chat' classes='message recipient' togglePopup={this.togglePopup} msg={msg} popup={this.state.popup} />
      )
    }

    const renderMessages = () => {
      if(listReq) {
        return (
          <Message type='list' classes='list-msg' togglePopup={this.togglePopup} styles={styles} msg={msg} popup={this.state.popup} />
        )

      } else if(currentUser) {
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTranslateTerm: (term) => dispatch(setTranslateTerm(term)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
