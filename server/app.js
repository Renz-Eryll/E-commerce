import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import connectToDatabase from "./database/mongodb.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the MERN Ecommerce");
});

app.listen(PORT, async () => {
  console.log(`MERN Ecommerce API is running on the http://localhost:${PORT}`);

  await connectToDatabase();
});
export default app;
