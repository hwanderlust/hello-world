import { UPDATE_USER, UPDATE_CHAT, UPDATE_MESSAGES, UPDATE_RECIPIENT_USER, REMOVE_USER } from './types'
import { getMsgs } from '../adapter'

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

export const updateChat = (chat) => {
  return {
    type: UPDATE_CHAT,
    payload: chat
  }
}

// export const updateMessages = (msgs) => {
//   return {
//     type: UPDATE_MESSAGES,
//     payload: msgs
//   }
// }

export const updateMessages = msgIds => {
  debugger
  return (dispatch, getState) => {
    console.log(getState);
  }
}

// export const updateMessages = (msgIds) => {
//   debugger
//   return (dispatch, getState) => {
//     getMsgs(msgIds).then(msgs => {
//       dispatch({
//         type: UPDATE_MESSAGES,
//         payload: msgs
//       })
//     })
//   }
// }

export const updateRecipientUser = () => {
  return {
    type: UPDATE_RECIPIENT_USER,
    payload: 'something'
  }
}
