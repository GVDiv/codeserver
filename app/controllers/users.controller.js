import { createService, destroyService, readOneService, readService, updateService } from "../services/users.service.js";

class UserController {
  async create(req, res, next) {
    try {
      const data = req.body;
      const one = await createService(data)
      return res.message201("CREATED ID: " + one.id);
    } catch (error) {
      return next(error);
    }
  }

  async read(req, res, next) {
    try {
      const { role } = req.query;
      const all = await readService(role);
      if (all.length > 0) {
        return res.response200(all);
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async readOne(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await readOneService(uid);
      if (one) {
        return res.response200(one);
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { uid } = req.params;
      const data = req.body;
      const one = await updateService(uid, data);
      if (one) {
        return res.response200(one);
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
  async destroy(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await destroyService(uid);
      if (one) {
        return res.response200(one);
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
}

const userController = new UserController();
const { create, read, readOne, update, destroy } = userController;
export { create, read, readOne, update, destroy };
