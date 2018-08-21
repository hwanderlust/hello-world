// a reducer is a PURE function that takes the previous state and an action as arguments and returns new state based on the action.type
import { UPDATE_USER, UPDATE_USERS, UPDATE_LANG, SET_TRANSLATE_TERM, SET_DETECTED_LANG, UPDATE_RECIPIENT_USER, REMOVE_USER, UPDATE_LIST, UPDATE_MESSAGES, UPDATE_LISTS, OPEN_CHAT, UPDATE_CHAT, LIST_MESSAGES, CLOSE_CHAT, SET_TRANSLATION, CLEAR_TRANSLATION, TOGGLE_SPEECH, UPDATE_SELECTED_MSG, TOGGLE_TRANSLATE, TOGGLE_SAVE } from '../actions/types'

const initialState = {
  currentUser: null,
  chat: null,
  recipientUser: null,
  users: null,
  language: null,
  translateTerm: null,
  detectedLang: 'en',
  translation: null,
  lists: null,
  list: null,
  messages: null,
  openChats: [],
  prompts: {
    translatePrompt: false,
    speechPrompt: false,
    savePrompt: false,
  },
  selectedMessage: null,
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

    case SET_TRANSLATION:
      return {...state,
        translation: action.payload
      }

    case CLEAR_TRANSLATION:
      return {...state,
        translation: null,
        detectedLang: 'en',
        translateTerm: null,
        language: null
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

    case UPDATE_CHAT:
      return {...state,
        chat: action.payload
      }

    case CLOSE_CHAT:
      return {...state,
        openChats: action.payload
      }

    case LIST_MESSAGES:
      return {...state,
        messages: action.payload
      }

    case TOGGLE_SPEECH:
      return {...state,
        prompts: {
          speechPrompt: !state.prompts.speechPrompt
        }
      }

    case TOGGLE_TRANSLATE:
      return {...state,
        prompts: {
          translatePrompt: !state.prompts.translatePrompt
        }
      }

    case TOGGLE_SAVE:
      return {...state,
        prompts: {
          savePrompt: !state.prompts.savePrompt
        }
      }

    case UPDATE_SELECTED_MSG:
      return {...state,
        selectedMessage: action.payload
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
