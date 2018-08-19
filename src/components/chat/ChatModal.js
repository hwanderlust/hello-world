import React from 'react';
import SkyLight from 'react-skylight'

const styles = {
}

const speechStyles = {
}

const translateStyles = {
}

const saveStyles = {
}

class ChatModal extends React.Component {
  render() {
    return (
      <div>
        <section>
          <button id='speech' className='popup speech' onClick={() => this.speechModal.show()}></button>
          <button id='translate' className='popup translate' onClick={() => this.translateModal.show()}></button>
          <button id='save' className='popup save' onClick={() => this.saveModal.show()}></button>
        </section>
        
        <SkyLight dialogStyles={speechStyles} hideOnOverlayClicked ref={ref => this.speechModal = ref} title="Text-To-Speech">
        </SkyLight>
        <SkyLight dialogStyles={translateStyles} hideOnOverlayClicked ref={ref => this.translateModal = ref} title="Translate">
        </SkyLight>
        <SkyLight dialogStyles={saveStyles} hideOnOverlayClicked ref={ref => this.saveModal = ref} title="Save">
        </SkyLight>
      </div>
    )
  }
};

export default ChatModal;
