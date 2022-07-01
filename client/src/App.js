import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

const App = () => {
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
        <div className='App'>
            {listPost.map((value, key) => {
                return (
                    <div className='post'>
                        <div className='title'> Titulo: {value.title} </div>
                        <div className='body'> Texto: {value.postText} </div>
                        <div className='footer'> Autor: {value.username}  </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}

export default App;
