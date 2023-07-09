import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// interface RequestUser extends Request{
//     user:any
// }
export const isUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeaders = req.headers.authorization;
    const token = authHeaders && authHeaders.split(" ")[1];
    if (token == null) {
      return res.status(400).json("Unauthorized user");
    } else {
      jwt.verify(
        token,
        process.env.SECRET_REGISTER_KEY ? process.env.SECRET_REGISTER_KEY : "",
        (err, user) => {
          if (err) {
            // console.log(err);
            return res.status(403).json(err);
          }
          // console.log(user);
        //   console.log("user", user);
          // @ts-ignore

          req.user = user;
          // @ts-ignore
          console.log({U:req.user})
          
          

          next();
        }
      );
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
