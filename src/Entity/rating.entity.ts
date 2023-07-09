import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ nullable: true })
  rating: number;
  @ManyToOne(() => User, (user) => user.rating)
  @JoinColumn()
  user: User;
  @ManyToOne(() => Product, (product) => product.rating)
  @JoinColumn()
  product: Product;
}
