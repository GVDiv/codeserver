import { Router } from "express";
//import usersManager from "../../data/fs/UserManager.fs.js";
import userManager from "../../data/mongo/managers/UsersManager.mongo.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await userManager.read()
    return res.render("users", { users, title: "Users" });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("register", { title: "Register" });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/login", async (req, res, next) => {
  try {
    return res.render("login", { title: "Login" });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const profile = await userManager.readOne(uid);
    return res.render("detailsUser", { title: "user detail", profile });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;