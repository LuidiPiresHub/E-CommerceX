import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { loginSchema } from '../../schemas/loginSchema';
import LoadingBtn from '../../components/loadingBtn/LoadingBtn';

export default function Login() {
  const { login, isLoading } = useAuth();

  useEffect(() => {
    document.title = 'E-CommerceX - Login';
  }, []);

  return (
    <main className={styles.main}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
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
          <LoadingBtn
            className={styles.button}
            isLoading={isLoading}
            type='submit'
          >
            Login
          </LoadingBtn>
          <div className={styles.redirect}>
            <p>Não tem conta?</p>
            <Link to='/register' className={styles.link}>Registre-se</Link>
          </div>
        </Form>
      </Formik>
    </main>
  );
}
