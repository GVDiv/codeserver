function isProduct(req, res, next) {
  try {
    const { stock, category } = req.body;
    if (!stock) {
      const err = new Error("insert stock");
      err.statusCode = 400;
      throw err;
    }
    if (!category) {
      req.body.category = "other";
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default isProduct;
