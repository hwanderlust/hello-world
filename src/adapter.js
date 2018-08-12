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

export function getAllUsers() {
  const url = `${API_ROOT}/users`
  return fetch(url).then(r => r.json())
}

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

  fetch(url, options)
}

export function getChatMessages(id) {
  const url = `${API_ROOT}/users/${id}`
  return fetch(url).then(r => r.json())
}

export function detectLang(msg) {
  const url = `${API_ROOT}/detect_language`
  const options = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({detection: {msg}})
  }
  return fetch(url, options).then(r => r.json())
}

export function translateText(msg, fromLang, toLang) {
  const url = `${API_ROOT}/translate`
  const options = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({message: {msg, fromLang, toLang}})
  }
  console.log(url, msg, fromLang, toLang);
  return fetch(url, options).then(r => r.json())
}

export function uploadPic(imgUrl) {
  const url = `${API_ROOT}/upload-picture`
  const options = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({imgUrl})
  }
  return fetch(url, options).then(r => r.json())
}
