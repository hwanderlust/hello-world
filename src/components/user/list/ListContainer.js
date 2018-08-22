import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getLists, getListMsgs } from '../../../adapter'
import { updateLists, updateList, updateListMsgs } from '../../../actions'

import Lists from './Lists'
import List from './List'

class ListContainer extends React.Component {

  componentDidMount() {
    console.log('LISTCONTAINER DID MOUNT');
    if(window.location.pathname === '/lists') {
      if(this.props.currentUser) {
        getLists(this.props.currentUser.id).then(lists => this.props.updateLists(lists))
      }

    } else if(window.location.pathname === '/list') {
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.currentUser && !this.props.lists) {
      getLists(this.props.currentUser.id).then(lists => {
        this.props.updateLists(lists)
      })
    }
  }

  handleListClick = (list) => {
    console.log(list);
    this.props.updateList(list)

    getListMsgs(list.id).then(messages => {
      console.log(messages);
      this.props.updateListMsgs(messages)
      console.log(this.props);
      this.props.history.push('/list')
    })
  }

  render() {

    const renderListComponents = () => {
      if(this.props.currentUser) {
        switch(this.props.listReq) {
          case 'lists':
            return <Lists lists={this.props.lists} handleListClick={this.handleListClick} currentUser={this.props.currentUser} updateLists={this.props.updateLists} />
          case 'list':
            return <List list={this.props.list} messages={this.props.messages} lists={this.props.lists} />
          default:
            console.log(`List request is wrong`);
            break
        }
      }
    }

    return (
      <React.Fragment>
        { renderListComponents() }
      </React.Fragment>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.appState.currentUser,
    lists: state.appState.lists,
    list: state.appState.list,
    messages: state.appState.messages,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLists: (lists) => dispatch(updateLists(lists)),
    updateList: (list) => dispatch(updateList(list)),
    updateListMsgs: (msgs) => dispatch(updateListMsgs(msgs)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListContainer));
