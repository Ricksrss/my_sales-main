import { Product } from "../database/entities/Products";
import { productRepositories } from "../database/repositories/ProductsRepositories.ts";

export default class ListProductService {
  async execute(): Promise<Product[]> {
    const products = await productRepositories.find();
    return products;
  }
}
