import { Schema, model, Types } from "mongoose";

const collection = "carts";
const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref:"users", require: true },
    product_id: { type: Types.ObjectId, ref:"products", require: true },
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

schema.pre("find", function () {
  this.populate("user_id", "email, role");
});
schema.pre("find", function () {
  this.populate("product_id");
});

const Cart = model(collection, schema);
export default Cart;
