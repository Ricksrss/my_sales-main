import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity
} from "typeorm";

@Entity('users')
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
