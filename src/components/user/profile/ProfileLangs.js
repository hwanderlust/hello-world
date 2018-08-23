import React from 'react';

const ProfileLangs = ({ user, onClick, currentUser }) => {
  return user ? (
    <div className='user-lang'>

      { user === currentUser ? <i className="far fa-edit" onClick={onClick}></i> : null }

      <i className="fas fa-language"></i>
      <p>{user.languages}</p>
    </div>
  ) : null
}

export default ProfileLangs;
