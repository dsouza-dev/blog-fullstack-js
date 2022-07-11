import React from 'react'
import { useState } from 'react'
import './app.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [user, setUser] = useState([])
  const [pass, setPass] = useState([])

  let history = useNavigate()

  const login = () => {
    const data = { username: user, password: pass }
    axios.post('http://localhost:3001/auth/login', data)
      .then((response) => {
        if (response.data.error) return alert(response.data.error)
        sessionStorage.setItem("accessToken", response.data.accessToken)
        history('/')
      })
  }

  return (
    <div className="loginContainer">
      <div className="login"><h1>Login</h1></div>
      <label>Usuário:</label>
      <input
        type="text"
        onChange={(event) => {
          setUser(event.target.value);
        }}
      />
      <label>Senha:</label>
      <input
        type="password"
        onChange={(event) => {
          setPass(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  )
}

export default Login