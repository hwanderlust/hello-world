import React from 'react';

const DetailsForm = ({ handleSubmit, handleChange, introduction, hobbies, goals }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)} id='detailsForm' className='auth-children'>
      <label htmlFor='introduction'>Tell us about yourself!</label>
      <input type='text' name='introduction' className='inputs' onChange={handleChange} value={introduction} />
      <br />
      <label htmlFor='hobbies'>Let others know what your hobbies are and what you're passionate about.</label>
      <input type='text' name='hobbies' className='inputs' onChange={handleChange} value={hobbies} />
      <br />
      <label htmlFor='goals'>What are your learning goals here?</label>
      <input type='text' name='goals' className='inputs' onChange={handleChange} value={goals} />
      <br />
      <input type='submit' className='' />
    </form>
  )
};

export default DetailsForm;
