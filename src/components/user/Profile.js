import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getLists, getListMsgs } from '../../adapter'
import { updateList, updateLists, updateMessages  } from '../../actions'

// import ProfileInfo from './profile/ProfileInfo'
import ProfileDetails from './profile/ProfileDetails'
import ProfileHead from './profile/ProfileHead'
import ProfileLangs from './profile/ProfileLangs'
import UserIcon from './UserIcon'

// people you've spoken with
// profile picture
// saved notes
// auto save terms translated
//

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

class Profile extends React.Component {
  state = {
    pic: '',
    lists: null,
    listMessages: null,
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.currentUser && !this.state.lists) {
      getLists(this.props.currentUser.id).then(lists => {
        this.props.updateLists(lists)
        this.setState({lists}, () => console.log(this.state))
      })
    }
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

  handleListClick = (list) => {
    this.props.updateList(list)

    getListMsgs(list.id).then(messages => this.props.updateMessages(messages))

    this.props.history.push('/list')
  }

  render() {
    const { currentUser } = this.props

    const renderLists = () => {
      if(this.state.lists) {
        return this.state.lists.map(list => <h3 key={list.id} onClick={() => this.handleListClick(list)}>{list.name}</h3>)
      }
    }

    return (

        <div className='profile'>

          <UserIcon containerStyle={containerStyle} imgStyle={imgStyle} imgSrc={currentUser ? currentUser.profile_picture : null} />

          <ProfileHead currentUser={currentUser} />

          <ProfileLangs currentUser={currentUser}/>

          <ProfileDetails currentUser={currentUser}/>

          {/* <section id='user-languages'>
          </section> */}

          {/* <section id='user-details'>
          </section> */}

          {/* <section id='user-info'>
            <ProfileInfo currentUser={currentUser}/>
          </section> */}

          <aside>
            {/* <span><h1>Lists</h1></span>
              <main>
              { renderLists() }
            </main> */}
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateList: (list) => dispatch(updateList(list)),
    updateMessages: (messages) => dispatch(updateMessages(messages)),
    updateLists: (lists) => dispatch(updateLists(lists)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
