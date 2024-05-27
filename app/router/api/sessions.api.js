import { Router } from "express";
import passport from "../../middlewares/passport.mid.js"; // Asegúrate de que la ruta sea correcta
import passportCb from "../../middlewares/passportCb.mid.js";

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  passportCb("register"),
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
  passportCb("login"),
  async (req, res, next) => {
    try {
      return res.cookie("token", req.user.token, { signedCookie: true }).json({
        statusCode: 200,
        message: "Logged in!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.get(
  "/online",
  passportCb("jwt"),
  async (req, res, next) => {
    try {
      if (req.user.online) {
        return res.json({
          statusCode: 200,
          message: "Is online!",
          user_id: req.user._id,
          photo: req.user.photo,
          email: req.user.email,
          role: req.user.role,
        });
      }
      return res.status(401).json({
        statusCode: 401,
        message: "Bad auth!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post("/signout", (req, res, next) => {
  try {
    // Aquí puedes manejar el cierre de sesión eliminando el token del cliente
    res.clearCookie("token");
    return res.json({ statusCode: 200, message: "Signed out!" });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;

