import { Router, response } from "express";
//import userManager from "../../data/fs/UserManager.fs.js";
import userManager from "../../data/mongo/managers/UsersManager.mongo.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.mid.js";

const usersRouter = Router();

/////// Usuarios
//ROUTER readALL users CON FILTRO POR QUERY OPCIONAL
usersRouter.get("/", async (req, res, next) => {
  try {
    const { role } = req.query;
    const allUsers = await userManager.read(role);
    if (allUsers) {
      return res.status(200).json({
        response: allUsers,
        role,
        success: true,
        statusCode: 200,
      });
    } else {
      const error = new Error("There are no users");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
});
//ROUTER readID user
usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await userManager.readOne(uid);
    if (one) {
      return res.status(200).json({
        response: one,
        success: true,
        statusCode: 200,
      });
    } else {
      const error = new Error("User Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
});
usersRouter.post("/", uploader.single("photo"), isPhoto, create);
usersRouter.put("/:uid", update);
usersRouter.delete("/:uid", destroy);

//METODO POST
async function create(req, res, next) {
  try {
    const data = req.body;
    console.log(req.file);
    const one = await userManager.create(data);
    return res.json({
      statusCode: 201,
      response: one,
      message: "create user id: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}
//METODO UPDATE
async function update(req, res, next) {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await userManager.update(uid, data);
    return res.json({
      statusCode: 200,
      response: one,
      message: "update user id: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

//METODO DESTROY
async function destroy(req, res, next) {
  try {
    const { uid } = req.params;
    const one = await userManager.destroy(uid);
    return res.json({
      statusCode: 200,
      message: `Product Removed`,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}
export default usersRouter;
