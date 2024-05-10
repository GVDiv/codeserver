import { Router, response } from "express";
import sizeManager from "../../data/mongo/managers/SizesManager.mongo.js";

const sizesRouter = Router();
//CREATE
sizesRouter.post("/", async(req, res, next) => {
    try {
        const data = req.body;
        const size = await sizeManager.create(data);
        return res.json({
            statusCode: 201,
            message: "created",
            response: size
        })
    } catch (error) {
        return next(error)
    }
})
//READ
sizesRouter.get("/", async(req, res, next) => {
    try {
        const sizes = await sizeManager.read();
        if(sizes.length > 0){
            return res.json({
                statusCode: 200,
                message: "read all sizes",
                response: sizes
            })
        }
    } catch (error) {
        return next(error)
    }
})

export default sizesRouter