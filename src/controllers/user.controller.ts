import { datasource } from "../config/ormConfig";
import { User } from "../Entity/user.entity";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import { registerMail } from "../services/email";

dotenv.config();

const userRepository = datasource.getRepository(User);
// console.log(userRepository);

export const register = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const { firstName, lastName, email, password, userType } = req.body;
    // console.log(firstName);
    const user = await userRepository.findOneBy({
      email,
    });
    if (user)
      return res.status(402).json({
        message:
          "Email already exist, you can login if you already have an accoun",
      });

    const hassedPassword = bcrypt.hashSync(password, 12);
    const userTemp: any = new User();
    userTemp.firstName = firstName;
    userTemp.lastName = lastName;
    userTemp.email = email;
    userTemp.password = hassedPassword;
    userTemp.userType = userType;
    const info = await userRepository.save(userTemp);
    // Email sent for verification

    // const secretKey = process.env.SECRET_REGISTER_KEY
    //   ? process.env.SECRET_REGISTER_KEY
    //   : "";
    // console.log({ secretKey });
    // const token = jwt.sign({ email }, secretKey, { expiresIn: "1 day" });
    //  await registerMail(email,token,req.headers.host).then((done:any)=>{
    //   console.log({'Email sent':done})
    //  }).catch((err:any)=>{
    //   console.log({errMessage:err})

    //  })

    return res.status(201).json({ "sucessfully registered": info });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err1: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOneBy({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Email address not found" });
    }
    const payload = {
      id: user.id,
      email: email,
      firstName: user.firstName,
      userType: user.userType,
    };
    const secretKey = process.env.SECRET_REGISTER_KEY
      ? process.env.SECRET_REGISTER_KEY
      : "";
    const accessToken = jwt.sign(payload, secretKey);
    const confirm = bcrypt.compareSync(password, user.password);
    if (!confirm) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    return res
      .status(200)
      .json({ message: "Logged in successfullly", token: accessToken });
  } catch (err) {}
};
