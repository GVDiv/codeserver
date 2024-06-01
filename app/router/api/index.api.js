import CustomRouter from "../CustomRouter.js";
import productsRouter from "./products.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./carts.api.js";
import sizesRouter from "./size.api.js";
import categoryRouter from "./category.api.js";
import ticketsRouter from "./tickets.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionsRouter from "./sessions.api.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/products", productsRouter);
    this.use("/users", usersRouter);
    this.use("/carts", cartsRouter);
    this.use("/sizes", sizesRouter)
    this.use("/category", categoryRouter)
    this.use("/tickets", ticketsRouter)
    this.use("/cookies", cookiesRouter)
    this.use("/sessions", sessionsRouter)
  }
}

const apiRouter = new ApiRouter();


export default apiRouter.getRouter();
