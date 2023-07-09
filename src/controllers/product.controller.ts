import { Category } from "../Entity/category.entity";
import { Product } from "../Entity/product.entity";
import { datasource } from "../config/ormConfig";
import { Request, Response } from "express";
const productRepository = datasource.getRepository(Product);
const categoryRepository = datasource.getRepository(Category);

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { productName, categoryId, price } = req.body;
    // console.log("0");
    const product = new Product();
    product.productName = productName;
    product.price = price;
    if (categoryId) {
      const category = await categoryRepository.findOneBy({ id: categoryId });
      if (category) {
        product.category = category;
      }
    }

    // console.log("1");
    console.log("product", product);
    await productRepository.insert(product);

    return res.status(201).json({ "product added successfully": product });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "product added failed": err });
  }
};
export const getProductByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.body;
    // console.log(categoryId);
    const category = await categoryRepository.findOneBy({ id: categoryId });
    const allProduct =
      categoryId === 1
        ? await categoryRepository
            .createQueryBuilder("category")
            .leftJoinAndSelect("category.products", "products")
            .leftJoinAndSelect("category.children", "children")
            .leftJoinAndSelect("children.products", "childrenProd")
            .leftJoinAndSelect("products.rating", "rating")

            .getMany()
        : await categoryRepository
            .createQueryBuilder("category")
            .leftJoinAndSelect("category.products", "products")
            .leftJoinAndSelect("category.children", "children")
            .leftJoinAndSelect("children.products", "childrenProd")
            .leftJoinAndSelect("products.rating", "rating")

            .where("category.id=:id", { id: categoryId })
            .getMany();

    // const averageRatings = allProduct.map((category) => {
    //   const product = category.products;
    //   const ratings = product.rating.map((rating) => rating.rating);
    //   const avgRating = calculateAverage(ratings);
    //   return {
    //     productId: product.id,
    //     avgRating: avgRating,
    //   };
    // });
    console.log({ allProduct });
    if (allProduct)
      return res.status(200).json({
        message: `Here are the list of products under ${category?.category}`,
        allProduct,
      });
    //     product, allProduct });
    // const product = categoryId
    //   ? await productRepository
    //       .createQueryBuilder("product")
    //       .where("product.categoryId=:categoryId", { categoryId })
    //       .getMany()
    //   : "";
    // console.log("products", product);
    // if (product != "")
    //   return res.status(200).json({
    //     message: `Here are the list of products under ${category?.category}`,
    //     product,
    //   });
    // return res.status(404).json("No products available at this moment ");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { productName, categoryId } = req.body;
    const category = await categoryRepository.findOneBy({ id: categoryId });
    if (category) {
      const productUpdate = await productRepository
        .createQueryBuilder()
        .update(Product)
        .set({ productName: productName, category: category })
        .where("id=:id", { id })
        .execute();
      if (productUpdate) {
        return res.status(200).json({
          message: "Product updated successfully",
          productUpdate,
        });
      }
    }
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ error: err });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteProduct = await productRepository
      .createQueryBuilder()
      .delete()
      .where("id=:id", { id })
      .execute();
    if (deleteProduct) {
      return res
        .status(200)
        .json({ "Product deleted successfully": deleteProduct });
    }
  } catch (error) {
    return res.status(500).json({ " Server Error": error });
  }
};
