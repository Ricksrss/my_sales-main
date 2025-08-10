import AppError from "@modules/shared/errors/AppError";
import { userTokensRepositories } from "../database/repositories/UserTokenRepositories";
import { usersRepositories } from "../database/repositories/UserRepositories";
import { hash } from "bcrypt";
import { isAfter, addHours } from "date-fns";

interface IResetPassword {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await userTokensRepositories.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exist', 404);
    }

    const user = await usersRepositories.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist', 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(new Date(), compareDate)) {
      throw new AppError('Token expired.', 401);
    }

    user.password = await hash(password, 10);

    await usersRepositories.save(user);
  }
}
