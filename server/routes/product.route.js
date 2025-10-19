import Router from "express";
import {
  getProducts,
  getCategories,
  getFeaturedProducts,
  getProductbyId,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import authorize, { authorizeAdmin } from "../middlewares/auth.middleware.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/featured", getFeaturedProducts);
productRouter.get("/categories", getCategories);
productRouter.get("/category/:category", getProductsByCategory);
productRouter.get("/:id", getProductbyId);

// Admin routes (authentication + admin role required)
productRouter.post("/", authorize, authorizeAdmin, createProduct);
productRouter.put("/:id", authorize, authorizeAdmin, updateProduct);
productRouter.delete("/:id", authorize, authorizeAdmin, deleteProduct);

export default productRouter;
