import { UPDATE_USER, UPDATE_USERS, UPDATE_LANG, SET_TRANSLATE_TERM, SET_DETECTED_LANG, UPDATE_CHAT, UPDATE_MESSAGES, UPDATE_RECIPIENT_USER, REMOVE_USER, UPDATE_LIST, UPDATE_LISTS } from './types'

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: user
  }
}

export const removeUser = () => {
  return {
    type: REMOVE_USER
  }
}

export const updateUsers = (users) => {
  return {
    type: UPDATE_USERS,
    payload: users
  }
}

export const updateLang = (lang) => {
  return {
    type: UPDATE_LANG,
    payload: lang
  }
}

export const setTranslateTerm = (term) => {
  return {
    type: SET_TRANSLATE_TERM,
    payload: term
  }
}

export const setDetectedLang = (term) => {
  return {
    type: SET_DETECTED_LANG,
    payload: term
  }
}

export const updateRecipientUser = (user) => {
  return {
    type: UPDATE_RECIPIENT_USER,
    payload: user
  }
}

export const updateList = (list) => {
  return {
    type: UPDATE_LIST,
    payload: list
  }
}

export const updateLists = (lists) => {
  return {
    type: UPDATE_LISTS,
    payload: lists
  }
}

export const updateMessages = (messages) => {
  return {
    type: UPDATE_MESSAGES,
    payload: messages
  }
}

// export const updateChat = () => {
//   return {
//     type: UPDATE_CHAT,
//     payload: 'something'
//   }
// }
//
//
// export const updateLists = () => {
//   return {
//     type: UPDATE_MESSAGES,
//     payload: 'something'
//   }
// }
//
