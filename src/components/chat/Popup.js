import React from 'react';
import Popup from "reactjs-popup";

const PopupPopup= (type) => {
  return (
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
  )
}

export default PopupPopup
