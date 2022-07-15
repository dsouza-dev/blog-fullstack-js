import React, { useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import './app.css'
import * as Yup from 'yup'
import axios from 'axios'
import { AuthContext } from '../../helpers/AuthContext'

const CreatePost = () => {
  const { authState } = useContext(AuthContext)

  let history = useNavigate()

  const initialValues = {
    title: '',
    postText: '',
  }

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      history('/login')
    }
  }, [])

  const onSubmit = (data) => {
    return axios.post('http://localhost:3001/posts', data, { headers: { accessToken: localStorage.getItem('accessToken') } })
      .then((response) => {
        history("/")
      })
      .catch((e) => {
        console.error(e)
      })
  }
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('O título é obrigatório'),
    postText: Yup.string().required('O texto é obrigatório'),
  })

  return (
    <div className='createPostPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

        <Form className='formContainer'>
          <label>Título</label>
          <ErrorMessage name="title" component="span" />
          <Field autoComplete='off' id='inputCreatePost' name='title' placeholder='(ex: Título...)' />

          <label>Texto</label>
          <ErrorMessage name="postText" component="span" />
          <Field autoComplete='off' id='inputCreatePost' name='postText' placeholder='(ex: Post)' />

          <button type='submit'>Criar Post</button>
        
        </Form>
      </Formik>
    </div >
  )
}

export default CreatePost