import { Formik, Form, Field, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { LoginFormValues } from '../../interfaces/login.interface';
import { IBackendResponseError } from '../../interfaces/server.interface';
import EcommerceContext from '../../context/EcommerceContext';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import api from '../../axios/api';

export default function Login() {
  const navigate = useNavigate();
  const { setIsLoading } = useContext(EcommerceContext);
  const INITIAL_USER_DATA = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
    password: Yup.string().min(3, 'A senha precisa ter pelo menos 3 caracteres').required('Campo obrigatório'),
  });

  const login = async (values: FormikValues, { resetForm }: FormikHelpers<LoginFormValues>) => {
    try {
      setIsLoading(true);
      await api.post('/users/login', { userData: values });
      resetForm();
      navigate('/');
    } catch (error) {
      const errorMessage = (error as IBackendResponseError).response?.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage || 'Ocorreu um erro interno',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
