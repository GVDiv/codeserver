import { Schema, model } from "mongoose";

const collection = "sizes";
const schema = new Schema(
  {
    size: { type: String, required: true, unique: true, index: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Size = model(collection, schema);
export default Size;
