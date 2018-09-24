// a reducer is a PURE function that takes the previous state and an action as arguments and returns new state based on the action.type
import { UPDATE_USER, UPDATE_USERS, UPDATE_LANG, SET_TRANSLATE_TERM, SET_DETECTED_LANG, UPDATE_RECIPIENT_USER, REMOVE_USER, UPDATE_LIST, UPDATE_MESSAGES, UPDATE_LISTS, OPEN_CHAT, UPDATE_CHAT, LIST_MESSAGES, CLOSE_CHAT, SET_TRANSLATION, CLEAR_TRANSLATION, TOGGLE_SPEECH, UPDATE_SELECTED_MSG, TOGGLE_TRANSLATE, TOGGLE_SAVE, TOGGLE_MOVE, TOGGLE_PF_VIEW, CLEAR_SELECTED_MSG, UPDATE_SPOKEN_LANGS } from '../actions/types'

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
    movePrompt: false,
  },
  selectedMessage: null,
  userPfView: null,
  spokenLanguages: null,
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
      let activeChat = oldChats.find(chat => chat.id === action.payload.id)
      let updatedActiveChat = {...activeChat, messages: action.payload.messages}
      const updatedChats = oldChats.map(chat => chat.id === updatedActiveChat.id ? updatedActiveChat : chat)
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
        openChats: action.payload,
        recipientUser: null
      }

    case LIST_MESSAGES:
      return {...state,
        messages: action.payload
      }

    case TOGGLE_SPEECH:
      return {...state,
        prompts: {...state.prompts,
          speechPrompt: !state.prompts.speechPrompt
        }
      }

    case TOGGLE_TRANSLATE:
      return {...state,
        prompts: {...state.prompts,
          translatePrompt: !state.prompts.translatePrompt
        }
      }

    case TOGGLE_SAVE:
      return {...state,
        prompts: {...state.prompts,
          savePrompt: !state.prompts.savePrompt
        }
      }

    case TOGGLE_MOVE:
      return {...state,
        prompts: {...state.prompts,
          movePrompt: !state.prompts.movePrompt
        }
      }

    case UPDATE_SELECTED_MSG:
      return {...state,
        selectedMessage: action.payload
      }

    case TOGGLE_PF_VIEW:
      return {...state,
        userPfView: action.payload
      }

    case CLEAR_SELECTED_MSG:
      return {...state,
        selectedMessage: null
      }

    case UPDATE_SPOKEN_LANGS:
      return {...state,
        spokenLanguages: action.payload
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
