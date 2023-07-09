import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
} from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";
import { join } from "path";

@Entity()
export class Wish_List {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToMany(() => Product, (product) => product.wishlist)
  @JoinTable()
  products: Product[];

  @OneToOne(() => User, (user) => user.wishlist)
  @JoinColumn()
  customer: User;
}
