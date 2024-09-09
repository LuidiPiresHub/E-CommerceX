import { useState, ChangeEvent, useRef, useEffect } from 'react';
import defaultImage from '../../assets/images/userImg.png';
import styles from './Profile.module.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaLock, FaLongArrowAltLeft } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { ErrorMessage, Field, Form, Formik, FieldProps } from 'formik';
import { formatBirthdate, urlToFile } from '../../utils/functions';
import { profileSchema } from '../../schemas/profileSchema';
import api from '../../axios/api';
import LoadingBtn from '../../components/loadingBtn/LoadingBtn';
import { IProfileData } from '../../interfaces/profile.interface';
import InputMask from 'react-input-mask';

export default function Profile() {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [rotate, setRotate] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isLoading, userData, logout } = useAuth();
  const standardGenders = ['Masculino', 'Feminino', 'Outros'];

  useEffect(() => {
    document.title = 'E-CommerceX - Perfil';
    if (userData && userData.profileImg) {
      setSelectedImage(userData.profileImg);
    }
  }, []);

  const handleProfileImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        fileInputRef.current!.value = '';
        toast.error('O arquivo selecionado é muito grande. Escolha um arquivo menor que 10MB.', {
          position: 'top-left',
          autoClose: 5000,
        });
      } else {
        setImageOpacity(0);
        setRotate(true);
        setTimeout(() => {
          setSelectedImage(selectedFile);
          setImageOpacity(1);
          setRotate(false);
        }, 300);
      }
    }
  };

  const removeProfileImg = () => {
    if (selectedImage) {
      setImageOpacity(0);
      setRotate(true);
      setTimeout(() => {
        fileInputRef.current!.value = '';
        setImageOpacity(1);
        setRotate(false);
        setSelectedImage(null);
      }, 300);
    }
  };

  const updateProfile = async (values: IProfileData): Promise<void> => {
    try {
      const gender: string = values.otherGender ? values.otherGender : values.gender;
      const { email: _email, otherGender: _otherGender, ...newValues } = values;
      newValues.gender = gender;

      const formData = new FormData();
      if (typeof selectedImage === 'string') {
        const file = await urlToFile(selectedImage);
        formData.append('profileImg', file);
      } else {
        formData.append('profileImg', selectedImage!);
      }
      Object.entries(newValues).forEach(([key, value]) => {
        if (key === 'birthdate') {
          formData.append(key, new Date(value).toISOString());
        } else {
          formData.append(key, value);
        }
      });

      await api.put(`/user/${userData!.id}`, formData );
      toast.success('Perfil atualizado com sucesso!', {
        position: 'top-left',
        autoClose: 5000,
      });
    } catch {
      toast.error('Erro ao atualizar perfil. Tente novamente.', {
        position: 'top-left',
        autoClose: 5000,
      });
    }
  };

  const getImageUrl = (image: string | File | null, defaultImg: string) => {
    if (!image) return defaultImg;
    if (typeof image === 'string') return image;
    return URL.createObjectURL(image);
  };


  const getInitialValues = () => {
    if (userData) {
      const initialValues = {
        username: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber ? userData.phoneNumber : '',
        birthdate: userData.birthdate ? formatBirthdate(userData.birthdate) : '',
      };
      if (userData.gender && !standardGenders.includes(userData.gender)) {
        return { ...initialValues, gender: 'Outros', otherGender: userData.gender as string };
      } else {
        return { ...initialValues, gender: userData.gender || '', otherGender: '' };
      }
    }
  };

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
                src={getImageUrl(selectedImage, defaultImage)}
                alt="Imagem de usuario"
                className={`${styles.image} ${rotate ? styles.rotate : ''}`}
                style={{ opacity: imageOpacity }}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfileImg}
                accept="image/*"
                className={styles.inputFile}
              />
              <button
                type='button'
                onClick={() => fileInputRef.current?.click()}
                className={styles.customButton}
              >
                Selecionar
              </button>
              {selectedImage && (
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
              <h1 className={styles.username}>{userData.username}</h1>
            </section>
            <Formik
              initialValues={getInitialValues()!}
              validationSchema={profileSchema}
              onSubmit={updateProfile}
            >
              {({ setFieldValue, values }) => (
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
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          const { value } = event.target;
                          setFieldValue('gender', value);
                          setFieldValue('otherGender', '');
                        }}
                      >
                        <option value="">Selecione um gênero</option>
                        {standardGenders.map((gender) => (
                          <option key={gender} value={gender}>{gender}</option>
                        ))}
                      </Field>
                      <label htmlFor="gender" className={styles.label}>
                        Gênero
                      </label>
                    </div>
                    <ErrorMessage name="gender" component="p" className={styles.error} />
                  </div>
                  {values.gender === 'Outros' && (
                    <div>
                      <div className={styles.inputContainer}>
                        <Field
                          type="text"
                          id="otherGender"
                          name="otherGender"
                          className={styles.input}
                          placeholder='Digite seu gênero'
                          value={values.otherGender}
                          spellCheck={false}
                        />
                        <label htmlFor="otherGender" className={styles.label}>
                          Outro Gênero
                        </label>
                      </div>
                      <ErrorMessage name="otherGender" component="p" className={styles.error} />
                    </div>
                  )}
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
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder='(999) 99999-9999'
                        value={values.phoneNumber}
                      >
                        {({ field }: FieldProps) => (
                          <InputMask
                            {...field}
                            mask="(99) 99999-9999"
                            className={styles.input}
                            alwaysShowMask={true}
                          />
                        )}
                      </Field>
                      <label htmlFor="phoneNumber" className={styles.label}>
                        Celular
                      </label>
                    </div>
                    <ErrorMessage name="phoneNumber" component="p" className={styles.error} />
                  </div>
                  <div>
                    <div className={styles.inputContainer}>
                      <Field
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        className={styles.input}
                      />
                      <label htmlFor="birthday" className={styles.label}>
                        Data de nascimento
                      </label>
                    </div>
                    <ErrorMessage name="birthdate" component="p" className={styles.error} />
                  </div>
                  <footer className={styles.formFooter}>
                    <button type='button' className={styles.logoutBtn} onClick={logout}>Logout</button>
                    <LoadingBtn
                      type='submit'
                      isLoading={false}
                      className={styles.submitButton}
                    >
                      Atualizar Perfil
                    </LoadingBtn>
                  </footer>
                </Form>
              )}
            </Formik>
          </section>
        </>
      )}

    </main>
  );
}
