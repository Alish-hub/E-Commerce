import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Payment } from "./payment.entity";
// import { Shipment } from "./shipment.entity";
import { shippingDetails } from "../data/order.data";
import { Order_Item } from "./order_item.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt: Date;

  @Column("decimal")
  totalPrice: number;

  @Column("jsonb")
  shipmentDetails: shippingDetails;

  @OneToMany(() => Order_Item, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems: Order_Item[];

  @ManyToOne(() => User)
  @JoinColumn()
  customer: User;

  // @OneToOne(() => Payment, (payment) => payment.order)`
  // @JoinColumn()
  // payment: Payment;
}
