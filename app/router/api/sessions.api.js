import { Router } from "express";
import userManager from "../../data/mongo/managers/UsersManager.mongo.js";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", isValidEmail, async (req, res, next) => {
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
});
sessionsRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const one = await userManager.readByEmail(email);
    if (one.password === password) {
      req.session.email = email;
      req.session.online = true;
      req.session.role = one.role;
      req.session.user_id = one._id;
      return res.json({
        statusCode: 200,
        message: "Logged in!",
        user_id: one._id,
      });
    }
    return res.json({
      statusCode: 401,
      message: "Bad auth!",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/online", async (req, res, next) => {
  try {
    if (req.session.online) {
      return res.json({
        statusCode: 200,
        message: "Is online!",
      });
    }
    return res.json({
      statusCode: 401,
      message: "Bad auth!",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
