import React from 'react'
import { connect } from "react-redux";
import { createList, addMessage, getLists } from "../../adapter"
import Button from './Button'
import { updateLists, toggleSave } from "../../actions";

class SaveMsg extends React.PureComponent {

  state = {
    text: '',
    saved: false,
  }

  componentDidMount() {
    if (!this.props.lists) {
      this.fetchLists();
    }
  }

  fetchLists = () => {
    getLists(this.props.currentUser.id)
    .then(lists => this.props.updateLists(lists));
  }
  
  handleChange = e => {
    this.setState({ 
      text: e.target.value 
    }, () => console.log(this.state));
  };

  handleNewList = e => {
    e.preventDefault();
    createList({
      name: this.state.text,
      user_id: this.props.currentUser.id
    }).then(newList => {
      console.log(newList);
      this.handleSavingMsg(newList.id);
      this.fetchLists();
    });
    this.setState({ text: "" });
  };

  handleExistingList = () => {
    this.handleSavingMsg(this.existingList.value)
  };

  handleSavingMsg = listId => {
    addMessage({ msg_id: this.props.msgId, list_id: listId })
    .then(messages => {
        console.log(messages);
        this.setState({ saved: true }, () => console.log('msg saved'))
      }
      );
    };  
    
    renderCheckmark = () => {
      setTimeout(() => {
        this.setState({ saved: false }, () => console.log('remove checkmark'))
        this.props.toggleSave();
    }, 600);

    return (
      <img
        className="checkmark"
        src="https://png.icons8.com/cotton/2x/checkmark.png"
        alt="check mark"
      />
    );
  };

  render() {
    return this.state.saved ? this.renderCheckmark() : (

      <div className="save-msg">
        <div className="existing-container">
          <label>List to Save to:</label>
          <select name="existingList" ref={el => (this.existingList = el)}>
            {this.props.lists ? (
              this.props.lists.map(list => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))
            ) : (
                <option disabled>No Lists</option>
              )}
          </select>
          <Button handleClick={this.handleExistingList} text="Add to this List" />
        </div>

        <h1 className="save-msg-title">Save a Message to Review!</h1>

        <form onSubmit={this.handleNewList}>
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="Create New List--Name Here"
            autoFocus={true}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.appState.currentUser,
    lists: state.appState.lists,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLists: lists => dispatch(updateLists(lists)),
    toggleSave: () => dispatch(toggleSave()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveMsg)