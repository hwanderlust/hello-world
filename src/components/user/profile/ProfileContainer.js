import React from 'react';
import { connect } from 'react-redux'

import ProfileDetails from './profile/ProfileDetails'
import ProfileHead from './profile/ProfileHead'
import ProfileLangs from './profile/ProfileLangs'
import UserIcon from '../UserIcon'

const containerStyle = {
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F7A278',
}

const imgStyle = {
  borderRadius: '50%',
  height: '30vh',
  maxWidth: '30vw',
  marginLeft: '0.25rem',
}

const Profile = ({ currentUser, userPfView }) => {

  const handleEditPfClick = () => {
    alert('Coming soon!')
  }

  return userPfView || currentUser ? (

    <div className='profile'>

      <UserIcon containerStyle={containerStyle} imgStyle={imgStyle} imgSrc={userPfView ? userPfView.profile_picture : currentUser.profile_picture } />

      <ProfileHead user={ userPfView ? userPfView : currentUser } />

      <ProfileLangs user={ userPfView ? userPfView : currentUser } currentUser={currentUser} onClick={handleEditPfClick} />

      <ProfileDetails user={ userPfView ? userPfView : currentUser } />
    </div>

  ) : null

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.appState.currentUser,
    userPfView: state.appState.userPfView,
  }
}

export default connect(mapStateToProps)(Profile)
