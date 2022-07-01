import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import './app.css'
import * as Yup from 'yup'
import axios from 'axios'


const CreatePost = () => {
  let history = useNavigate()

  const initialValues = {
    title: '',
    postText: '',
    username: ''
  }
  const onSubmit = (data) => {
    return axios.post('http://localhost:3001/posts', data)
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
    username: Yup.string().required('O autor é obrigatório').min(3, 'deve ter pelo menos 3 caracteres').max(32, 'deve ter no máximo 32 caracteres')
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

          <label>Autor</label>
          <ErrorMessage name="username" component="span" />
          <Field autoComplete='off' id='inputCreatePost' name='username' placeholder='(ex: Autor123)' />

          <button type='submit'>Criar Post</button>
        </Form>
      </Formik>
    </div >
  )
}

export default CreatePost