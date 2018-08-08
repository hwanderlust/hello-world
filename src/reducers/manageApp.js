// a reducer is a PURE function that takes the previous state and an action as arguments and returns new state based on the action.type
import { UPDATE_USER, REMOVE_USER } from '../actions/types'

const initialState = {
  currentUser: null,
  chat: null,
  messages: null,
  recipientUser: null,
}

const manageApp = (state = initialState, action) => {
  switch (action.type){
    case UPDATE_USER:
      return {...state,
        currentUser: action.payload
      }
    case REMOVE_USER:
      debugger
      return {...state,
        currentUser: null
      }

    default:
      return state

  }
}

export default manageApp;
