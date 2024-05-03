import Manager from "../Manager.mongo.js";
import Category from "../models/category.model.js";

const categoryManager = new Manager(Category);

export default categoryManager;
