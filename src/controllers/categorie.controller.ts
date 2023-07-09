import { Request, Response } from "express";
import { datasource } from "../config/ormConfig";
import { Category } from "../Entity/category.entity";
import { Product } from "../Entity/product.entity";
import { Any, IsNull } from "typeorm";

const categoryRepository = datasource.getRepository(Category);
const productRepository = datasource.getRepository(Product);

export const createCategory = async (req: Request, res: Response) => {
  try {
    // var product;
    const { category, parentId } = req.body;

    const category1 = new Category();
    category1.category = category;
    if (parentId) {
      const parent = await categoryRepository.findOneBy({ id: parentId });
      // console.log({ parent });
      if (parent) {
        // console.log("hit");
        category1.parent = parent;
      }
    }

    // if (productId) {
    //   product = await productRepository.findOneBy({ id: productId });
    // }
    // // const product =productId?await productRepository.findOneBy({id:productId}):""
    // console.log(product)
    // if (product) {
    //   category1.products.push(product);
    // }

    // product?category1.products=product:" "
    console.log({ category1 });
    await categoryRepository
      .save(category1)
      .then((data) => {
        return res
          .status(201)
          .json({ message: "category created successfully", data });
      })
      .catch((error) => {
        return res
          .status(400)
          .json({ errormessage: "Unable to create category", error });
      });
  } catch (err) {
    return res.status(500).json({errorMessage:err});
  }
};


export const updateCategory =async(req:Request,res:Response)=>{
  try{
    const{id}=req.params;
    


  }catch(err){
    return res.status(500).json(err);
  }
}