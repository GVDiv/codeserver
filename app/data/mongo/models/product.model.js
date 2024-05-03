import { Schema, Types, model } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, require: true, index: true },
    photo: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20210227/ourlarge/pngtree-error-404-glitch-effect-png-image_2943478.jpg",
    },
    category: { type: String, default: "other" },
    price: { type: Number, default: 9999 },
    stock: { type: Number },
    user_id: {
      type: Types.ObjectId,
      ref: "users",
      index: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("find", function () { this.populate("user_id","email photo -_id") })
schema.pre("findOne", function () { this.populate("user_id","email")})

const Product = model(collection, schema);
export default Product;
