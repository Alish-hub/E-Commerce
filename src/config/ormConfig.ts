import { DataSource } from "typeorm";
import { User } from "../Entity/user.entity";
import { Product } from "../Entity/product.entity";
import dotenv from "dotenv";
import { Category } from "../Entity/category.entity";
import { Wish_List } from "../Entity/wish_list";
import { Cart } from "../Entity/cart.entity";
import { Order } from "../Entity/order.entity";
import { Order_Item } from "../Entity/order_item.entity";
import { Payment } from "../Entity/payment.entity";
import { Rating } from "../Entity/rating.entity";
// import { Shipment } from "../Entity/shipment.entity";
dotenv.config();

export const datasource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Product,
    Category,
    Wish_List,
    Cart,
    Order,
    Order_Item,
    Payment,
    Rating,
  ],
});
