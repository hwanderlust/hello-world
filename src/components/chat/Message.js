import React from 'react';
import Emoji from 'react-emoji-render';
import PopupPopup from './Popup'

const Message = ({ handleDragDelete, type, classes, timestamp, togglePopup, msg, styles, popup }) => {

  // eslint-disable-next-line
  const [classType, senderRecipient] = classes.split(' ')

  return type === 'list' ? (
    <li draggable="true" onDragStart={(e) => handleDragDelete(e, msg)} onDragEnd={(e) => handleDragDelete(e, msg)} id='msg' key={msg.id} className={classes} style={styles ? styles : null} onClick={(e) => togglePopup(e, msg)} >

      {msg.text}

      { popup ? <PopupPopup type={type} /> : null }

    </li>

  ) : (

    <li id='msg' key={msg.id} className={classes} style={styles ? styles : null} onClick={(e) => togglePopup(e, msg)} >
      <Emoji text={msg.text}></Emoji>

      { type === 'chat' && senderRecipient === 'recipient' ? <span className='timestamp'>{timestamp}</span> : null }

      { popup ? <PopupPopup type={type} /> : null }

    </li>
  )
}

export default Message
