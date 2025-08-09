import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { createUserSchema } from "../schemas/UserSchema";

const userRouter = Router();
const userController = new UsersController();

userRouter.get('/', userController.index);
userRouter.post('/', createUserSchema, userController.create);

export default userRouter;

