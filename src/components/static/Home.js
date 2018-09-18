import React from 'react';
import { connect } from 'react-redux'

class Home extends React.Component {
  state = {
    load: false,
  }

  componentDidMount() {
    this.setState({load: true})
  }

  render() {

    return (
      this.state.load ? (
        <div className='home-container'>
          <header>
            <div id='home-demo' className='home-img-container'>
              <img src='' alt='' />
            </div>

            <div className='home-bullet-container'>
              <i class="fas fa-sign-language"></i><li>Exchange Languages</li>
              <i class="fas fa-exchange-alt"></i><li>Exchange Cultures</li>
              <i class="fas fa-language"></i><li>Translation</li>
              <i class="fas fa-language"></i><li>Text-to-Speech</li>
            </div>

            <div id='home-pic' className='home-img-container'>
              <img src='https://3bonlp1aiidtbao4s10xacvn-wpengine.netdna-ssl.com/wp-content/uploads/2018/02/Language-App-Image.jpg' alt='' />
              <img src='http://learnenglishteens.britishcouncil.org/sites/teens/files/styles/article/public/field/image/rs7352_thinkstockphotos-493800479-low.jpg?itok=NKUqml8J' alt=''/>
            </div>
          </header>

          <section>
            <form>
              <label>Sign up</label>
              <input type='text' />
            </form>
          </section>

          <main>
            <div>
              <h1>UX</h1>
              <i class="far fa-keyboard"></i>
            </div>

            <div>
              <i class="fas fa-brain"></i>
              <h1>Memory</h1>
            </div>

            <div>
              <h1>Connections</h1>
              <i class="far fa-handshake"></i>
            </div>

            <div>
              <i class="fas fa-balance-scale"></i>
              <h1>Multitasking</h1>
            </div>
          </main>

        </div>
      ) : <img src='https://cdn.dribbble.com/users/503653/screenshots/3143656/fluid-loader.gif' alt='loading spinner page loading' />
    )
  }
}

export default connect()(Home);
