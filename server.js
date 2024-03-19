import express from "express";

//SERVER
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

//MIDLEWARES

server.use(express.urlencoded({ extended: true }));

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

//un parametro
server.get("/api/notes/:text", async (req, res) => {
  try {
    const { text } = req.params;
    return res.status(201).json({
        respose: text,
        success: true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      response: "ERROR",
      success: false,
    });
  }
});
