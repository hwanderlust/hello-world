import React from 'react';
import { withRouter } from 'react-router-dom'

const Home = (props) => {

const handleSignup = () => {
  props.history.push('/signup')
}

  return (
    <div className='home-container'>
      <header>
        <div id='home-demo' className='home-img-container'>
          <img src='' alt='' />
        </div>

        <div className='home-bullet-container'>
          <i className="fas fa-globe-americas"></i><li>Exchange Languages</li>
          <i className="fas fa-language"></i><li>Translation</li>
          <i className="fas fa-volume-up"></i><li>Text-to-Speech</li>
          <i className="far fa-grin-hearts"></i><li>Emoji Support</li>
        </div>

        <div id='home-pic' className='home-img-container'>
          <img src='https://3bonlp1aiidtbao4s10xacvn-wpengine.netdna-ssl.com/wp-content/uploads/2018/02/Language-App-Image.jpg' alt='' />
          <img src='http://learnenglishteens.britishcouncil.org/sites/teens/files/styles/article/public/field/image/rs7352_thinkstockphotos-493800479-low.jpg?itok=NKUqml8J' alt=''/>
        </div>
      </header>

      <section>
        <button className='sign-up-btn' onClick={handleSignup}>Sign up</button>
      </section>

      <main>
        <div>
          <h1>UX</h1>
          <i className="far fa-keyboard"></i>
        </div>

        <div>
          <i className="fas fa-brain"></i>
          <h1>Memory</h1>
        </div>

        <div>
          <h1>Connections</h1>
          <i className="far fa-handshake"></i>
        </div>

        <div>
          <i className="fas fa-balance-scale"></i>
          <h1>Multitasking</h1>
        </div>
      </main>

    </div>
  )
}

export default withRouter(Home);
