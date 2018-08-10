// a reducer is a PURE function that takes the previous state and an action as arguments and returns new state based on the action.type
import { UPDATE_USER, UPDATE_USERS, REMOVE_USER, UPDATE_CHAT, UPDATE_MESSAGES, UPDATE_RECIPIENT_USER } from '../actions/types'

const initialState = {
  currentUser: null,
  chat: null,
  messages: null,
  recipientUser: null,
  users: null,
}

const manageApp = (state = initialState, action) => {
  switch (action.type){

    case UPDATE_USER:
      return {...state, currentUser: action.payload}
    case UPDATE_USERS:
      return {...state, users: action.payload}
    case REMOVE_USER:
      return {...state, currentUser: null}
    case UPDATE_CHAT:
      return {...state, chat: action.payload}
    case UPDATE_MESSAGES:
      return {...state, messages: action.payload}
    case UPDATE_RECIPIENT_USER:
      return {...state, recipientUser: action.payload}

    default:
      return state

  }
}

export default manageApp;
