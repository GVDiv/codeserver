import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy } from "../../controllers/users.controller.js";
import isPhoto from "../../middlewares/isPhoto.mid.js";
import uploader from "../../middlewares/multer.mid.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], uploader.single("photo"), isPhoto, create);
    this.read("/", ["USER", "ADMIN", "PUBLIC"], read);
    this.read("/:uid", ["USER", "ADMIN"], readOne);
    this.update("/:uid", ["USER", "ADMIN"], update);
    this.destroy("/:uid", ["USER", "ADMIN"], destroy);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();