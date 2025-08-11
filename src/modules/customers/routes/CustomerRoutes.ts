import { Router } from "express";
import CustomersController from "../controllers/CustomerControllers";
import AuthMiddleware from "shared/middlewares/AuthMiddleware";
import { createCustomerSchema, idParamsValidade, updateCustomerSchema } from "../schemas/CustomerSchema";


const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(AuthMiddleware.execute);
customersRouter.get('/', customersController.index);
customersRouter.get('/:id', idParamsValidade, customersController.create);
customersRouter.post('/', createCustomerSchema, customersController.create);
customersRouter.patch('/:id',idParamsValidade, updateCustomerSchema, customersController.update,);
customersRouter.delete('/:id', idParamsValidade, customersController.delete);


export default customersRouter;
