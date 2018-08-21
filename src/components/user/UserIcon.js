import React from 'react';

const UserIcon = ({ imgSrc, containerStyle, imgStyle }) => {
  return (
    imgSrc ? <div style={containerStyle} className='usericon-container'>
      <img style={imgStyle} src={imgSrc} />
    </div> : null
  )
}

export default UserIcon;
