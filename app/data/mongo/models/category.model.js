import { Schema, model } from "mongoose";

const collection = "categories";
const schema = new Schema(
  {
    category: { type: String, required: true, unique: true, index: true },
    photo: {
      type: String,
      default:
        "https://www.elegantthemes.com/blog/wp-content/uploads/2017/08/featuredimage.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Category = model(collection, schema);
export default Category;
