import { Request, Response } from "express";
import { datasource } from "../config/ormConfig";
import { User } from "../Entity/user.entity";
import { Order } from "../Entity/order.entity";
import { Order_Item } from "../Entity/order_item.entity";
import { Product } from "../Entity/product.entity";

const userRepository = datasource.getRepository(User);
const orderRepository = datasource.getRepository(Order);
const orderItemRepository = datasource.getRepository(Order_Item);
const productRepository = datasource.getRepository(Product);

export const placeOrder = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { id } = req.user;
    const { products, shippingDetails } = req.body;

    const user = await userRepository.findOneBy({ id });
    const order = new Order();
    const item = new Order_Item();

    user ? (order.customer = user) : "";
    let totalPrice: number = 0;
    order.shipmentDetails = shippingDetails;
    await Promise.all(
      products.map(async (product1: any) => {
        // console.log({product1})
        // console.log(product1.productId)
        // let id =product1.productId;
        const product = await productRepository.findOneBy({
          id: product1.productId,
        });
        if (product) {
          return (totalPrice = totalPrice + product1.quantity * product.price);
          // console.log({ totalPrice });
        }
      })
    );
    order.totalPrice = totalPrice;

    const orderSave = await orderRepository.save(order);
    products.map(async (product1: any) => {
      let product = await productRepository.findOneBy({
        id: product1.productId,
      });
      if (product) {
        // order.totalPrice = totalPrice;
        item.quantity = product1.quantity;
        item.product = product;
        item.order = orderSave;
        await orderItemRepository.save(item);
      }
    });
    return res
      .status(200)
      .json({ sucessMessage: "Order placed successfully", orderSave });

    // for(let productId in products){
    //     const product = productRepository.findOneBy({id:productId})
    // }

    // if(!user) return res.status(404).json({message:'user not found}')
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await orderRepository.findOne({
      relations: ["orderItems"],
      where: { id: orderId },
    });
    console.log({ order });
    if (order) {
      // await orderItemRepository.remove(order.orderItems)
      await orderRepository.remove(order);
      return res.status(200).json({ message: "Order deleted successfully" });
    }
    return res.status(404).json({ message: "Order not found" });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ ErrorMessage: err });
  }
};

