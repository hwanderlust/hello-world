import React from 'react';

const Message = (props) => {
  const { msg } = props
  return (
    <li key={msg.id}>{msg.text}</li>
  )
}

export default Message;
