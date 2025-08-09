import SessionUserService from "../services/SessionUserService";
import { Request, Response } from "express";

export default class SessionControllers {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSession = new SessionUserService();

    const { user, token } = await createSession.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}
