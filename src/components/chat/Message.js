import React from 'react';
import { translateText } from '../../adapter'

const Message = (props) => {
  const { msg, handleMsgClick } = props

  const handleClick = (message) => {
    handleMsgClick()
    console.log(message.text);
    // const term = encodeURI("仕方ない")
    const term = encodeURI(message.text)
    translateText(term).then(r => {
      console.log(r);
      console.log(r.data.translations);
      const data = r.data.translations[0].translatedText
      const check = data.match(/=>(.*)\S/) ? true : false

      const translation = check ? data.match(/=>(.*)\S/)[1].trim() : data
      console.log(translation);
    })
  }

  return (
    <li key={msg.id} onClick={() => handleClick(msg)}>{msg.text}</li>
  )
}

export default Message;
