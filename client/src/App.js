// Modules
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import axios from 'axios';
// Files
import './App.css';
import { AuthContext } from './helpers/AuthContext';
// Components
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post'
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  })

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth', { headers: {
      accessToken: localStorage.getItem('accessToken')
    }})
    .then((response) => {
      if (response.data.error) return setAuthState({ ...authState, status: false })
      return setAuthState({
        username: response.data.username,
        id: response.data.id,
        status: true
      })
    })
  }, [])

  const logout = () => {
    localStorage.removeItem('accessToken')
    setAuthState({username: "", id: 0, status: false })
  }

  return (
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
          <div className='navbar'>
            <Link to="/">Inicio</Link>
            <Link to="/createpost">Criar um Post</Link>
            {!authState.status ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Registro</Link>
              </>
            ) : (
                <button onClick={logout}>Sair</button>
            )}

            <h1>{authState.username}</h1>

          </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App;
