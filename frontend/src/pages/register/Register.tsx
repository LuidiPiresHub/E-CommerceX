import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import LoadingBtn from '../../components/loadingBtn/LoadingBtn';
import { useEffect, useState } from 'react';
import { validationSchema } from '../../schemas/registerSchema';
import { useAuth } from '../../context/AuthContext';
import { FaEye, FaEyeSlash, } from 'react-icons/fa';

export default function Register() {
  const { register, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'E-CommerceX - Register';
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

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
          <div className={styles.passwordWrapper}>
            <Field
              className={styles.input}
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              placeholder='Senha'
            />
            {showPassword ?
              <FaEyeSlash className={styles.passwordReveal} onClick={() => setShowPassword(false)} />
              : <FaEye className={styles.passwordReveal} onClick={() => setShowPassword(true)} />}
          </div>
          <ErrorMessage name="password" component="span" className={styles.error} />
          <ErrorMessage name="email" component="span" className={styles.error} />
          <div className={styles.passwordWrapper}>
            <Field
              className={styles.input}
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Confirme a senha'
            />
            {showConfirmPassword ?
              <FaEyeSlash className={styles.passwordReveal} onClick={() => setShowConfirmPassword(false)} />
              : <FaEye className={styles.passwordReveal} onClick={() => setShowConfirmPassword(true)} />}
          </div>
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
