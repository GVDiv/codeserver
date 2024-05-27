import { Router } from "express";
import passport from "passport"; // Asegúrate de tener passport configurado correctamente
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.get("/", passport.authenticate("jwt", { session: false }), read);
cartsRouter.get("/:cid", passport.authenticate("jwt", { session: false }), readOne);
cartsRouter.post("/", passport.authenticate("jwt", { session: false }), create);
cartsRouter.put("/:cid", passport.authenticate("jwt", { session: false }), update);
cartsRouter.delete("/:cid", passport.authenticate("jwt", { session: false }), destroy);

//CREATE
async function create(req, res, next) {
  try {
    const data = req.body;
    const user_id = req.user._id; // Obtener user_id del JWT
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
    const user_id = req.user._id; // Obtener user_id del JWT
    console.log("User ID from JWT:", user_id); // Línea de depuración

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
    const user_id = req.user._id; // Obtener user_id del JWT
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
    const user_id = req.user._id; // Obtener user_id del JWT
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
