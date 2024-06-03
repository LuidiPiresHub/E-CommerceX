import useAuth from '../../hooks/useAuth';

export default function Profile() {
  const { isLoading, userData, logout } = useAuth();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Perfil</h1>
      <div>
        <img src={userData!.profileImage} alt='foto de perfil' />
        <p>{userData!.name}</p>
      </div>
      <button type='button' onClick={logout}>Sair</button>
    </div>
  );
}
