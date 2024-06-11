import * as Yup from 'yup';

export const validationSchema = Yup.object({
  username: Yup.string().min(3, 'O usuário precisa ter pelo menos 3 caracteres').required('Campo obrigatório'),
  email: Yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
  password: Yup.string().min(3, 'A senha precisa ter pelo menos 3 caracteres').required('Campo obrigatório'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'As senhas precisam ser iguais').required('Campo obrigatório')
});
