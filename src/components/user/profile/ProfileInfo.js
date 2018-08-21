import React from 'react';

const ProfileInfo = ({ currentUser }) => {
  return currentUser ? (
    <React.Fragment>
      {/* <h3>Age</h3>
        <p>{currentUser.age}</p>
        <h3>Location</h3>
        <p>{currentUser.location}</p>
        <h3>Nationality</h3>
      <p>{currentUser.nationality}</p> */}
    </React.Fragment>
  ) : null
}

export default ProfileInfo;
