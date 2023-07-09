import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Wish_List } from "./wish_list";
import { Rating } from "./rating.entity";

enum userType {
  Admin = "admin",
  Customer = "customer",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: userType, default: userType.Customer })
  userType: userType;

  @OneToOne(() => Wish_List, (wish_list) => wish_list.customer)
  wishlist: Wish_List;
  @OneToMany(() => Rating, (rating) => rating.user)
  rating: Rating[];
}
