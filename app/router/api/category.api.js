import CustomRouter from "../CustomRouter.js";
import categoryManager from "../../data/mongo/managers/CategoryManager.mongo.js";

class CategoryRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN"], this.createCategory);
    this.read("/", ["PUBLIC"], this.readCategories);
  }

  async createCategory(req, res, next) {
    try {
      const data = req.body;
      const one = await categoryManager.create(data);
      res.message201("Category created", one);
    } catch (error) {
      next(error);
    }
  }

  async readCategories(req, res, next) {
    try {
      const all = await categoryManager.read();
      res.response200(all);
    } catch (error) {
      next(error);
    }
  }
}

const categoryRouter = new CategoryRouter();
export default categoryRouter.getRouter();
