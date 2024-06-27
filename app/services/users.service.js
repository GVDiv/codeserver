import Service from "../services/service.js";
//import usersManager from "../data/mongo/managers/UsersManager.mongo.js";
import dao from "../data/dao.factory.js";

const { users } = dao;

const userService = new Service(users);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = userService;
