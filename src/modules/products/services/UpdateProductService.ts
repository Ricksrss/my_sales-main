import AppError from "../../../shared/errors/AppError.ts";
import { productRepositories } from '../database/repositories/ProductsRepositories.ts';
import { Product } from '../database/entities/Products';

interface IUpdateProduct {
  id: string;
  name?: string;
  price?: number;
  quantity?: number;
}

export default class UpdateProductService {
  async execute({ id, name, price, quantity }: IUpdateProduct): Promise<Product> {
    const product = await productRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Atualiza os campos se fornecidos
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (quantity !== undefined) product.quantity = quantity;

    // Salva as alterações no repositório (dependendo do ORM, pode ser necessário)
    await productRepositories.save(product);

    return product;
  }
}
