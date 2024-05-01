import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { login, getMe } from "../../WebAPI"
import { setAuthToken } from "../../utils"
import { AuthContext } from "../../contexts"

const ErrorMessage = styled.div`
  color: red;
`

export default function LoginPage() {
  const { setUser } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()

    setErrorMessage(null)

    login(username, password).then(data => {
      if (data.ok === 0) {
        return setErrorMessage(data.message)
      }

      setAuthToken(data.token)

      getMe().then(res => {
        if (res.ok !== 1) {
          setAuthToken(null)
          return setErrorMessage(res.toString())
        }
        setUser(res.data)
        history.push('/')
      })
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username: <input value={username} onChange={e => setUsername(e.target.value)}></input>
      </div>
      <div>
        password: <input value={[password]} onChange={e => setPassword(e.target.value)} type="password"></input>
      </div>
      <button>登入</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  )
}
