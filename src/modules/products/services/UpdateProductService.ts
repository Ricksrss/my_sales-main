import AppError from "../../../shared/errors/AppError.js";
import { productRepositories } from '../database/repositories/ProductsRepositories.js';
import { Product } from '../database/entities/Products.js';
import RedisCache from "@modules/shared/cache/RedisCache.js";

interface IUpdateProduct {
  id: string;
  name?: string;
  price?: number;
  quantity?: number;
}

export default class UpdateProductService {
  async execute({ id, name, price, quantity }: IUpdateProduct): Promise<Product> {
    const redisCache = new RedisCache();
    const product = await productRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (quantity !== undefined) product.quantity = quantity;

    await productRepositories.save(product);

    await redisCache.invalidate('api-mysales:PRODUCT_LIST')

    return product;
  }


}
