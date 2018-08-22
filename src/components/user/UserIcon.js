import React from 'react';

const UserIcon = ({ imgSrc, containerStyle, imgStyle }) => {
  return (
    imgSrc ? <div style={containerStyle} className='usericon-container'>
      <img style={imgStyle} src={imgSrc} alt={`current user's profile`}/>
    </div> : null
  )
}

export default UserIcon;
