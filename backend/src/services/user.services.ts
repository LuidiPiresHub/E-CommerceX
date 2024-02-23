import { IUserLogin, IUserRegister, IUserService } from '../interfaces/users.interface';
import { PrismaClient } from '@prisma/client';
import { PrismaError } from '../interfaces/prisma.interface';
import bcrypt from 'bcrypt';
import { generateToken } from '../auth/jwtFunctions';

const prisma = new PrismaClient();

const register = async (user: IUserRegister): Promise<IUserService> => {
  try {
    const data = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
      },
    });

    const userData = {
      id: data.id,
      name: data.name,
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
  const data = await prisma.user.findUnique({ where: { email: user.email } });
  if (!data) return { type: 'NOT_FOUND', message: 'Usuário não encontrado' };

  const isPasswordValid = await bcrypt.compare(user.password, data.password);
  if (!isPasswordValid) return { type: 'UNAUTHORIZED', message: 'Senha inválida' };

  const userData = {
    id: data.id,
    name: data.name,
    email: data.email,
  };

  return { type: 'OK', message: generateToken(userData) };
};

export default {
  register,
  login,
};
