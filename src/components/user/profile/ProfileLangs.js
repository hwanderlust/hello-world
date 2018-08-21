import React from 'react';

const ProfileLangs = ({ currentUser }) => {
  return currentUser ? (
    <div className='user-lang'>
      <i class="fas fa-language"></i>
      <h3>Languages</h3>
      <p>{currentUser.languages}</p>
    </div>
  ) : null
}

export default ProfileLangs;
