import CreateUserService from "../services/CreateUserService";
import ListUsersService from "../services/ListUserService";
import { Request, Response } from "express";


export default class UsersControllers{
  async index(request: Request, response: Response): Promise<Response>{
    const listUsers = new ListUsersService()

    const users = await listUsers.execute();
    return response.json( users);
  }

  async create(request: Request, response: Response): Promise<Response>{
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}
