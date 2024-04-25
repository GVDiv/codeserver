import "dotenv/config.js";
import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
//console.log(process.env.MONGO_URI)

import indexRouter from "./app/router/index.router.js";
import socketCb from "./app/router/index.socket.js";
import errorHandler from "./app/middlewares/errorHandler.mid.js";
import pathHanddler from "./app/middlewares/pathHanddler.mid.js";
import __dirname from "./utils.js";
import dbConnect from "./app/utils/dbConnect.util.js";

//SERVER
const server = express();
const port = process.env.PORT || 9000;
const ready = async () => {
  console.log("server ready on port " + port);
  await dbConnect()
};
//CREO UN SERVIDOR DE NODE, CON LAS CONFIGURACIONES DEL SERVIDOR DE EXPRESS
const nodeServer = createServer(server);
//CREO UN SERVIDOR TCP, CONSTRUYENDO UNA INSTANCIA DEL SERVIDOR DE SOCKET, PASANDO COMO BASE EL SERVIDOR DE NODE
const socketServer = new Server(nodeServer);
nodeServer.listen(port, ready);
socketServer.on("connection", socketCb);

//MIDLEWARES
server.use(express.json()); //LEE Y TRANSFORMA A FORMATO JSON
server.use(express.urlencoded({ extended: true })); //OBLIGO A MI SERVIDOR A USAR LA FUNCION ENCARGADA DE LEER PARAMETROS
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

//ROUTER
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHanddler);
//MOTOR DE PLANTILLAS
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/app/views");


