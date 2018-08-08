import { UPDATE_USER, UPDATE_CHAT, UPDATE_MESSAGES, UPDATE_RECIPIENT_USER, REMOVE_USER } from './types'

// Define and export your action creators here
// EXAMPLE:

export const updateUser = (user) => {
  console.log(`INSIDE ACTIONS`, user);
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

export const updateChat = () => {
  return {
    type: UPDATE_CHAT,
    payload: 'something'
  }
}

export const updateMessages = () => {
  return {
    type: UPDATE_MESSAGES,
    payload: 'something'
  }
}

export const updateRecipientUser = () => {
  return {
    type: UPDATE_RECIPIENT_USER,
    payload: 'something'
  }
}
