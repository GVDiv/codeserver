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

//VISTA PARA AGREGAR PRODUCTOS
productsRouter.get("/real", async (req, res, next) => {
  try {
    return res.render("realProduct", { title: "New product" });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const detailProduct = await productManager.readOne(pid);
    return res.render("detailsProduct", { title: "Detail", detailProduct });
  } catch (error) {
    return next(error);
  }
});
export default productsRouter;
