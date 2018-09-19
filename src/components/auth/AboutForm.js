import React from 'react';
import { countries, googleLanguages } from '../../constants';

class AboutForm extends React.Component {

  componentDidMount() {
    this.inputFocus.focus();
  }

  render() {
    const { handleSubmit, handleChange, location, age, nationality, languages } = this.props
    const renderCountries = () => {
      return countries.map(country => <option key={country}>{country}</option>)
    }
    const renderLanguages = () => {
      return googleLanguages.map(lang => <option key={lang.code}>{lang.name}</option>)
    }

    return (
      <form onSubmit={(e) => handleSubmit(e)} id='aboutForm' className='auth-children'>
        <label htmlFor='location'>Where you at?</label><br/>
        <input type='text' name='location' className='inputs' onChange={handleChange} value={location} autoFocus="true" ref={c => (this.inputFocus = c)} />
        <br />
        <label htmlFor='age'>How wise are you? (age)</label>
        <input type='number' name='age' min='5' max='122' className='inputs' onChange={handleChange} value={age} />
        <br />
        <label htmlFor='nationality'>Where's your passport from?</label>
        <br />
        <select className='form-inputs'>
          <option key='default' id='default' disabled selected>Choose one</option>
          { renderCountries() }
        </select>
        {/* <input type='text' name='nationality' className='inputs' onChange={handleChange} value={nationality} /> */}
        <br />
        <label htmlFor='languages'>Which languages do you speak?</label>
        <br />
        <select multiple className='form-inputs multiple-select'>
          { renderLanguages() }
        </select>
        {/* <input type='text' name='languages' className='inputs' onChange={handleChange} value={languages} /> */}
        <br />
        <input type='submit' className='' />
      </form>
    )}
};

export default AboutForm;
