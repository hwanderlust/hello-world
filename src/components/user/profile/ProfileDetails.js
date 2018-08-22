import React from 'react';

const ProfileDetails = ({ user }) => {
  return user ? (
    <div className='user-details'>
      <div className='intro'>
        <i class="far fa-smile"></i>
        <h3>Introduction</h3>
        <p>{user.introduction}</p>
      </div>
      
      <div className='goals'>
        <i class="fas fa-sort-numeric-down"></i>
        <h3>Goals</h3>
        <p>{user.goals}</p>
      </div>

      <div className='hobbies'>
        <i class="far fa-heart"></i>
        <h3>Hobbies</h3>
        <p>{user.hobbies}</p>
      </div>
    </div>
  ) : null
}

export default ProfileDetails;
