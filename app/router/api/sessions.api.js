import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  passport.authenticate("register", { session: false }),
  async (req, res, next) => {
    try {
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
  passport.authenticate("login", { session: false }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.get("/online", async (req, res, next) => {
  try {
    if (req.session.online) {
      if (req.session.user_id) {
        console.log("Session User ID:", req.session.user_id); // Línea de depuración
        return res.json({
          statusCode: 200,
          message: "Is online!",
          user_id: req.session.user_id,
          photo: req.session.photo,
          email: req.session.email,
          role: req.session.role,
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
    if (req.session.email) {
      req.session.destroy();
      return res.json({ statusCode: 200, message: "Signed out!" });
    }
    const error = new Error("invalid credentials from signout!");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
