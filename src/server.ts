import express from "express";
import { connectDB } from "./postgres/connect";
import dotenv from "dotenv";
import router from "./routes/user.route";
import morgan from "morgan";
import route from "./routes/product.route";
import { datasource } from "./config/ormConfig";
import route1 from "./routes/category.route";
import wishRoute from "./routes/wish.route";
import cartRoute from "./routes/cart.route";
import orderRoute from "./routes/order.route";
import ratingRoute from "./routes/rating.route";
dotenv.config();
const app = express();
app.use(morgan("combined"));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/api", router);
app.use("/product", route);
app.use("/create", route1);
app.use("/wish", wishRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/rating", ratingRoute);

app.listen(PORT, async () => {
  await datasource
    .initialize()
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((err) => console.log({ erroreMessage: err }));
  console.log(`server is listening to port ${PORT} `);
});
// oxcdndnowttjrurb
