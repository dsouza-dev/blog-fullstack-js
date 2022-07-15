import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import { AuthContext } from '../../helpers/AuthContext'
import './app.css'

const Home = () => {
  const [listPost, setListPost] = useState([])
  const [likedPosts, setLikedPosts] = useState([])
  const { authState } = useContext(AuthContext)


  let history = useNavigate()
  
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      history('/login')
    } else {
      axios.get('http://localhost:3001/posts', { headers: { accessToken: localStorage.getItem('accessToken') } })
        .then(
          (response) => {
            setListPost(response.data.listPosts)
            setLikedPosts(response.data.likedPosts.map((like) => {
                return like.PostId 
                })
              )
          })
  }}, [])
  
  const likeAPost = (postId) => {
    axios.post('http://localhost:3001/likes', {PostId: postId }, {headers: { accessToken: localStorage.getItem('accessToken') }})
      .then((response) => {
        setListPost(
          listPost.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] }
              } else {
                const likesArray = post.Likes
                likesArray.pop()
                return { ...post, Likes: likesArray }
              }
            } else {
              return post
            }
          })
        )
        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId
            })
          )
        } else {
          setLikedPosts([...likedPosts, postId])
        }
      })
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
                <div className='username'><Link to={`/profile/${value.UserId}`}>{value.username}</Link></div>
                <div className="buttons">
                  <ThumbUpAltIcon onClick={() => likeAPost(value.id)}
                    className={
                      likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                    }
                    />
                  <label>{value.Likes.length}</label>
                </div>
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