import passport from "passport";

// Función que devuelve un middleware de autenticación de passport según la estrategia especificada
function passportCb(strategy) {
  return (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (user) {
        req.user = user;
        return next();
      }
      return res.status(info.statusCode || 401).json({
        statusCode: info.statusCode || 401,
        message: info.message || "Authentication failed",
      });
    })(req, res, next);
  };
}

export default passportCb;
