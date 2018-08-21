import React from 'react';

// what if a user navigates to /list without clicking?

const bgColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const rgbColor = "rgb(" + r + "," + g + "," + b + ")";
  return rgbColor
}

const positionX = (i) => {
  const x = (i + 5) + Math.random() * 5
  // const x = Math.floor(Math.random() * 50);
  return `${x}vw`
}

const positionY = (i) => {
  return `${i + 15}vh`
}

const List = ({ list, messages }) => {

  const renderMessages = () => {
    return messages.map((msg, i) => {
      console.log(msg, i);
      const msgStyle = {
        color: bgColor(),
        left: positionX(i),
        top: positionY(i),
      }
      return (
        <li style={msgStyle} className='list-msg' key={msg.id}>
          {msg.text}
        </li>
      )
    })
  }

  return(
    <div className='list-container'>
      <header className='header'>
        { list ? list.name : null}
      </header>
      <main className='list-messages'>
        { messages ? renderMessages() : null }
      </main>
    </div>
  )
};

export default List;
