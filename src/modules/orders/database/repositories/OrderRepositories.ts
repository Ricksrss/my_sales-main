import AppDataSource from "@shared/typeorm/data.source.js";
import { Order } from "../entities/Order.js";
import { Customer } from "@modules/customers/database/entities/Customer.js";


interface ICreateOrder {
  customer: Customer;
  products: ICreateOrderProducts[];
}

export interface ICreateOrderProducts {
  product_id: string;
  price: number;
  quantity: number;
}

export const orderRepositories = AppDataSource.getRepository(Order).extend({
  async finById(id: string): Promise<Order | null> {
    const order = await this.findOne({
      where: { id },
      relations: ["order_products", "customer"],
    });

    return order;
  },
  async createOrder({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });
    await this.save(order);

    return order;
  },
});
