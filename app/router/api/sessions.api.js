import { Router } from "express";
import userManager from "../../data/mongo/managers/UsersManager.mongo.js";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPassword.mid.js";

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  isValidData,
  isValidEmail,
  async (req, res, next) => {
    try {
      const data = req.body;
      const one = await userManager.create(data);
      return res.json({
        statusCode: 201,
        message: "Registered",
      });
    } catch (error) {
      return next(error);
    }
  }
);
sessionsRouter.post(
  "/login",
  isValidUser,
  isValidPassword,
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const one = await userManager.readByEmail(email);
      req.session.email = email;
      req.session.online = true;
      req.session.role = one.role;
      req.session.photo = one.photo;
      req.session.user_id = one._id;
      return res.json({
        statusCode: 200,
        message: "Logged in!",
        user_id: one._id,
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.get("/online", async (req, res, next) => {
  try {
    if (req.session.online) {
      if(req.session.user_id){
        return res.json({
          statusCode: 200,
          message: "Is online!",
          user_id: req.session.user_id,
          photo: req.session.photo,
          email: req.session.email,
          role: req.session.role
        });
      }
    }
    return res.json({
      statusCode: 401,
      message: "Bad auth!",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/signout", (req, res, next) => {
  try {
    req.session.destroy();
    return res.json({ statusCode: 200, message: "Signed out!" });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
