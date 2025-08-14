import RedisCache from '@shared/cache/RedisCache';

import { Product } from '../database/entities/Products.js';
import { productRepositories } from '../database/repositories/ProductsRepositories.js';

export default class ListProductService {
  async execute(): Promise<Product[]> {
    const cache = new RedisCache();

    let products = await cache.recover<Product[]>('api-mysales:PRODUCT_LIST');

    if (!products) {

      products = await productRepositories.find();


      await cache.save('api-mysales:PRODUCT_LIST', products, 60); // ✅ sem stringify aqui
    }

    return products;
  }
}
