import { Request, Response } from "express";
import { datasource } from "../config/ormConfig";
import { Rating } from "../Entity/rating.entity";
import { User } from "../Entity/user.entity";
import { Product } from "../Entity/product.entity";
const ratingRepository = datasource.getRepository(Rating);
const userRepository = datasource.getRepository(User);
const productRepository = datasource.getRepository(Product);

export const giveRating = async (req: Request, res: Response) => {
  try {
    const { rating, product_id } = req.body;
    // @ts-ignore
    const { id } = req.user;
    console.log(id);
    const pro = await productRepository.findOne({ where: { id: product_id } });
    const user = await userRepository.findOne({ where: { id: id } });
    console.log(pro);
    console.log(user);
    if (user && pro) {
      const data = await ratingRepository.save({
        rating: rating,
        user: user,
        product: pro,
      });
      return res
        .status(201)
        .json({ message: "rating applied successfully", data });
    }
    return res.status(400).json({ message: "data not found" });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
};
