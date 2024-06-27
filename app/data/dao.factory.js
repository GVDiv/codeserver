import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/dbConnect.util.js";

const persistence = argsUtil.persistence;
let dao = {};
//objeto que voy a cargar dinamicamente con las importaciones de los managers que correspondan
switch (persistence) {
  case "memory":
    console.log("connected to memory");
    const { default: usersManagerMem } = await import(
      "./memory/UserManager.memory.js"
    );
    //const { default: productsManagerMem } = await import(
    //  "./memory/ProductManager.memory.js"
    //);
    //const { default: cartsManagerMem } = await import(
    //  "./memory/CartManager.memory.js"
    //);
    dao = {
      users: usersManagerMem,
      //products: productsManagerMem,
      //carts: cartsManagerMem,
    };
    break;
  case "fs":
    console.log("connected to file system");
    const { default: usersManagerFs } = await import(
      "./fs/UserManager.fs.js"
    );
    //const { default: productsManagerFs } = await import(
    //  "./fs/ProductManager.fs.js"
    //);
    //const { default: cartsManagerFs } = await import(
    //  "./fs/CartManager.fs.js"
    //);
    dao = {
      users: usersManagerFs,
      //products: productsManagerFs,
      //carts: cartsManagerFs,
    };
    break;
  default:
    console.log("connected to database");
    dbConnect();
    const { default: usersManagerMongo } = await import(
      "./mongo/managers/UsersManager.mongo.js"
    );
    //const { default: productsManagerMongo } = await import(
    //  "./mongo/managers/ProductsManager.mongo.js"
    //);
    //const { default: cartsManagerMongo } = await import(
    //  "./mongo/managers/CartsManager.mongo.js"
    //);
    dao = {
      users: usersManagerMongo,
      //products: productsManagerMongo,
      //carts: cartsManagerMongo,
    };
    //por defecto mongo
    break;
}

export default dao;
