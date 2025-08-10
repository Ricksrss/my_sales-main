import { Router } from "express";
import ProfileController from "../controllers/ProfileControllers";
import { UpdateUserSchema } from "../schemas/UpdateUserSchema";
import AuthMiddleware from "shared/middlewares/AuthMiddleware";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(AuthMiddleware.execute);

profileRouter.get('/', profileController.show.bind(profileController));

profileRouter.patch(
  '/',
  UpdateUserSchema,
  profileController.update.bind(profileController)
);

export default profileRouter;
