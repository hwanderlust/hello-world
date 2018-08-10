import { API_ROOT, HEADERS } from './constants'
import { updateMessages } from './actions/index'

export function login(user) {
  const url = `${API_ROOT}/login`
  const options = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({user})
  }
  return fetch(url, options).then(r => r.json())
}

export function signup(user) {
  const url = `${API_ROOT}/users`
  const options = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({user})
  }
  return fetch(url, options).then(r => r.json())
}

// make dynamic for login user and msg recipient user
export function getUser(id) {
  const url = `${API_ROOT}/get_user`
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json",
      Authorization: id
    }
  }
  return fetch(url, options).then(r => r.json())
}

export function getAllUsers() {
  const url = `${API_ROOT}/users`
  return fetch(url).then(r => r.json())
}

// update store
export function createChat(users) {
  const url = `${API_ROOT}/chats`
  const options = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({chat: users})
  }
  return fetch(url, options).then(r => r.json())
}

export function createMessage(message) {
  const url = `${API_ROOT}/messages`
  const options = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({message})
  }
  console.log('CREATEMESSAGE ADAPTER', message);
  return fetch(url, options).then(r => r.json())
}

// update store
// export function getChatMessages(userId) {
//   return (dispatch) => {
//     const url = `${API_ROOT}/users/${userId}`
//     fetch(url).then(r => r.json())
//       .then(messages => {
//         debugger
//         updateMessages(messages)
//         const msgs = messages.map(msg => msg.id)
//         localStorage.setItem('msgs', msgs)
//       })
//   }
// }

export function getChatMessages(userId) {
  const url = `${API_ROOT}/users/${userId}`
  return fetch(url).then(r => r.json())
}

// update store
export function getChat(id) {
  const url = `${API_ROOT}/chats/${id}`
  return fetch(url).then(r => r.json())
}

// update store
export function getMsgs(ids) {
  const url = `${API_ROOT}/messages`

  return Promise.all(ids.split(',').map(id => fetch(`${url}/${Number(id)}`).then(r => r.json())))
}
