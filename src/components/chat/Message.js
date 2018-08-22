import React from 'react';
import Popup from "reactjs-popup";

const Message = ({ type, classes, timestamp, togglePopup, msg, styles, popup }) => {

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

              { type === 'chat' ? <div id='save' className="popup save"></div> : <div id='move' className="popup move"></div> }

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
