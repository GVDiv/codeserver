import { Router } from "express";
import productManager from "../../data/fs/ProductManager.fs.js";

const productsRouter = Router();
//VISTA DE PRODUCTOS
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productManager.read();
    return res.render("products", { products, title: "Products" });
  } catch (error) {
    return next(error);
  }
});
//VISTA DE DETALLE
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productManager.readOne(pid);
    return res.render("detailsProduct", { product: one, title: "Detail-product" });
  } catch (error) {
    return next(error);
  }
});
export default productsRouter;
