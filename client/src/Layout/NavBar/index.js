import React from 'react'
import { Link } from 'react-router-dom'
import './app.css'

const NavBar = () => {
  return (
    <div className='navbar'>
      <Link to="/">Inicio</Link>
      <Link to="/createpost">Criar um Post</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Registro</Link>
    </div>
  )
}

export default NavBar