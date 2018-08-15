import React from 'react';

const ProfileHead = ({ currentUser, pic, handleMouseOver, handleMouseLeave }) => {
  return currentUser ? (
    <React.Fragment>
      <h1 className='header'>{currentUser.username}</h1>
      <div className='img-wrapper'><img className={pic} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} src={currentUser.profile_picture}/></div>
    </React.Fragment>
  ) : null
}

export default ProfileHead;
