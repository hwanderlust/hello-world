import React from 'react';
import UserIcon from '../user/UserIcon'
import { connect } from 'react-redux'

const containerStyle = {
  width: '1rem',
  position: 'absolute',
  left: 'calc(100% - 5vw)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
}

const imgStyle = {
  borderRadius: '50%',
  height: '5vh',
  border: '2px solid red'
}

class TopBorder extends React.Component {

  render() {
    return (
      <div className='top-border' >
        <h1>Hello World</h1>
        <UserIcon containerStyle={containerStyle} imgStyle={imgStyle} imgSrc={this.props.currentUser ? this.props.currentUser.profile_picture : null}/>
        {/* <h1 className='header banner-header'>Hello World</h1> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.appState.currentUser,
  }
}

export default connect(mapStateToProps)(TopBorder);
