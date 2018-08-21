import React from 'react';
import Popup from "reactjs-popup";

const Message = ({ type, classes, timestamp, togglePopup, msg, styles, popup }) => {
  // distinguish between chatbox and list messages
  // chatbox
    // id, classnames, timestamp
    // key, onclick, msg.text, popup
  // list
    // classname, styles
    // key, onclick, msg.text, popup (save --> move)

  // different
    // class names
      // message for only chatbox's messages
      // sender and recipient
      // list-msg for list's messages
    // timestamp (only on recipient messages)
    // styles (for list's messages)
  // same
    // id
    // key (msg.id)
    // onClick (togglePopup)
    // msg.text
    // popup
      // trigger w/o save (maybe move instead)

    const [classType, senderRecipient] = classes.split(' ')

  return (
    <li id='msg' key={msg.id} class={classes} style={styles ? styles : null} onClick={(e) => togglePopup(e, msg)} >
      {msg.text}
      
      { type === 'chat' && senderRecipient === 'recipient' ? <span className='timestamp'>{timestamp}</span> : null }

      { popup ? (

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

export default Message
