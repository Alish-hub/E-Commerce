import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { Product } from "./product.entity";

export enum categories {
  All = "All",
  Electronics = "Electronics",
  Books = "Books",
  Personal_Care = "personal-Care",
  Foods = "Foods",
  Furniture = "Furniture",
  Smartphones = "Smartphones",
  Laptops= "Laptops",
  Cameras="Cameras"
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "enum", enum: categories, default: categories.All })
  category: categories;

  @OneToMany(() => Product, (products) => products.category)
  products: Product[];
  
  @OneToMany(()=>Category,(category)=>category.parent)
  children:Category[];

  @ManyToOne(()=>Category,(category)=>category.children)
  parent:Category;

  

}
