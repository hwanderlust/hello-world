import { UPDATE_USER, UPDATE_USERS, UPDATE_LANG, SET_TRANSLATE_TERM, SET_DETECTED_LANG, UPDATE_MESSAGES, UPDATE_RECIPIENT_USER, REMOVE_USER, UPDATE_LIST, UPDATE_LISTS, OPEN_CHAT, UPDATE_CHAT, LIST_MESSAGES, CLOSE_CHAT, SET_TRANSLATION, CLEAR_TRANSLATION, TOGGLE_SPEECH, UPDATE_SELECTED_MSG, TOGGLE_TRANSLATE, TOGGLE_SAVE, TOGGLE_MOVE, TOGGLE_PF_VIEW, CLEAR_SELECTED_MSG, UPDATE_SPOKEN_LANGS, TOGGLE_SPINNER } from './types'

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

export const setTranslation = (translation) => {
  return {
    type: SET_TRANSLATION,
    payload: translation
  }
}

export const setDetectedLang = (term) => {
  return {
    type: SET_DETECTED_LANG,
    payload: term
  }
}

export const clearTranslation = () => {
  return {
    type: CLEAR_TRANSLATION
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

export const openChat = (chat) => {
  return {
    type: OPEN_CHAT,
    payload: chat
  }
}

export const updateChat = (chat) => {
  return {
    type: UPDATE_CHAT,
    payload: chat
  }
}

export const closeChat = (chats) => {
  return {
    type: CLOSE_CHAT,
    payload: chats
  }
}

export const updateListMsgs = (messages) => {
  return {
    type: LIST_MESSAGES,
    payload: messages
  }
}

export const toggleSpeech = () => {
  return {
    type: TOGGLE_SPEECH
  }
}

export const toggleTranslate = () => {
  return {
    type: TOGGLE_TRANSLATE
  }
}

export const toggleSave = () => {
  return {
    type: TOGGLE_SAVE
  }
}

export const toggleMove = () => {
  return {
    type: TOGGLE_MOVE
  }
}

export const updateSelectedMsg = (msg) => {
  return {
    type: UPDATE_SELECTED_MSG,
    payload: msg
  }
}

export const toggleUserPf = (user) => {
  return {
    type: TOGGLE_PF_VIEW,
    payload: user
  }
}

export const clearSelectedMsg = () => {
  return {
    type: CLEAR_SELECTED_MSG
  }
}

export const updateSpokenLangs = (langs) => {
  return {
    type: UPDATE_SPOKEN_LANGS,
    payload: langs
  }
}

export const toggleSpinner = () => {
  return {
    type: TOGGLE_SPINNER
  }
}
