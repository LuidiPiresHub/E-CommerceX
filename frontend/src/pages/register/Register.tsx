import { Formik, Form, Field, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { MyFormValues } from '../../interfaces/register.interface';
import styles from './Register.module.css';

export default function Register() {
  const INITIAL_USER_DATA = { user: '', email: '', password: '', confirmPassword: '' };

  const validationSchema = Yup.object({
    user: Yup.string().min(3, 'O usuário precisa ter pelo menos 3 caracteres').required('Campo obrigatório'),
    email: Yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
    password: Yup.string().min(3, 'A senha precisa ter pelo menos 3 caracteres').required('Campo obrigatório'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'As senhas precisam ser iguais').required('Campo obrigatório')
  });

  const onSubmit = (values: FormikValues, { resetForm }: FormikHelpers<MyFormValues>) => {
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
          <h1 className={styles.title}>Register</h1>
          <Field
            className={styles.input}
            type='text'
            id='user'
            name='user'
            placeholder='Usuario'
          />
          <ErrorMessage name="user" component="span" className={styles.error} />
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
          <button className={styles.button} type='submit'>Cadastrar</button>
          <div className={styles.redirect}>
            <p>Já tem conta?</p>
            <Link to='/login' className={styles.link}>Faça Login</Link>
          </div>
        </Form>
      </Formik>
    </main>
  );
}
