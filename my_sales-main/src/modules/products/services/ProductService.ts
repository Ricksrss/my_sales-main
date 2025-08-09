import AppError from "../../../shared/errors/AppError";
import { Product } from "../database/entities/Products";
import { productRepositories } from "../database/repositories/ProductsRepositories";

interface IUpdateProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService {
  async execute({ id, name, price, quantity }: IUpdateProduct): Promise<Product> {
    const product = await productRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const productExists = await productRepositories.findByName(name);

    if (productExists && productExists.id !== id) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepositories.save(product);

    return product;
  }
}
