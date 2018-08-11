// a reducer is a PURE function that takes the previous state and an action as arguments and returns new state based on the action.type
import { UPDATE_USER, UPDATE_USERS, UPDATE_LANG, SET_TRANSLATE_TERM, SET_DETECTED_LANG, REMOVE_USER } from '../actions/types'

const initialState = {
  currentUser: null,
  chat: null,
  messages: null,
  recipientUser: null,
  users: null,
  language: null,
  translateTerm: null,
  detectedLang: 'en',
}

const manageApp = (state = initialState, action) => {
  switch (action.type){
    case UPDATE_USER:
      return {...state,
        currentUser: action.payload
      }

    case UPDATE_USERS:
      return {...state,
        users: action.payload
      }

    case UPDATE_LANG:
      return {...state,
        language: action.payload
      }

    case SET_TRANSLATE_TERM:
      return {...state,
        translateTerm: action.payload
      }
    case SET_DETECTED_LANG:
      return {...state,
        detectedLang: action.payload
      }

    case REMOVE_USER:
      return {...state,
        currentUser: null
      }

    default:
      return state

  }
}

export default manageApp;
