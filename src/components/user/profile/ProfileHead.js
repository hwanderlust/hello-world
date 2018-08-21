import React from 'react';

const ProfileHead = ({ currentUser }) => {
  return currentUser ? (
    <div className='user-main'>
      <h4><i class="fas fa-birthday-cake"></i>{currentUser.age}</h4>

      <h1 className='header'><i class="fas fa-gamepad"></i>{currentUser.username}</h1>
      <br/>
      <h3><i class="fas fa-map-marker-alt"></i>{currentUser.location}</h3>

      <h3>{currentUser.nationality}<i class="fas fa-globe-americas"></i></h3>

    </div>
  ) : null
}

export default ProfileHead;
