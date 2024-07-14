import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import LoadingBtn from '../../components/loadingBtn/LoadingBtn';
import { useEffect } from 'react';
import { validationSchema } from '../../schemas/registerSchema';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { register, isLoading } = useAuth();

  useEffect(() => {
    document.title = 'E-CommerceX - Register';
  }, []);

  return (
    <main className={styles.main}>
      <Formik
        initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={register}
      >
        <Form className={styles.form}>
          <h1 className={styles.title}>Register</h1>
          <Field
            className={styles.input}
            type='text'
            id='username'
            name='username'
            placeholder='Usuario'
          />
          <ErrorMessage name="username" component="span" className={styles.error} />
          <Field
            className={styles.input}
            type='email'
            id='email'
            name='email'
            placeholder='Email'
          />
          <ErrorMessage name="email" component="span" className={styles.error} />
          <Field
            className={styles.input}
            type='password'
            id='password'
            name='password'
            placeholder='Senha'
          />
          <ErrorMessage name="password" component="span" className={styles.error} />
          <Field
            className={styles.input}
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            placeholder='Confirme a senha'
          />
          <ErrorMessage name="confirmPassword" component="span" className={styles.error} />
          <LoadingBtn
            type='submit'
            isLoading={isLoading}
            className={styles.button}
          >
            Cadastrar
          </LoadingBtn>
          <div className={styles.redirect}>
            <p>Já tem conta?</p>
            <Link to='/login' className={styles.link}>Faça Login</Link>
          </div>
        </Form>
      </Formik>
    </main>
  );
}
