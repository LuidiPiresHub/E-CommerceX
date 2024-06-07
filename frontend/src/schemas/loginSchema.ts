import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
  password: Yup.string().min(3, 'A senha precisa ter pelo menos 3 caracteres').required('Campo obrigatório'),
});
