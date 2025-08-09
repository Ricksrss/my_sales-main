import { Router } from "express";
import ProductsController from '../controller/productsController.js';


const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/products', productsController.index)
productsRouter.get('/products:id', productsController.show)
productsRouter.post('/products', productsController.create)
productsRouter.put('/products:id', productsController.update)
productsRouter.delete('/products:id', productsController.delete)

export default productsRouter;
