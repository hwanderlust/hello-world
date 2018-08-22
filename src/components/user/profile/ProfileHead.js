import React from 'react';

const ProfileHead = ({ user }) => {
  return user ? (
    <div className='user-main'>
      <h4><i class="fas fa-birthday-cake"></i>{user.age}</h4>

      <h1 className='header'><i class="fas fa-gamepad"></i>{user.username}</h1>
      <br/>
      <h3><i class="fas fa-map-marker-alt"></i>{user.location}</h3>

      <h3>{user.nationality}<i class="fas fa-globe-americas"></i></h3>

    </div>
  ) : null
}

export default ProfileHead;
