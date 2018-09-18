import React from 'react';

class Contact extends React.Component {

  render() {
    return(
      <div className='contact-container'>
        <main className='contact-wrapper'>
          <h1>Contact</h1>
          <div className='email'>
            <i class="far fa-envelope"></i>
            <a href="mailto:someone@yoursite.com"><p>lpault29@gmail.com</p></a>
          </div>
          <div className='github'>
            <i class="fab fa-github"></i>
            <a href="https://github.com/hwanderlust" target="_blank" rel="noopener noreferrer"><p>@hwanderlust</p></a>
          </div>
          <div className='ig'>
            <i class="fab fa-instagram"></i>
            <a href="https://www.instagram.com/pawpawpoopoo/" target="_blank" rel="noopener noreferrer"><p>@pawpawpoopoo</p></a>
          </div>
          <div className='in'>
            <i class="fab fa-linkedin"></i>
            <a href="https://www.linkedin.com/in/paultaly/" target="_blank" rel="noopener noreferrer"><p>Paul Ly</p></a>
          </div>
        </main>
      </div>
    )
  }
};

export default Contact;
