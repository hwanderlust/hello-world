import React from 'react';

const ProfileDetails = ({ currentUser }) => {
  return currentUser ? (
    <React.Fragment>
      <h3>Introduction</h3>
      <p>{currentUser.introduction}</p>
      <h3>Goals</h3>
      <p>{currentUser.goals}</p>
      <h3>Hobbies</h3>
      <p>{currentUser.hobbies}</p>
    </React.Fragment>
  ) : null
}

export default ProfileDetails;
