import userManager from "../data/mongo/managers/UsersManager.mongo.js";

async function isValidData(req, res, next) {
  try {
    const { email, password, role, photo } = req.body;

    // Verificar que email, password y role estén presentes
    if (!email || !password || role === undefined) {
      const error = new Error("Please enter email, password, and role!");
      error.statusCode = 400;
      throw error;
    }

    // Convertir role a número antes de la verificación
    const roleNumber = Number(role);

    // Verificar que role sea un número y que esté entre 0 y 1
    if (isNaN(roleNumber) || (roleNumber !== 0 && roleNumber !== 1)) {
      const error = new Error("Role must be either 0 or 1!");
      error.statusCode = 400;
      throw error;
    }

    // Verificar que photo sea una cadena, si se proporciona
    if (photo !== undefined && typeof photo !== "string") {
      const error = new Error("Photo must be a string!");
      error.statusCode = 400;
      throw error;
    }

    // Actualizar el rol a la versión numérica
    req.body.role = roleNumber;

    return next();
  } catch (error) {
    return next(error);
  }
}

export default isValidData;
