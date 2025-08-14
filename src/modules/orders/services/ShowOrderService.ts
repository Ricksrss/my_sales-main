import { orderRepositories } from "../database/repositories/OrderRepositories.js";
import { Order } from "../database/entities/Order.js";
import AppError from "@shared/errors/AppError.js";

export class ShowOrderService{
  async execute(id: string): Promise<Order>{
    const order = await orderRepositories.finById(Number(id));

    if(!order){
      throw new AppError('Order not found');
    }

    return order;
  }
}
