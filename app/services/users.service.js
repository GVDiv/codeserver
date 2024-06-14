import Service from "../services/service.js";
import usersManager from "../data/mongo/managers/UsersManager.mongo.js";

const userService = new Service(usersManager);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = userService;
