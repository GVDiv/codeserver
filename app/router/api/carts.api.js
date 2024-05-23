import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.get("/", read);
cartsRouter.get("/:cid", readOne);
cartsRouter.post("/", create);
cartsRouter.put("/:cid", update);
cartsRouter.delete("/:cid", destroy);

//CREATE
async function create(req, res, next) {
  try {
    const data = req.body;
    const user_id = req.session.user_id;
    const one = await cartsManager.create({ ...data, user_id }); // Asociar el carrito al usuario
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
    const user_id = req.session.user_id; // Obteniendo user_id desde la sesión
    console.log("User ID from session:", user_id); // Línea de depuración

    if (user_id) {
      const all = await cartsManager.read({ user_id }); // Filtrando por user_id
      if (all.length > 0) {
        return res.json({
          statusCode: 200,
          message: "Read",
          response: all,
        });
      } else {
        return res.json({
          statusCode: 200,
          message: "No carritos found for this user",
          response: [],
        });
      }
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
    const user_id = req.session.user_id; // Obteniendo user_id desde la sesión
    const { cid } = req.params; // Obtener el ID del carrito de los parámetros de la ruta
    const one = await cartsManager.readOne({ _id: cid, user_id }); // Filtrar por user_id y _id del carrito
    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
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
    const user_id = req.session.user_id; // Obtenemos el ID del usuario de la sesión
    // Eliminamos todos los productos del carrito asociados al usuario
    const result = await cartsManager.destroyAll(user_id);
    return res.json({
      statusCode: 200,
      message: `Cart Cleared`,
      response: result,
    });
  } catch (error) {
    return next(error);
  }
}


export default cartsRouter;

