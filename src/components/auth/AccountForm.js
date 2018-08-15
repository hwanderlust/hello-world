import React from 'react';

const AccountForm = ({ username, password, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)} id='accountForm' className='auth-children'>
      <label htmlFor='username'>Username</label>
      <input className='inputs' type='text' name='username' value={username} onChange={(e) => handleChange(e)}/>
      <br />
      <label htmlFor='password'>Password</label>
      <input className='inputs' type='password' name='password'  value={password} onChange={(e) => handleChange(e)} />
      <br />
      <input type='submit' className='' />
    </form>
  )
};

export default AccountForm;
