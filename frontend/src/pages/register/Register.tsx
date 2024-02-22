import { Formik, Form, Field, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { RegisterFormValues } from '../../interfaces/register.interface';
import styles from './Register.module.css';
import api from '../../axios/api';
import Swal from 'sweetalert2';
import { IBackendResponseError } from '../../interfaces/server.interface';
import LoadingBtn from '../../components/loadingBtn/LoadingBtn';
import { useContext } from 'react';
import EcommerceContext from '../../context/EcommerceContext';

export default function Register() {
  const INITIAL_USER_DATA = { name: '', email: '', password: '', confirmPassword: '' };
  const { setIsLoading } = useContext(EcommerceContext);

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'O usuário precisa ter pelo menos 3 caracteres').required('Campo obrigatório'),
    email: Yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
    password: Yup.string().min(3, 'A senha precisa ter pelo menos 3 caracteres').required('Campo obrigatório'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'As senhas precisam ser iguais').required('Campo obrigatório')
  });

  const onSubmit = async (values: FormikValues, { resetForm }: FormikHelpers<RegisterFormValues>) => {
    try {
      setIsLoading(true);
      await api.post('/users/register', { userData: values });
      resetForm();
    } catch (error) {
      const errorMessage = (error as IBackendResponseError).response.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
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
        onSubmit={onSubmit}
      >
        <Form className={styles.form}>
          <h1 className={styles.title}>Register</h1>
          <Field
            className={styles.input}
            type='text'
            id='name'
            name='name'
            placeholder='Usuario'
          />
          <ErrorMessage name="name" component="span" className={styles.error} />
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
          <LoadingBtn type='submit' BtnClassName={styles.button}>Cadastrar</LoadingBtn>
          <div className={styles.redirect}>
            <p>Já tem conta?</p>
            <Link to='/login' className={styles.link}>Faça Login</Link>
          </div>
        </Form>
      </Formik>
    </main>
  );
}
