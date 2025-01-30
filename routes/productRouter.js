import express from "express";
import { addProduct, deleteProduct, getProducts, uodateProduct } from "../controllers/productController.js";


const productRouter = express.Router();

productRouter.post("/",addProduct);
productRouter.get("/",getProducts);
productRouter.put("/:key",uodateProduct);
productRouter.delete("/:key",deleteProduct)

export default productRouter;