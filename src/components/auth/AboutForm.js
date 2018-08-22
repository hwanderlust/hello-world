import React from 'react';

class AboutForm extends React.Component {

  componentDidMount() {
    this.inputFocus.focus();
  }

  render() {
    const { handleSubmit, handleChange, location, age, nationality, languages } = this.props

  return (
    <form onSubmit={(e) => handleSubmit(e)} id='aboutForm' className='auth-children'>
      <label htmlFor='location'>Where you at?</label>
      <input type='text' name='location' className='inputs' onChange={handleChange} value={location} autoFocus="true" ref={c => (this.inputFocus = c)} />
      <br />
      <label htmlFor='age'>How wise are you? (age)</label>
      <input type='number' name='age' className='inputs' onChange={handleChange} value={age} />
      <br />
      <label htmlFor='nationality'>Where's your passport from?</label>
      <input type='text' name='nationality' className='inputs' onChange={handleChange} value={nationality} />
      <br />
      <label htmlFor='languages'>Which languages do you speak?</label>
      <input type='text' name='languages' className='inputs' onChange={handleChange} value={languages} />
      <br />
      <input type='submit' className='' />
    </form>
  )}
};

export default AboutForm;
