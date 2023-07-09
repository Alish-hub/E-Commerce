import { Wish_List } from "../Entity/wish_list";
import { Request, Response } from "express";
import { datasource } from "../config/ormConfig";
import { User } from "../Entity/user.entity";
import { Product } from "../Entity/product.entity";
const userRepository = datasource.getRepository(User);
const wishRepository = datasource.getRepository(Wish_List);
const productRepository = datasource.getRepository(Product);

export const addWishList = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { id } = req.user;
    console.log(id);
    const { productId } = req.body;
    // const wishlist = await userRepository
    //   .createQueryBuilder("customer")
    //   .leftJoinAndSelect("customer.wishList", "wishList")
    //   .where("id=:id", { id })
    //   .getOne();

    const wishlist = await wishRepository.findOne({
      relations: { customer: true, products: true },
      where: { customer: { id: id } },
    });
    console.log("wishlist", wishlist);

    const user = await userRepository.findOneBy({ id });
    console.log({ user });
    const product = await productRepository.findOneBy({ id: productId });
    console.log({ product });
    const resulttemp = new Wish_List();
    // if (user) user ? (resulttemp.customer = user) : "";
    let result;
    if (product && user) {
      if (wishlist) {
        // const { products, ...rest } = wishlist;
        wishlist.products.push(product);
        result = await wishRepository.save(wishlist);
        console.log({ result });
      } else {
        resulttemp.customer = user;
        resulttemp.products = [product];
        result = await wishRepository.save(resulttemp);
      }
      console.log({ result });
    }

    // if (product) resulttemp.products = [product];

    // const result =await wishRepository.save({ products: product, customer: user });
    if (result) {
      return res
        .status(200)
        .json({ message: "Wish_list created successfully", result });
    }
  } catch (err) {
    console.log("err", err);
    return res.status(418).json(err);
  }
};

export const getAllWishList = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { id } = req.user;
    console.log(id);
    const wishlist = await wishRepository.find({
      relations: { customer: true, products: true },
      where: { customer: { id: id } },
    });
    console.log({ wishlist });
    return res.status(200).json({ "Your wish_list is": wishlist });
  } catch (err) {
    return res.status(500).json(err);
  }
};
