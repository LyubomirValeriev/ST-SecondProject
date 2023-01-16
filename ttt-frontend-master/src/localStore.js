const usernameKey = 'username'
const idKey = 'id'

export const updateLocalId = () => {
  localStorage.setItem(idKey, crypto.randomUUID())
}

export const updateLocalUsername = (username) => {
  localStorage.setItem(usernameKey, username)
}

export const getLocalUser = () => {
  const id = localStorage.getItem(idKey)
  const username = localStorage.getItem(usernameKey)
  return { id, username, heartbeat: new Date().getTime() }
}

export const localUserExists = () => {
  const id = localStorage.getItem(idKey)
  const username = localStorage.getItem(usernameKey)

  return id !== null && username !== null
}
