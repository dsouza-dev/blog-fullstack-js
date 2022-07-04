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
    <div>
      <input type='text' onChange={(e) => { setUser(e.target.value) }} />
      <input type="password" onChange={(e) => { setPass(e.target.value) }} />
      <button type='submit' onClick={login}>Entrar</button>
    </div>
  )
}

export default Login