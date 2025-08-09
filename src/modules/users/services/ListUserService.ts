import { usersRepositories } from "../database/repositories/UserRepositories";
import { User } from "../database/entities/User";

export default class ListUsersService{
  async execute(): Promise<User[]>{
    const users =await usersRepositories.find();
    return users;
  }
}
