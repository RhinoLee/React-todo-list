const TOKEN_NAME = 'token'

export const setAuthToken = token => {
  localStorage.setItem(TOKEN_NAME, token)
}

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME)
}