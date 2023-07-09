import { Request, Response } from "express";
import { datasource } from "../config/ormConfig";
import { User } from "../Entity/user.entity";
import { Wish_List } from "../Entity/wish_list";
import { Product } from "../Entity/product.entity";
import { Cart } from "../Entity/cart.entity";

const userRepository = datasource.getRepository(User);
const cartRepository = datasource.getRepository(Cart);
const productRepository = datasource.getRepository(Product);
export const createCart = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { id } = req.user;
    const { productId } = req.body;
    const cart = await cartRepository.findOne({
      relations: { customer: true, products: true },
      where: { customer: { id: id } },
    });
    const user = await userRepository.findOneBy({ id });
    const product = await productRepository.findOneBy({ id: productId });
    let result;
    if (product && user) {
      if (cart) {
        cart.products.push(product);
        result = await cartRepository.save(cart);
      } else {
        result = await cartRepository.save({
          customer: user,
          products: [product],
        });
      }
    } else {
      return res.status(404).json({ message: "Product not available" });
    }
    if (result) {
      return res.status(200).json({ sucessMessage: result });
    } 
      return res.status(401).json({ message: "unable to add product to cart" });
    
  } catch (err) {
    return res.status(500).json({ errmessage: err });
  }
};
