import { Router } from "express";
import productManager from "../../data/fs/ProductManager.fs.js";

const productsRouter = Router();
//ROUTER readALL PRODUCTS CON FILTRO POR QUERY OPCIONAL
productsRouter.get("/", async (req, res, next) => {
  try {
    const { category } = req.query;
    const allProducts = await productManager.read(category);
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
    const one = await productManager.readOne(pid);
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
productsRouter.post("/", create);
productsRouter.put("/:pid", update);
productsRouter.delete("/:pid", destroy);


//METODO POST
async function create (req, res, next) {
  try {
    const data = req.body;
    const one = await productManager.create(data);
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
    const one = await productManager.update(pid, data);
    return res.json({
      statusCode: 200,
      response:one,
      message: "update id: " + one.id,
    });
  } catch (error) {
    return next(error)
  }
};

//METODO DESTROY
async function destroy (req, res, next) {
  try {
    const { pid } = req.params;
    const one = await productManager.destroy(pid);
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
