import { Schema, model } from "mongoose";

const collection = "carts";
const schema = new Schema(
  {
    userId: { type: String, require: true },
    user_id: { type: String, require: true },
    clothe_id: { type: String, require: true },
    quantity: { type: Number, require: true },
    state: {
      type: String,
      enum: ["reserved", "paid", "delivered"],
      default: "reserved",
    },
  },
  {
    timestamps: true,
  }
);

const Cart = model(collection, schema);
export default Cart;
