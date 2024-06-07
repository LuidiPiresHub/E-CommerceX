import { useState, ChangeEvent, useRef, useEffect } from 'react';
import defaultImage from '../../assets/images/userImg.png';
import styles from './Profile.module.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaLock, FaLongArrowAltLeft } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

export default function Profile() {
  const [file, setFile] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [rotate, setRotate] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isLoading, userData, logout } = useAuth();

  const INITIAL_USER_DATA = {
    username: userData?.name || '',
    email: userData?.email || '',
    gender: userData?.gender || '',
    phone: userData?.phone || '',
    birthday: userData?.birthday || '',
  };

  useEffect(() => {
    document.title = 'E-CommerceX - Perfil';
    setFile(localStorage.getItem('userImg'));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        fileInputRef.current!.value = '';
        toast.error('O arquivo selecionado é muito grande. Escolha um arquivo menor que 5MB.', {
          position: 'top-left',
          autoClose: 5000,
        });
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setImageOpacity(0);
          setRotate(true);
          setTimeout(() => {
            localStorage.setItem('userImg', base64String);
            setFile(base64String);
            setImageOpacity(1);
            setRotate(false);
          }, 300);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeProfileImg = () => {
    if (file) {
      setImageOpacity(0);
      setRotate(true);
      setTimeout(() => {
        setFile(null);
        fileInputRef.current!.value = '';
        localStorage.removeItem('userImg');
        setImageOpacity(1);
        setRotate(false);
      }, 300);
    }
  };

  const updateProfile = (values: FormikValues) => {
    console.log(values);
  };

  const calculateAge = (birthdate: Date): number => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formSchema = Yup.object({
    username: Yup.string().min(3, 'Nome de usuário precisa ter pelo menos 3 caracteres').required('Campo obrigatório'),
    gender: Yup.string().required('Selecione um gênero'),
    phone: Yup.string().matches(/^\d{2,3} \d{8,9}$/, 'Siga o padrão DDD espaço numero').required('Campo obrigatório'),
    birthday: Yup.date()
      .max(new Date(), 'A data de nascimento não pode ser no futuro')
      .test('age', 'Você deve ter pelo menos 5 anos de idade', (date) => date && calculateAge(date) >= 5)
      .required('Campo obrigatório'),
  });
  
  

  return (
    <main className={styles.main}>
      {isLoading || !userData ? <h1 className={styles.loading}>Carregando...</h1> : (
        <>
          <header className={styles.header}>
            <Link to='/' className={styles.leaveProfile}>
              <FaLongArrowAltLeft />
              Continuar Comprando
            </Link>
          </header>
          <section className={styles.profileCard}>
            <div className={styles.imgContainer}>
              <img
                src={file || defaultImage}
                alt="Imagem de usuario"
                className={`${styles.image} ${rotate ? styles.rotate : ''}`}
                style={{ opacity: imageOpacity }}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                accept="image/*"
                className={styles.inputFile}
              />
              <button type='button' onClick={handleButtonClick} className={styles.customButton}>
                Selecionar
              </button>
              {file && (
                <button
                  type='button'
                  onClick={removeProfileImg}
                  className={styles.removeImg}
                >
                  X
                </button>
              )}
            </div>
            <section className={styles.greetingsContainer}>
              <h1>Seja bem vindo(a):</h1>
              <h1 className={styles.username}>{userData.name}</h1>
            </section>
            <Formik
              initialValues={INITIAL_USER_DATA}
              validationSchema={formSchema}
              onSubmit={updateProfile}
            >
              <Form className={styles.form}>
                <div>
                  <div className={styles.inputContainer}>
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      className={styles.input}
                      placeholder='Digite seu nome de usuário'
                      spellCheck={false}
                    />
                    <label htmlFor="username" className={styles.label}>
                      Usuario
                    </label>
                  </div>
                  <ErrorMessage name="username" component="p" className={styles.error} />
                </div>
                <div>
                  <div className={styles.inputContainer}>
                    <Field
                      as="select"
                      id="gender"
                      name="gender"
                      className={styles.input}
                    >
                      <option value="">Selecione um gênero</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                      <option value="outro">Outro</option>
                    </Field>
                    <label htmlFor="gender" className={styles.label}>
                      Gênero
                    </label>
                  </div>
                  <ErrorMessage name="gender" component="p" className={styles.error} />
                </div>
                <div className={styles.disabledInput}>
                  <div className={styles.inputContainer}>
                    <Field
                      type="email"
                      name="email"
                      className={styles.input}
                      disabled={true}
                    />
                    <label htmlFor="email" className={styles.label}>
                      E-mail
                    </label>
                    <FaLock className={styles.icon} />
                  </div>
                </div>
                <div>
                  <div className={styles.inputContainer}>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      className={styles.input}
                      placeholder='(999) 99999-9999'
                    />
                    <label htmlFor="phone" className={styles.label}>
                      Celular
                    </label>
                  </div>
                  <ErrorMessage name="phone" component="p" className={styles.error} />
                </div>
                <div>
                  <div className={styles.inputContainer}>
                    <Field
                      type="date"
                      id="birthday"
                      name="birthday"
                      className={styles.input}
                    />
                    <label htmlFor="birthday" className={styles.label}>
                      Data de nascimento
                    </label>
                  </div>
                  <ErrorMessage name="birthday" component="p" className={styles.error} />
                </div>
                <footer className={styles.formFooter}>
                  <button type='button' className={styles.logoutBtn} onClick={logout}>Logout</button>
                  <button type='submit' className={styles.submitButton}>
                    Atualizar Perfil
                  </button>
                </footer>
              </Form>
            </Formik>
          </section>
        </>
      )}

    </main>
  );
}
