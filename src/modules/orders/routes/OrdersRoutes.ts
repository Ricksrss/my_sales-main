import { Router } from "express";
import OrdersController from "../controller/OrdersControllers.js";
import AuthMiddleware from "@shared/middlewares/AuthMiddleware.js";
import { idParamsValidade } from "@modules/customers/schemas/CustomerSchema.js";
import { createOrderValidate } from "../schemas/OrdersSchemas.js";


const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(AuthMiddleware.execute);


ordersRouter.get('/:id', idParamsValidade, ordersController.show);
ordersRouter.post('/', createOrderValidate, ordersController.create);

export default ordersRouter;
