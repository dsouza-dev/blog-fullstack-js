import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './app.css'

const Register = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, 'deve ter pelo menos 3 caracteres').max(15, 'deve ter no máximo 15 caracteres').required('Usuário é obrigatório'),
    password: Yup.string().min(4, 'deve ter pelo menos 4 caracteres').max(20, 'deve ter no máximo 20 caracteres').required('Senha é obrigatório'),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Usuário: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder=""
          />

          <label>Senha: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder=""
          />

          <button type="submit">Registro</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Register