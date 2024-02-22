import { IUserRegister, IUserService } from '../interfaces/users.interface';
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

export default {
  register,
};
