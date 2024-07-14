import { IUserData, IUserLogin, IUserRegister, IUserService } from '../interfaces/users.interface';
import { PrismaClient } from '@prisma/client';
import { PrismaError } from '../interfaces/prisma.interface';
import bcrypt from 'bcrypt';
import { generateToken } from '../auth/jwtFunctions';
import { cloudinaryUploader } from '../utils/cloudinaryUploader';

const prisma = new PrismaClient();

const register = async (userData: IUserRegister): Promise<IUserService> => {
  try {
    const data = await prisma.users.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      },
    });

    const { password, ...userWithoutPassword } = data;

    return { type: 'CREATED', message: generateToken(userWithoutPassword) };
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

  const { password, ...userWithoutPassword } = data;

  return { type: 'OK', message: generateToken(userWithoutPassword) };
};

const updateUser = async (userId: string, body: IUserData, buffer?: Buffer): Promise<IUserService> => {
  try {
    const uploaderUrl = await cloudinaryUploader(userId, buffer);

    const data = await prisma.users.update({
      where: { id: userId },
      data: {
        ...body,
        birthdate: body.birthdate ? new Date(body.birthdate) : null,
        profileImg: uploaderUrl,
      }
    });

    const { password, ...userWithoutPassword } = data;
    return { type: 'OK', message: generateToken(userWithoutPassword) };
  } catch (error) {
    return { type: 'BAD_REQUEST', message: 'Erro ao atualizar perfil' };
  }
};

export default {
  register,
  login,
  updateUser,
};
