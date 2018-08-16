import React from 'react';
import { connect } from 'react-redux'

// what if a user navigates to /list without clicking? 

const List = ({ list, messages }) => {

  const renderMessages = () => {
    return messages.map(msg => <li key={msg.id}>{msg.text}</li>)
  }

  return(
    <div>
      <header>
        { list ? list.name : null}
      </header>
      <main>
        { messages ? renderMessages() : null }
      </main>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    list: state.appState.list,
    messages: state.appState.messages
  }
}

export default connect(mapStateToProps)(List);
