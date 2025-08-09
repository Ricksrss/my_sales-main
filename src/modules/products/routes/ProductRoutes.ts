import { Router } from "express";
import ProductsController from '../controller/productsController.js';
import { createProductSchema, IdParamsValidation, UpdateProductSchema } from "../schemas/ProductSchemas.js";

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/products', productsController.index);
productsRouter.get('/products/:id',IdParamsValidation, productsController.show);
productsRouter.post('/products',createProductSchema, productsController.create);
productsRouter.put('/products/:id',UpdateProductSchema, productsController.update);
productsRouter.delete('/products/:id',IdParamsValidation, productsController.delete);

export default productsRouter;
