import CustomRouter from "../CustomRouter.js";
import sizeManager from "../../data/mongo/managers/SizesManager.mongo.js";

class SizesRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN"], create);
    this.read("/", ["PUBLIC"], read);
  }
}

const sizesRouter = new SizesRouter();
export default sizesRouter.getRouter();

async function create(req, res, next) {
  try {
    const data = req.body;
    const size = await sizeManager.create(data);
    return res.json({
      statusCode: 201,
      message: "created",
      response: size
    });
  } catch (error) {
    return next(error);
  }
}

async function read(req, res, next) {
  try {
    const sizes = await sizeManager.read();
    if (sizes.length > 0) {
      return res.json({
        statusCode: 200,
        message: "read all sizes",
        response: sizes
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
