import React from 'react';
import { connect } from 'react-redux'
import ProfileInfo from './profile/ProfileInfo'
import ProfileDetails from './profile/ProfileDetails'
import ProfileHead from './profile/ProfileHead'
import ProfileLangs from './profile/ProfileLangs'

// people you've spoken with
// profile picture
// saved notes
// auto save terms translated
//

class Profile extends React.Component {
  state = {
    pic: '',
  }

  handleMouseOver = () => {
    if(this.state.pic === '') {
      this.setState({pic: 'rotate'}, () => console.log(this.state))
    }
  }

  handleMouseLeave = () => {
    if(this.state.pic === 'rotate') {
      this.setState({pic: ''}, () => console.log(this.state))
    }
  }

  render() {
    const { currentUser } = this.props

    // const renderTop = () => {
    //   return (
    //     <React.Fragment>
    //       <h1 className='header'>{currentUser.username}</h1>
    //       <div className='img-wrapper'><img className={this.state.pic} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} src={currentUser.profile_picture}/></div>
    //     </React.Fragment>
    //   )
    // }

    // const renderDetails = () => {
    //   return (
    //     <React.Fragment>
    //       <h3>Introduction</h3>
    //       <p>{currentUser.introduction}</p>
    //       <h3>Goals</h3>
    //       <p>{currentUser.goals}</p>
    //       <h3>Hobbies</h3>
    //       <p>{currentUser.hobbies}</p>
    //     </React.Fragment>
    //   )
    // }

    // const renderUserLanguages = () => {
    //   return (
    //     <React.Fragment>
    //       <h3>Languages</h3>
    //       <p>{currentUser.languages}</p>
    //     </React.Fragment>
    //   )
    // }

    // const renderInfo = () => {
    //   return (
    //     <React.Fragment>
    //       <h3>Age</h3>
    //       <p>{currentUser.age}</p>
    //       <h3>Location</h3>
    //       <p>{currentUser.location}</p>
    //       <h3>Nationality</h3>
    //       <p>{currentUser.nationality}</p>
    //     </React.Fragment>
    //   )
    // }

    const renderLists = () => {
    }

    return (

        <div className='profile'>
          <ProfileHead currentUser={currentUser} pic={this.state.pic} handleMouseOver={this.handleMouseOver} handleMouseLeave={this.handleMouseLeave} />
          {/* {this.props.currentUser ? renderTop() : null} */}

          <section id='user-languages'>
            <ProfileLangs currentUser={currentUser}/>
            {/* { this.props.currentUser ? renderUserLanguages() : null } */}
          </section>

          <section id='user-details'>
            <ProfileDetails currentUser={currentUser}/>
            {/* { this.props.currentUser ? renderDetails() : null } */}
          </section>

          <section id='user-info'>
            <ProfileInfo currentUser={currentUser}/>
            {/* { this.props.currentUser ? renderInfo() : null } */}
          </section>

          {/* make into component   */}
          <aside>
            <span><h1>Saved Notes</h1></span>
            <main>
              <h3>List Name</h3>
              <h3>List Name</h3>
              <h3>List Name</h3>
            </main>
          </aside>

        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.appState.currentUser,
  }
}

export default connect(mapStateToProps)(Profile)
