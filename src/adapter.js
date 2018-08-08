import { API_ROOT, HEADERS } from './constants'

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

export function allUsers() {
  const url = `${API_ROOT}/users`
  return fetch(url).then(r => r.json())
}

export function createChat() {
  const url = `${API_ROOT}/chats`
  const options = {
    method: 'POST',
    headers: HEADERS
  }
  return fetch(url, options).then(r => r.json())
}

export function getChatMessages(id) {
  const url = `${API_ROOT}/users/${id}`
  return fetch(url).then(r => r.json())
}
