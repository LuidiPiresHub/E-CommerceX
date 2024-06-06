import { useState, ChangeEvent, useRef, useEffect } from 'react';
import defaultImage from '../../assets/images/userImg.png';
import styles from './Profile.module.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaLock, FaLongArrowAltLeft } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

export default function Profile() {
  const [file, setFile] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [rotate, setRotate] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userData, isLoading, logout } = useAuth();

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

  return (
    <main className={styles.main}>
      {isLoading ? <h1 className={styles.loading}>Carregando...</h1> : (
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
              <h1 className={styles.username}>{userData?.name}</h1>
            </section>
            <form className={styles.form}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="username"
                  className={styles.input}
                  placeholder='Digite seu nome de usuário'
                  defaultValue={userData?.name}
                  spellCheck={false}
                />
                <label htmlFor="username" className={styles.label}>
                  Usuario
                </label>
              </div>
              <div className={styles.inputContainer}>
                <select
                  id="gender"
                  className={styles.input}
                  disabled={true}
                >
                  <option value="">Selecione um gênero</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
                <FaLock className={styles.icon} />
                <label htmlFor="gender" className={styles.label}>
                  Gênero
                </label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="email"
                  id="email"
                  className={styles.input}
                  placeholder='Digite seu E-mail'
                  defaultValue={userData?.email}
                  disabled={true}
                />
                <label htmlFor="email" className={styles.label}>
                  E-mail
                </label>
                <FaLock className={styles.icon} />
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="cellphone"
                  id="cellphone"
                  className={styles.input}
                  defaultValue='(00) 00000-0000'
                  disabled={true}
                />
                <label htmlFor="cellphone" className={styles.label}>
                  Celular
                </label>
                <FaLock className={styles.icon} />
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="birthday"
                  id="birthday"
                  className={styles.input}
                  defaultValue='01/01/2000'
                  disabled={true}
                />
                <label htmlFor="birthday" className={styles.label}>
                  Data de nascimento
                </label>
                <FaLock className={styles.icon} />
              </div>
              <footer className={styles.formFooter}>
                <button type='button' className={styles.logoutBtn} onClick={logout}>Logout</button>
                <button type='submit' className={styles.submitButton}>
                  Atualizar Perfil
                </button>
              </footer>
            </form>
          </section>
        </>
      )}

    </main>
  );
}
