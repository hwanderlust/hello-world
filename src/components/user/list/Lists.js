import React from 'react';
import ListBox from './ListBox'
import { deleteList, getLists } from '../../../adapter'

class Lists extends React.Component {
  state = {
    hover: false,
    hoverId: null,
  }

  handleClick = (e, list) => {
    console.log(list);

    if(e.target.id === 'delete-list') {
      deleteList(this.state.hoverId)
        .then(r => {
          getLists(this.props.currentUser.id)
            .then(lists => this.props.updateLists(lists))
        })

    } else {
      this.props.handleListClick(list)
    }
  }

  handleHover = (listId) => {
    this.setState({
      hover: true,
      hoverId: listId
    }, () => console.log(this.state))
  }

  handleMouseLeave = () => {
    this.setState({hover: false, hoverId: null}, () => console.log(this.state))
  }

  render() {
    const { lists } = this.props

    let renderLists;
    if(lists) {
      let imgUrl = `https://source.unsplash.com/random/`
      let i = 290;
      renderLists = lists.map(list => {
        ++i
        return (
          <ListBox hoverId={this.state.hoverId} list={list} i={i} imgUrl={imgUrl} handleClick={this.handleClick} handleHover={this.handleHover} handleMouseLeave={this.handleMouseLeave} />
        )
      })
    }

    return (
      <div className='lists-container'>
        <div className='lists-boxes'>
          { lists ? renderLists : null }
        </div>
      </div>
    )
  }
}

export default Lists;
