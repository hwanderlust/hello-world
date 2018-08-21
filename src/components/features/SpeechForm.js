import React from 'react';

const SpeechForm = () => {
  return (
    <form className='speech-form'>
      <div>
        <label>Listen to:</label>
        <input type='text' value={this.state.speech} onChange={this.handleSpeechChange} />
      </div>

      <div>
        <label>Choose an appropriate voice:</label>
        <select id='selected-lang' onChange={this.handleSpeechSubmit}>{ renderLanguages() }</select>
      </div>
    </form>
  )
}
