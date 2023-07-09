import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity()
export class Order_Item {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("int")
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;
}
