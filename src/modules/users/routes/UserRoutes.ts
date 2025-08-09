import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { createUserSchema } from "../schemas/UserSchema";
import AuthMiddleware from "shared/middlewares/AuthMiddleware";

const userRouter = Router();
const userController = new UsersController();

userRouter.get("/", AuthMiddleware.execute, userController.index);
userRouter.post("/", createUserSchema, userController.create);

export default userRouter;
