import { Formik, Form, Field, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { LoginFormValues } from '../../interfaces/login.interface';

export default function Login() {
  const INITIAL_USER_DATA = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
    password: Yup.string().min(3, 'A senha precisa ter pelo menos 3 caracteres').required('Campo obrigatório'),
  });

  const onSubmit = (values: FormikValues, { resetForm }: FormikHelpers<LoginFormValues>) => {
    console.log('Valores do formulário:', values);
    resetForm();
  };

  return (
    <main className={styles.main}>
      <Formik
        initialValues={INITIAL_USER_DATA}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
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
