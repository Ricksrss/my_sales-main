import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import { Request, Response } from "express";

export default class UpdateAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = new UpdateUserAvatarService();

    if (!request.user?.id) {
      return response.status(401).json({ message: "User not authenticated." });
    }

    const user = await updateUserAvatar.execute({
      userId: Number(request.user.id),
      avatarFilename: request.file?.filename as string,
    });

    return response.json(user);
  }
}
