// src/modules/orders/database/entities/OrderProducts.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order.js';
import { Product } from '@modules/products/database/entities/Products.js';

@Entity('orders_products')
export class OrderProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.order_products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column('uuid', { name: 'order_id' })
  order_id: string;

  @ManyToOne(() => Product, (product) => product.order_products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('uuid', { name: 'product_id' })
  product_id: string;

  @Column('int')
  quantity: number;

  @Column('numeric', { precision: 10, scale: 2 })
  price: number;
}
