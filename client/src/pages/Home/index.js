import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Home = () => {
  const [listPost, setListPost] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/posts')
      .then(
        (response) => {
          console.log(response.data)
          setListPost(response.data)
        }
      )
  }, [])
  return (
    <div>
      {
        listPost.map((value, key) => {
          return (
            <div className='post'>
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