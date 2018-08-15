import React from 'react';

const ProfileLangs = ({ currentUser }) => {
  return currentUser ? (
    <React.Fragment>
      <h3>Languages</h3>
      <p>{currentUser.languages}</p>
    </React.Fragment>
  ) : null
}

export default ProfileLangs;
