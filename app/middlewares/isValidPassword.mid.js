import userManager from "../data/mongo/managers/UsersManager.mongo.js";
import { verifyHash } from "../utils/hash.util.js";

async function isValidPassword(req, res, next) {
  try {
    const { email, password } = req.body;
    const one = await userManager.readByEmail(email);
    const verify = verifyHash(password, one.password);
    if (verify) {
      return next();
    }
    const error = new Error("invalid credentials");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
}

export default isValidPassword;
