import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
    password: Yup.string().min(3, 'A senha precisa ter pelo menos 3 caracteres').required('Campo obrigatório'),
  });

  const onSubmit = (values: FormikValues) => {
    console.log('Valores do formulário:', values);
  };

  return (
    <main className={styles.main}>
      <Formik
        initialValues={{ email: '', password: '' }}
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
};

export default Login;
