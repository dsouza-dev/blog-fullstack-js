import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './app.css'

const Home = () => {
  const [listPost, setListPost] = useState([])
  let history = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3001/posts')
      .then(
        (response) => {
          setListPost(response.data)
        }
      )
  }, [])
  return (
    <div>
      {
        listPost.map((value, key) => {
          return (
            <div className='post' onClick={() => { history(`/post/${value.id}`) }}>
              <div className='title'> Titulo: {value.title} </div>
              <div className='body'> Texto: {value.postText} </div>
              <div className='footer'> Autor: {value.username}  </div>
              <hr />
            </div>
          )
        })
      }
    </div>
  )
}

export default Home