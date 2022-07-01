import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';


const App = () => {
  return (
    <div className='App'>
      <Router>
        <Link to="/">Inicio</Link>
        <Link to="/createpost">Criar um Post</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
