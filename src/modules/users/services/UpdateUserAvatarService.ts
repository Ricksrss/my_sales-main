import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UserRepositories";
import path from "path";
import uploadConfig from "config/Upload";
import fs from "fs";
import AppError from "../../../shared/errors/AppError";

interface IUpdateUserAvatar {
  userId: number;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  async execute({ userId, avatarFilename }: IUpdateUserAvatar): Promise<User> {
    const user = await usersRepositories.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      try {
        await fs.promises.stat(userAvatarFilePath);
        await fs.promises.unlink(userAvatarFilePath);
      } catch {
        // Arquivo não existe, pode ignorar
      }
    }

    user.avatar = avatarFilename;
    await usersRepositories.save(user);

    return user;
  }
}
