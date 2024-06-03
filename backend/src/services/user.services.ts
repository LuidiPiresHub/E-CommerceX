import { IUserLogin, IUserRegister, IUserService, IUserUpdateProfile } from '../interfaces/users.interface';
import { PrismaClient } from '@prisma/client';
import { PrismaError } from '../interfaces/prisma.interface';
import bcrypt from 'bcrypt';
import { generateToken } from '../auth/jwtFunctions';

const prisma = new PrismaClient();

const register = async (user: IUserRegister): Promise<IUserService> => {
  try {
    const data = await prisma.users.create({
      data: {
        username: user.name,
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
      },
    });

    const userData = {
      id: data.id,
      name: data.username,
      email: data.email,
    };

    return { type: 'CREATED', message: generateToken(userData) };
  } catch (err) {
    const error = err as PrismaError;

    if (error.code === 'P2002') {
      return { type: 'CONFLICT', message: 'Este email já está cadastrado' };
    }
    throw err;
  }
};

const login = async (user: IUserLogin): Promise<IUserService> => {
  const data = await prisma.users.findUnique({ where: { email: user.email } });
  if (!data) return { type: 'NOT_FOUND', message: 'Usuário não encontrado' };

  const isPasswordValid = await bcrypt.compare(user.password, data.password);
  if (!isPasswordValid) return { type: 'UNAUTHORIZED', message: 'Senha inválida' };

  const userData = {
    id: data.id,
    name: data.username,
    email: data.email,
  };

  return { type: 'OK', message: generateToken(userData) };
};

const updateProfile = async (userData: IUserUpdateProfile): Promise<IUserService> => {
  try {
    await prisma.users.update({
      where: { id: userData.id },
      data: {
        username: userData.name,
      },
    });
    return { type: 'OK', message: 'Perfil atualizado com sucesso' };
  } catch (err) {
    return { type: 'BAD_REQUEST', message: 'Erro ao atualizar perfil' };
  }
};

export default {
  register,
  login,
  updateProfile,
};
