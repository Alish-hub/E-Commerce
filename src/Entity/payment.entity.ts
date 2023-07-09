import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Order } from "./order.entity";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: string;
  
  @CreateDateColumn()
  paymentDate:Date;


  @Column()
  paymentMethod: string;

  @Column("decimal")
  amount: number;

  // @OneToOne(() => Order, (order) => order.payment)
  // order: Order;

  @ManyToOne(() => User)
  @JoinColumn()
  customer: User;
}
