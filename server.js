import express, { json } from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";

import notesManager from "./app/data/fs/NotesManager.js";
import indexRouter from "./app/router/index.router.js";
import errorHandler from "./app/middlewares/errorHandler.js";
import pathHanddler from "./app/middlewares/pathHanddler.mid.js";
import __dirname from "./utils.js";

//SERVER
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);
//MIDLEWARES
server.use(express.json()); //LEE Y TRANSFORMA A FORMATO JSON
server.use(express.urlencoded({ extended: true }));//OBLIGO A MI SERVIDOR A USAR LA FUNCION ENCARGADA DE LEER PARAMETROS
server.use(morgan("dev"));

//ROUTER
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHanddler);
//MOTOR DE PLANTILLAS
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/app/views");

/*-------------- NOTES ---------------- */

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

//READ ALLNOTES/QUERY OPCIONAL 
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

//READONE ID NOTE
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

//READONE 2 PARAMETROS
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
