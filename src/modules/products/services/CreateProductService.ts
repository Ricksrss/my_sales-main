import RedisCache from '@modules/shared/cache/RedisCache.js';
import AppError from '../../../shared/errors/AppError.js';
import { Product } from "../database/entities/Products.js";
import { productRepositories } from '../database/repositories/ProductsRepositories.js';

interface ICreateProduct{
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService{
  async execute({name, price, quantity}: ICreateProduct): Promise<Product>{
    const productExists = await productRepositories.findByName(name)

    if (productExists){
      throw new AppError('There is already one product with this name', 409);
    }

    const product = productRepositories.create({
      name,
      price,
      quantity,
    });
    await  productRepositories.save(product);

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-mysales:PRODUCT_LIST');

    return product

  }
}
