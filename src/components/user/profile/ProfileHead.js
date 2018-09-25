import React from 'react';

const normalStyles = {
  fontSize: '5em'
}

const miniStyles = {
  fontSize: '3em'
}

const ProfileHead = ({ user }) => {
  return user ? (
    <div className='user-main'>
      <h4><i class="fas fa-birthday-cake"></i>{user.age}</h4>

       { user.username.length > 8 ?
         <h1 style={miniStyles}><i class="fas fa-gamepad"></i>{user.username}</h1>
         : <h1 style={normalStyles}><i class="fas fa-gamepad"></i>{user.username}</h1> }

      <br/>
      <h3><i class="fas fa-map-marker-alt"></i>{user.location}</h3>

      <h3>{user.nationality}<i class="fas fa-globe-americas"></i></h3>

    </div>
  ) : null
}

export default ProfileHead;
