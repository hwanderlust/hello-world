import React from 'react';
import { connect } from 'react-redux'
import { setTranslateTerm, updateListMsgs, toggleSpeech, toggleTranslate, toggleSave, toggleMove } from '../../actions'
import { removeMsgFromList } from '../../adapter'
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
      this.setState({timeDiff: `  days ago`})

    } else if(hh < 24 && hh > 0) {
      this.setState({timeDiff: `  hours ago`})
      // this.interval = setInterval(this.calcMsgTime(), 60000*60)


    } else if(mm <= 60 && mm > 0) {
      this.setState({timeDiff: `  minutes ago`}, () => console.log(this.state))
      // this.interval = setInterval(this.calcMsgTime(), 60000)

    } else if(ss <= 60 && ss > 0) {
      this.setState({timeDiff: `  just now`})
      // this.interval = setInterval(this.calcMsgTime(), 1000)

    }
  }

  handleSpeech = (msg) => {
    this.hidePopup()
    this.props.handleSpeechClick(msg)
  }

  handleTranslate = (msg) => {
    this.props.handleTranslateClick(msg)
    this.hidePopup()
  }

  handleSave = () => {
    this.hidePopup()
    this.props.handleSaveMsgClick(this.state.message)
  }

  handleMove = (msg) => {
    this.props.handleMoveClick(msg)
  }

  hidePopup = () => {
    this.setState({popup: false})
  }

  hideOtherFeatures = (selectedForm) => {
    switch(selectedForm) {
      case 'speech':
        // hide translate save move
        if(this.props.translatePrompt) {
          this.props.toggleTranslate()
        }
        if(this.props.savePrompt) {
          this.props.toggleSave()
        }
        if(this.props.movePrompt) {
          this.props.toggleMove()
        }
        break
      case 'translate':
        // hide speech save move
        if(this.props.speechPrompt) {
          this.props.toggleSpeech()
        }
        if(this.props.savePrompt) {
          this.props.toggleSave()
        }
        if(this.props.movePrompt) {
          this.props.toggleMove()
        }
        break
      case 'save':
        // hide speech translate move
        console.log(this.props);
        if(this.props.translatePrompt) {
          this.props.toggleTranslate()
        }
        if(this.props.speechPrompt) {
          this.props.toggleSpeech()
        }
        if(this.props.movePrompt) {
          this.props.toggleMove()
        }
        break
      case 'move':
        // hide speech translate save
        if(this.props.translatePrompt) {
          this.props.toggleTranslate()
        }
        if(this.props.savePrompt) {
          this.props.toggleSave()
        }
        if(this.props.speechPrompt) {
          this.props.toggleSpeech()
        }
        break
      default:
        return console.log('something is wronggggg');
    }
  }

  handleDragDelete = (e, msg) => {
    switch(e.type) {

      case 'dragstart':
        removeMsgFromList({msg_id: msg.id, list_id: msg.list_id})
        .then(msgs => {
          console.log(msgs);
          this.props.updateListMsgs(msgs)
        })
        return console.log('dragstart', msg);

      case 'dragend':
        return console.log('dragend', msg);

      default:
        return console.log('drag drag');
    }
  }

  togglePopup = (e, msg) => {
    console.log(e.target);
    switch(e.target.id) {
      case 'speech':
        this.hideOtherFeatures('speech')
        return this.handleSpeech(msg)
      case 'translate':
        this.hideOtherFeatures('translate')
        return this.handleTranslate(msg)
      case 'save':
        this.hideOtherFeatures('save')
        return this.handleSave()
      case 'move':
        this.hideOtherFeatures('move')
        return this.handleMove(msg)
      default:
        this.setState({
          popup: !this.state.popup,
          message: msg
        }, () => console.log(this.state))
        setTimeout(() => this.setState({popup: false}, () => console.log(this.state)), 2000)
        break
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
          <Message type='chat' classes='message recipient' timestamp={this.state.timeDiff} togglePopup={this.togglePopup} msg={msg} popup={this.state.popup} />
      )
    }

    const renderMessages = () => {
      if(listReq) {
        return (
          <Message handleDragDelete={this.handleDragDelete} type='list' classes='list-msg' togglePopup={this.togglePopup} styles={styles} msg={msg} popup={this.state.popup} />
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
    speechPrompt: state.appState.prompts.speechPrompt,
    translatePrompt: state.appState.prompts.translatePrompt,
    savePrompt: state.appState.prompts.savePrompt,
    movePrompt: state.appState.prompts.movePrompt,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTranslateTerm: (term) => dispatch(setTranslateTerm(term)),
    updateListMsgs: (msgs) => dispatch(updateListMsgs(msgs)),
    toggleSpeech: () => dispatch(toggleSpeech()),
    toggleTranslate: () => dispatch(toggleTranslate()),
    toggleSave: () => dispatch(toggleSave()),
    toggleMove: () => dispatch(toggleMove()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
