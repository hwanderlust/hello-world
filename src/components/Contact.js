import React from 'react';

class Contact extends React.Component {

  render() {
    return(
      <div className='contact-container'>
        <main className='contact-wrapper'>
          <h1>Contact</h1>
          <div className='email'>
            <i class="far fa-envelope"></i>
            <p>lpault29@gmail.com</p>
          </div>
          <div className='github'>
            <i class="fab fa-github"></i>
            <p>@pablopawpaw</p>
          </div>
          <div className='ig'>
            <i class="fab fa-instagram"></i>
            <p>@pawpawpoopoo</p>
          </div>
          <div className='in'>
            <i class="fab fa-linkedin"></i>
            <p>lpault29</p>
          </div>
        </main>
      </div>
    )
  }
};

export default Contact;
