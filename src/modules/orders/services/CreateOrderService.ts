import { Product } from "@modules/products/database/entities/Products.js";
import { Order } from "../database/entities/Order.js";
import { customerRepository } from "@modules/customers/database/repositories/CustomerRepositories.js";
import AppError from "@shared/errors/AppError.js";
import { productRepositories } from "@modules/products/database/repositories/ProductsRepositories.js";
import { orderRepositories } from "../database/repositories/OrderRepositories.js";

interface ICreateOrder {
  customer_id: string;
  products: Product[];
}

export class CreateOrderService {
  async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
    const customerExists = await customerRepository.findById(Number(customer_id));

    if (!customerExists) {
      throw new AppError("Could not find any customer with the given id.");
    }

    const existsProducts = await productRepositories.findAllByIds(
      products.map(product => ({
        id: product.id,
        products: []
      }))
    );

    if (!existsProducts.length) {
      throw new AppError("Could not find any product with the given id.");
    }

    const existProductsIds = products.map((product) => product.id);

    const checkInexistentProducts = products.filter(
      (product) => !existProductsIds.includes(product.id)
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}. `,
        404
      );
    }

    const quantityAvailable = products.filter((product) => {
      return (
        existsProducts.filter(
          (productExisten) => productExisten.id === product.id
        )[0].quantity < product.quantity
      );
    });

    if (!quantityAvailable.length) {
      throw new AppError(
        `The quantity is not available`,
        409
      );
    }

    const serializedProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await orderRepositories.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products}= order;

    const updateProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter((p) => p.id === product.product_id)[0].quantity - product.quantity,
    }));

    await productRepositories.save(updateProductQuantity);

    return order;
  }
}
