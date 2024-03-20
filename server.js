import express from "express";
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
//READ NOTES
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

//READ PRODUCTS
server.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    const allProducts = await productManager.read(category);
    if (allProducts !== 0) {
      return res.status(200).json({
        response: allProducts,
        category,
        success: true,
      });
    } else {
      const error = new Error("Not Found")
      error.status = 404;
      throw error
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
