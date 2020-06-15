import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';

import uploadConfig from '../config/upload';

interface Request {
  userId: string;
  avatarFilnename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilnename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new Error('Only authentiicated users can change avatar');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilnename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
