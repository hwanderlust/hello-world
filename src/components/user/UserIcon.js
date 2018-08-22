import React from 'react';

const UserIcon = ({ onClick, imgSrc, containerStyle, imgStyle }) => {
  return (
    imgSrc ? <div onClick={onClick} style={containerStyle} className='usericon-container'>
      <img style={imgStyle} className='usericon-img' src={imgSrc} alt={`current user's profile`}/>
    </div> : null
  )
}

export default UserIcon;
