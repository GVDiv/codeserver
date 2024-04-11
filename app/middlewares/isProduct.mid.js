function isProduct (req, res, next) {
    try {
        const { stock } = req.body
        if(!stock) {
            const err = new Error("insert stock")
            err.statusCode = 400
            throw err
        } if(!category){
            req.body.category = "Not category"
        }
            return next()
    } catch (error) {
        return next(error)
    }
}

export default isProduct