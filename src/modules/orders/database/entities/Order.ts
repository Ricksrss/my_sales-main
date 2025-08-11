import { Customer } from "@modules/customers/database/entities/Customer";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/browser";


@Entity('orders')
export class Order{
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Customer)
    @JoinColumn({name: 'customer_id'})
  customer: Customer

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
