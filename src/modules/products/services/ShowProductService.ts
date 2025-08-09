import AppError from "../../../shared/errors/AppError.ts";
import { productRepositories } from "../database/repositories/ProductsRepositories.ts";
import { Product } from "../database/entities/Products.ts";



interface IShowPRoduct{
  id: string;
}


export default class SHowProductService{
  async execute({ id }: IShowPRoduct): Promise<Product>{
    const product = await productRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }
}
