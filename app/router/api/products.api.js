import { Router } from "express";
//import productManager from "../../data/fs/ProductManager.fs.js";
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import  isProduct  from "../../middlewares/isProduct.mid.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.mid.js";

const productsRouter = Router();
//ROUTER readALL PRODUCTS CON FILTRO POR QUERY OPCIONAL
productsRouter.get("/", async (req, res, next) => {
  try {
    const { category } = req.query;
    const allProducts = await productsManager.read(category);
    if (allProducts) {
      return res.status(200).json({
        response: allProducts,
        category,
        success: true,
        statusCode: 200,
      });
    } else {
      const error = new Error("There are no products");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return next(error)
  }
});
//ROUTER readID PRODUCT
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
    if (one) {
      return res.status(200).json({
        response: one,
        success: true,
        statusCode: 200,
      });
    } else {
      const error = new Error("Product Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return next(error)
  }
});
productsRouter.post("/", uploader.single("photo"), isPhoto, isProduct, create);
productsRouter.put("/:pid",uploader.single("photo"), isPhoto,update);
productsRouter.delete("/:pid", destroy);


//METODO POST
async function create (req, res, next) {
  try {
    const data = req.body;
    const one = await productsManager.create(data);
    return res.json({
      statusCode: 201,
      response: one,
      message: "created id: " + one.id,
    });
  } catch (error) {
    return next(error)
  }
};

//METODO UPDATE
async function update (req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.update(pid, data);
    return res.json({
      statusCode: 200,
      response:one,
      message: "update product id: " + one.id,
    });
  } catch (error) {
    return next(error)
  }
};

//METODO DESTROY
async function destroy (req, res, next) {
  try {
    const { pid } = req.params;
    const one = await productsManager.destroy(pid);
    return res.json({
      statusCode: 200,
      message: `Product Removed`,
      response: one,
    });
  } catch (error) {
    return next(error)
  }
};

export default productsRouter;
