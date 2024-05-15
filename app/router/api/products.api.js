import { Router, response } from "express";
//import productManager from "../../data/fs/ProductManager.fs.js";
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import isProduct from "../../middlewares/isProduct.mid.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.mid.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";

const productsRouter = Router();

productsRouter.get("/", read);
productsRouter.get("/paginate", paginate);
productsRouter.get("/:pid", readOne);
productsRouter.post("/", isValidAdmin ,uploader.single("photo"), isPhoto, isProduct, create);
productsRouter.put("/:pid", uploader.single("photo"), isPhoto, update);
productsRouter.delete("/:pid", destroy);

//METODO POST
async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await productsManager.create(data);
    return res.json({
      statusCode: 201,
      response: one,
      message: "created id: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}
//READ
async function read(req, res, next) {
  try {
    const { category } = req.query;
    const all = await productsManager.read(category);
    if (all.length > 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}
//READONE
async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
      });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}
//METODO PAGINATE
async function paginate(req, res, next) {
  try {
    const filter = {};
    const opts = {};
    if(req.query.limit){
      opts.limit = req.query.limit
    }
    if(req.query.page) {
      opts.page = req.query.page
    }
    if(req.query.user_id){
      filter.user_id = req.query.user_id
    }
    const all = await productsManager.paginate({ filter, opts });
    return res.json({
      statusCode: 200,
      response: all.docs,
      info: {
        page: all.page,
        totalPages: all.totalPages,
        totalDocs: all.totalDocs,
        limit: all.limit,
        prevPage: all.prevPage,
        nextPage: all.nextPage,
      },
    });
  } catch (error) {
    return next(error);
  }
}
//METODO UPDATE
async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.update(pid, data);
    return res.json({
      statusCode: 200,
      response: one,
      message: "update product id: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}
//METODO DESTROY
async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await productsManager.destroy(pid);
    return res.json({
      statusCode: 200,
      message: `Product Removed`,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

export default productsRouter;
