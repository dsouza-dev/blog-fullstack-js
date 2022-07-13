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
  
  const likeAPost = (postId) => {
    axios.post('http://localhost:3001/likes', {PostId: postId }, {headers: { accessToken: localStorage.getItem('accessToken') }})
      .then((response) => {
        setListPost(
          listPost.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  }

  return (
    <div>
      {
        listPost.map((value, key) => {
          return (
            <div key={key} className='post'>
              <div className='title'>
                {value.title} 
                </div>
              <div className='body' 
              onClick={() => { history(`/post/${value.id}`) }}
              >
                {value.postText} 
                </div>
              <div className='footer'>
                {value.username}
                {""}
                <button onClick={() => likeAPost(value.id)}>
                  {""}
                  Curtir
                  </button>
                  <label>{value.Likes.length}</label>
                  </div>
              <hr />
            </div>
          )
        })
      }
    </div>
  )
}

export default Home