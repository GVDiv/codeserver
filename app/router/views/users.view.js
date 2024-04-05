import { Router } from "express";
import userManager from "../../data/fs/UserManager.fs.js";

const usersRouter = Router();
//VISTA DE USUARIOS
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await userManager.read();
    return res.render("users", { users, title: "Users" });
  } catch (error) {
    return next(error);
  }
});
//VISTA DE DETALLE USUARIO
usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await userManager.readOne(uid);
    return res.render("detailsUser", { user: one, title: "Detail-user" });
  } catch (error) {
    return next(error);
  }
});
export default usersRouter;
