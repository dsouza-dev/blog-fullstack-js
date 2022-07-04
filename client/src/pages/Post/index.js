import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './app.css'

const Post = () => {
  let { id } = useParams()
  const [post, setPost] = useState({})
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`)
      .then(
        (response) => {
          setPost(response.data)
        }
      )
    axios.get(`http://localhost:3001/posts/byId/${id}`)
      .then(
        (response) => {
          setPost(response.data)
        }
      )
  }, [])

  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id='individual'>
          <div className='title'>{post.title}</div>
          <div className='body'>{post.postText}</div>
          <div className='footer'>{post.username}</div>
        </div>
      </div>
      <div className='rightSide'>
        <div className='addCommentContainer'>
          <input type='text' placeholder='Escreva ...' autoComplete='off' />
          <button>Adicionar Comentário</button>
        </div>
        <div className='listOfComments'></div>
      </div>
    </div>
  )
}

export default Post