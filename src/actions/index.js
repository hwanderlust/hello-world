import { UPDATE_USER, UPDATE_USERS, UPDATE_CHAT, UPDATE_MESSAGES, UPDATE_RECIPIENT_USER, REMOVE_USER } from './types'
import { login, getAllUsers, createMessage, getChatMessages } from '../adapter'


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

export const updateMessages = (msgs) => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_MESSAGES,
      payload: msgs
    })
  }
}

export const test = userId => {
  return (dispatch, getState) => {
    getChatMessages(userId).then(messages => {
      dispatch({
        type: UPDATE_MESSAGES,
        payload: messages
      })
    }).then(data => console.log(getState()))
  }
}

export const updateRecipientUser = (user) => {
  return {
    type: UPDATE_RECIPIENT_USER,
    payload: user
  }
}

export const message360 = (msg) => {
  return (dispatch, getState) => {
    // create new message
    // get all messages for this chat
    // render messages in chat
    createMessage(msg)
    .then(newMsg => getChatMessages(newMsg.sender_id))
    .then(messages => {
      debugger
      dispatch({
        type: UPDATE_MESSAGES,
        payload: messages
      })
    })
    .then(nothing => console.log(getState()))
  }
}

// export const loginAction = (user) => {
//   return (dispatch, getState) => {
//     login(user)
//       .then(userData => {
//         localStorage.setItem('token', userData.id)
//         dispatch({
//           type: UPDATE_USER,
//           payload: userData
//         })
//       })
//   }
// }

export const updateUsers = (users) => {
  return {
    type: UPDATE_USERS,
    payload: users
  }
}

// login
// post request to backend
// store user as currentUser in store
// set token in localStorage
// direct to /home

// starting a chat
// click takes in recipientUser
// store receipient as recipientUser in store
// get chat messages
// render chat messages
// direct to /chat
