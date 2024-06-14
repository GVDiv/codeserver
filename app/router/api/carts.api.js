import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy } from "../../controllers/carts.controller.js"
class CartsRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "ADMIN"], create);
    this.read("/", ["USER", "ADMIN"], read);
    this.read("/:nid", ["USER", "ADMIN"], readOne);
    this.update("/:nid", ["USER", "ADMIN"], update);
    this.destroy("/:nid", ["USER", "ADMIN"], destroy);
  }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();

