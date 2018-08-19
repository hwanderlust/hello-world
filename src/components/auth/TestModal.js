import React from 'react';
import SkyLight from 'react-skylight';

class TestModal extends React.Component {

  render() {
    const accountStyles = {
      backgroundColor: '#00897B',
      color: '#ffffff',
      width: '30%',
      height: '20%',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '35%',
      left: '60%'
    };

    const aboutStyles = {
      backgroundColor: '#00897B',
      color: '#ffffff',
      width: '100%',
      height: '100%',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '50%',
      left: '20%'
    };

    const detailsStyle = {
      backgroundColor: '#00897B',
      color: '#ffffff',
      width: '100%',
      height: '100%',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '50%',
      left: '20%'
    };

    return (
      <div>
        <section>
          <button onClick={() => this.account.show()}>Sign up</button>
        </section>
        <SkyLight dialogStyles={accountStyles} hideOnOverlayClicked ref={ref => this.account = ref} title="Account Info">
          <form id='accountForm' className='auth-children'>
            <label htmlFor='username'>Username</label>
            <input className='inputs' type='text' name='username' autofocus="true" />
            <br />
            <label htmlFor='password'>Password</label>
            <input className='inputs' type='password' name='password' />
            <br />
          </form>

          <section>
            <button onClick={() => this.about.show()}>Next</button>
          </section>
          <SkyLight dialogStyles={aboutStyles} hideOnOverlayClicked ref={ref => this.about = ref} title="Your Background">
            <form id='aboutForm' className='auth-children'>
              <label htmlFor='location'>Where you at?</label>
              <input type='text' name='location' className='inputs' autofocus="true" ref={c => (this.inputFocus = c)} />
              <br />
              <label htmlFor='age'>How wise are you? (age)</label>
              <input type='number' name='age' className='inputs' />
              <br />
              <label htmlFor='nationality'>Where's your passport from?</label>
              <input type='text' name='nationality' className='inputs' />
              <br />
              <label htmlFor='languages'>Which languages do you speak?</label>
              <input type='text' name='languages' className='inputs' />
              <br />
            </form>

            <section>
              <button onClick={() => this.details.show()}>Next</button>
            </section>
            <SkyLight dialogStyles={detailsStyle} hideOnOverlayClicked ref={ref => this.details = ref} title="Your Profile">
              <form id='detailsForm' className='auth-children'>
                <label htmlFor='introduction'>Tell us about yourself!</label>
                <input type='text' name='introduction' className='inputs' autofocus="true" ref={c => (this.inputFocus = c)}/>
                <br />
                <label htmlFor='hobbies'>Let others know what your hobbies are and what you're passionate about.</label>
                <input type='text' name='hobbies' className='inputs' />
                <br />
                <label htmlFor='goals'>What are your learning goals here?</label>
                <input type='text' name='goals' className='inputs' />
                <input type='submit' className='' />
                <br />
              </form>

            </SkyLight>
          </SkyLight>
        </SkyLight>
      </div>
    )
  }
}

TestModal.displayName = 'TestModal';

export default TestModal;
