import React from 'react'
import { useState } from 'react'
import './app.css'
import axios from 'axios'

const Login = () => {
  const [user, setUser] = useState([])
  const [pass, setPass] = useState([])

  const login = () => {
    const data = { username: user, password: pass }
    axios.post('http://localhost:3001/auth/login', data)
      .then((response) => {
        console.log(response.data)
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