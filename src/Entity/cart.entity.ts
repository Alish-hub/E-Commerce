import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity()
export class Cart{

    @PrimaryGeneratedColumn()
    id:string;


    @OneToOne(()=>User)
    @JoinColumn()
    customer:User;

    @ManyToMany(()=>Product)
    @JoinTable()
    products:Product[]


}