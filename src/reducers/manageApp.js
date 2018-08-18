// a reducer is a PURE function that takes the previous state and an action as arguments and returns new state based on the action.type
import { UPDATE_USER, UPDATE_USERS, UPDATE_LANG, SET_TRANSLATE_TERM, SET_DETECTED_LANG, UPDATE_RECIPIENT_USER, REMOVE_USER, UPDATE_LIST, UPDATE_MESSAGES, UPDATE_LISTS, OPEN_CHAT } from '../actions/types'

const initialState = {
  currentUser: null,
  chat: null,
  messages: null,
  recipientUser: null,
  users: null,
  language: null,
  translateTerm: null,
  detectedLang: 'en',
  lists: null,
  list: null,
  openChats: [],
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

    case UPDATE_RECIPIENT_USER:
      return {...state,
        recipientUser: action.payload
      }

    case UPDATE_LIST:
      return {...state,
        list: action.payload
      }

    case UPDATE_LISTS:
      return {...state,
        lists: action.payload
      }

    // case UPDATE_MESSAGES:
    //   return {...state,
    //     messages: action.payload
    //   }

    case UPDATE_MESSAGES:
      let oldChats = [...state.openChats]
      console.log(oldChats);
      // let activeChat = updatedChats.filter(chat => chat.id === action.payload.id)

      let activeChat = oldChats.find(chat => chat.id === action.payload.id)
      console.log(activeChat);
      let updatedActiveChat = {...activeChat, messages: action.payload.messages}
      console.log(updatedActiveChat);
      const updatedChats = oldChats.map(chat => chat.id === updatedActiveChat.id ? updatedActiveChat : chat)
      console.log(updatedChats);
      return {...state,
        openChats: updatedChats
      }

    case OPEN_CHAT:
      return {...state,
        openChats: [...state.openChats, action.payload]
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
