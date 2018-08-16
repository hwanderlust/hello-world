import React from 'react';
import { connect } from 'react-redux'
import { setTranslateTerm } from '../../actions'
import { createList, addMessage } from '../../adapter'
import Popup from "reactjs-popup";

class Message extends React.Component {
  state = {
    popup: false,
    newList: '',
    message: null,
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

  handleSavingMsg = (msg) => {

    // switch (e.target.id) {
    //   case 'speech':
    //     break;
    //   case 'translate':
    //     break;
    //   case 'save':
    //     return this.setState({message: msg}, () => console.log(this.state))
    //   default:
    //
    // }

    // have msg
    // have user
    // need list

    // show a list of available lists to choose from
      // onChange => adds message to list (no submit btn)
    // option to create a new list
      // onSubmit => adds message to list (submit btn?)

    // this.props.currentUser
  }

  hidePopup = () => {
    this.setState({popup: false})
  }

  showPopup = (message) => {
    this.setState({popup: true})
    this.setState({message}, () => console.log(this.state))
    // must pass in event otherwise it's just a react event
    // if event is on save msg btn
    // set state for msg
    //
  }

  handleNewList = (e) => {
    e.preventDefault()
    createList({name: this.state.newList, user_id: this.props.currentUser.id})
      .then(newList => {
        console.log(newList)

        addMessage({msg_id: this.state.message.id, list_id: newList.id})
          .then(messages => console.log(messages))
          // store messages in store
          // pass to list page view as props
          // redirect to list page/view
      })
    this.hidePopup()
  }

  handleNewListChange = (e) => {
    this.setState({newList: e.target.value}, () => console.log(this.state))
  }

  render() {
    const { msg, currentUser } = this.props

    const renderSenderMessages = () => {
      return (
          <li key={msg.id} className='message sender' onClick={() => this.showPopup(msg)} >
            {msg.text}

            { this.state.popup ? (

              <Popup
                trigger={
                  <React.Fragment>
                    <br/><br/>
                    <div id='speech' onDoubleClick={() => this.handleSpeech(msg)} className="popup speech"></div>
                    <div id='translate' onDoubleClick={() => this.handleTranslate(msg)} className="popup translate"></div>

                    {/* use Popup to show card with lists and input to create a new list and submit form to add msg to list */}

                    <div id='save' className="popup ">
                      <Popup trigger={
                        <button>
                          Save Message
                        </button>
                      }>
                        <React.Fragment>
                          <select onChange={this.handleSavingMsg}>
                            <option>test</option>
                            <option>test2</option>
                            <option>test3</option>
                          </select>
                          <Popup trigger={<button>New List</button>}>
                            <form onSubmit={this.handleNewList}>
                              <input type='text' value={this.state.newList} onChange={this.handleNewListChange} />
                            </form>
                          </Popup>
                        </React.Fragment>
                      </Popup>
                    </div>
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
          <li key={msg.id} className='message recipient' >{msg.text}</li>
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
