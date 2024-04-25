import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, require: true },
    photo: { type: String },
    category: { type: String, default: "other" },
    price: { type: Number, default: 9999 },
    stock: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Product = model(collection, schema);

export default Product;
