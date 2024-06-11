import * as Yup from 'yup';
import { calculateAge } from '../utils/functions';

export const profileSchema = Yup.object({
  username: Yup.string().min(3, 'Nome de usuário precisa ter pelo menos 3 caracteres').required('Campo obrigatório'),
  gender: Yup.string().required('Selecione um gênero'),
  phoneNumber: Yup.string()
    .min(11, 'O número de telefone completo, incluindo o DDD, deve ter pelo menos 11 dígitos')
    .required('Campo obrigatório'),
  birthdate: Yup.date()
    .min(new Date(new Date().setFullYear(new Date().getFullYear() - 120)), 'A data de nascimento não pode ser antes de 120 anos atrás')
    .max(new Date(), 'A data de nascimento não pode ser no futuro')
    .test('age', 'Você deve ter pelo menos 5 anos de idade', (date) => date && calculateAge(date) >= 5)
    .required('Campo obrigatório'),
});
