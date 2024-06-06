import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const INITIAL_USER_DATA = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
    password: Yup.string().min(3, 'A senha precisa ter pelo menos 3 caracteres').required('Campo obrigatório'),
  });

  useEffect(() => {
    document.title = 'E-CommerceX - Login';
  }, []);

  return (
    <main className={styles.main}>
      <Formik
        initialValues={INITIAL_USER_DATA}
        validationSchema={validationSchema}
        onSubmit={login}
      >
        <Form className={styles.form}>
          <h1 className={styles.title}>Login</h1>
          <Field
            className={styles.input}
            type='email'
            id='email'
            name='email'
            placeholder='Email'
          />
          <ErrorMessage name="email" component="div" className={styles.error} />
          <Field
            className={styles.input}
            type='password'
            id='password'
            name='password'
            placeholder='Senha'
          />
          <ErrorMessage name="password" component="div" className={styles.error} />
          <button className={styles.button} type='submit'>Login</button>
          <div className={styles.redirect}>
            <p>Não tem conta?</p>
            <Link to='/register' className={styles.link}>Registre-se</Link>
          </div>
        </Form>
      </Formik>
    </main>
  );
}
