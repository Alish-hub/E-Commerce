import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Category } from "./category.entity";
import { Wish_List } from "./wish_list";
import { Rating } from "./rating.entity";
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  productName: string;

  @Column("decimal")
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => Wish_List, (wishlist) => wishlist.products)
  wishlist: Wish_List;
  @OneToMany(() => Rating, (rating) => rating.product)
  rating: Rating[];
}
