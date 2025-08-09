import { compare } from "bcrypt";  // para comparar senha hash
import { sign } from "jsonwebtoken";
import AppError from '../../../shared/errors/AppError.ts';
import { usersRepositories } from "../database/repositories/UserRepositories";
import { User } from "../database/entities/User";

interface ISessionUser {
  email: string;
  password: string;
}

interface ISessionResponse {
  user: User;
  token: string;
}

export default class SessionUserService {
  async execute({ email, password }: ISessionUser): Promise<ISessionResponse> {
    const user = await usersRepositories.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const token = sign ({}, process.env.APP_SECRET as string, {
      subject: String(user.id),
      expiresIn: '1d'
    });

    return {
      user,
      token,
    };
  }
}
