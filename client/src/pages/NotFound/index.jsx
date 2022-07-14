import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h1>Page not Found: </h1>
      <h3>
        Go to the Home Page: <Link to="/"> Home Page</Link>
      </h3>
    </div>
  )
}

export default NotFound