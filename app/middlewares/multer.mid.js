import multer from "multer";
import __dirname from "../../utils.js";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, __dirname + "/public/img"),
  //filename: (req, file, cb) => cb(null, crypto.reandomByter(12).toString("hex")),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const uploader = multer({ storage });
export default uploader;
