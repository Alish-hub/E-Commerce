import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  try {
    const client = new Client({
      user: process.env.USER,
      host: process.env.HOST,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: Number(process.env.DB_PORT),
    });
    await client.connect();
    return console.log("Database connected successfully");
    await client.end();
  } catch (err) {
    console.log({ errorMessage: err });
  }
};
