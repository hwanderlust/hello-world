import React from 'react';

// what if a user navigates to /list without clicking?

const List = ({ list, messages }) => {

  const renderMessages = () => {
    return messages.map(msg => <li className='list-msg' key={msg.id}>{msg.text}</li>)
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
