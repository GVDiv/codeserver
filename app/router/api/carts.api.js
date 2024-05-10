import { Router, response } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.get("/", read);
cartsRouter.post("/", create);
cartsRouter.put("/:cid", update);
cartsRouter.delete("/:cid", destroy);

//CREATE
async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await cartsManager.create(data);
    return res.json({
      statusCode: 201,
      message: "Create",
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}
//READ
async function read(req, res, next) {
  try {
    const { user_id } = req.query;
    if (user_id) {
      const all = await cartsManager.read({ user_id });
      if (all.length > 0) {
        return res.json({
          statusCode: 200,
          message: "Read",
          response: all,
        });
      }
    }
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    return next(error);
  }
}
//UPDATE
async function update(req, res, next) {
  try {
    const { cid } = req.params;
    const data = req.body;
    const one = await cartsManager.update(cid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}
//DESTROY
async function destroy(req, res, next) {
  try {
    const { cid } = req.params;
    const one = await cartsManager.destroy(cid);
    return res.json({
      statusCode: 200,
      message: `Product Removed`,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

export default cartsRouter;
