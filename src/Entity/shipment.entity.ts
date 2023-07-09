// import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import { User } from "./user.entity";
// import { Order } from "./order.entity";



// @Entity()
// export class Shipment{

//     @PrimaryGeneratedColumn()
//     id:string;

//     @Column()
//     shipmentDate:Date;

//     @Column()
//     address:string;

//     @OneToMany(()=>Order,(order)=>order.shipment)
//     order: Order;

     
//     @ManyToOne(()=>User)
//     @JoinColumn()
//     customer:User;

// }