import React from 'react';

const ProfileLangs = ({ user }) => {
  return user ? (
    <div className='user-lang'>
      <i class="fas fa-language"></i>
      <h3>Languages</h3>
      <p>{user.languages}</p>
    </div>
  ) : null
}

export default ProfileLangs;
