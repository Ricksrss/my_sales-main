import RedisCache from "@modules/shared/cache/RedisCache.js";
import AppError from "../../../shared/errors/AppError.js";
import { productRepositories } from "../database/repositories/ProductsRepositories.js";

interface IDeleteProduct{
  id: string;
}

export default class DeleteProductService{
  async execute({ id}:  IDeleteProduct): Promise<void>{
    const product = await productRepositories.findById(id);
    const redisCache = new RedisCache();

    if(!product){
      throw new AppError('Product not found', 404);
    }
    await RedisCache.invalidate('api-mysales:PRODUCT_LIST')

    await productRepositories.remove(product);
  }
}
