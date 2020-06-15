import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const findUserWithSameEmail = await usersRepository.findOne({
      where: { email },
    });

    if (findUserWithSameEmail) {
      throw new AppError('This email is already used by another user');
    }

    const hashedPassword = await hash(password, 8);

    const newUser = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
