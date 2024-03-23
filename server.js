import express, { json } from "express";
import notesManager from "./app/fs/NotesManager.js";
import productManager from "./app/fs/ProductManager.fs.js";

//SERVER
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

//MIDLEWARES
server.use(express.urlencoded({ extended: true }));
//OBLIGO A MI SERVIDOR A USAR LA FUNCION ENCARGADA DE LEER PARAMETROS
server.use(express.json());
//LEE Y TRANSFORMA A FORMATO JSON

//ROUTER
server.get("/", async (requerimientos, respuesta) => {
  try {
    return respuesta.status(200).json({
      response: "CODER API",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return respuesta
      .status(500)
      .json({ response: "CODER API ERROR", success: false });
  }
});

//READ ALL PRODUCTS CON FILTRO POR QUERY OPCIONAL
server.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    const allProducts = await productManager.read(category);
    if (allProducts) {
      return res.status(200).json({
        response: allProducts,
        category,
        success: true,
        statusCode: 200,
      });
    } else {
      const error = new Error("There are no products");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.status || 404).json({
      response: error.message,
      success: false,
      statusCode: error.status || 404,
    });
  }
});

//READONE ID PRODUCT
server.get("/api/products/:nid", async (req, res) => {
  try {
    const { nid } = req.params;
    const one = await productManager.readOne(nid);
    if (one) {
      return res.status(200).json({
        response: one,
        success: true,
        statusCode: 200,
      });
    } else {
      const error = new Error("Product Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    //const statusCode = error.statusCode || 500;
    return res.status(error.status || 404).json({
      response: error.message,
      success: false,
      statusCode: error.status || 404,
    });
  }
});

/*-------------- NOTES ---------------- */

//READ NOTES CON FILTRO QUERY
server.get("/api/notes", async (req, res) => {
  try {
    const { category } = req.query;
    const all = await notesManager.read(category);
    if (all !== 0) {
      return res.status(200).json({
        response: all,
        category,
        success: true,
      });
    } else {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.status).json({
      response: error.message,
      success: false,
    });
  }
});

//1 PARAMETRO
server.get("/api/notes/:nid", async (req, res) => {
  try {
    const { nid } = req.params;
    const one = await notesManager.readOne(nid);
    if (one) {
      return res.status(200).json({
        response: one,
        success: true,
      });
    } else {
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.status).json({
      response: error.message,
      success: false,
    });
  }
});

//2 PARAMETROS
server.get("/api/notes/:text/:category", async (req, res) => {
  try {
    const { text, category } = req.params;
    const data = { text, category };
    const one = await notesManager.create(data);
    return res.status(201).json({
      respose: one,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      response: "ERROR",
      success: false,
    });
  }
});

//METODO POST
const create = async (req, res) => {
  try {
    const data = req.body;
    const one = await productManager.create(data);
    return res.json({
      statusCode: 201,
      message: "created id: " + one.id,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "api error",
    });
  }
};

//METODO UPDATE
const update = async (req, res) => {
  try {
    const { nid } = req.params;
    const data = req.body;
    const one = await productManager.update(nid, data);
    return res.json({
      statusCode: 200,
      message: "update id: " + one.id,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "api error",
    });
  }
};

server.post("/api/products", create);
server.put("/api/products/:nid", update);
