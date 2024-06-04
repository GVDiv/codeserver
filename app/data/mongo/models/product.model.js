import { Schema, Types, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, require: true, index: true },
    photo: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20210227/ourlarge/pngtree-error-404-glitch-effect-png-image_2943478.jpg",
    },
    category_id: {
      type: Types.ObjectId,
      ref: "categories",
      required: true,
      index: true,
    },
    size_id: {
      type: Types.ObjectId,
      ref: "sizes",
      index: true,
      required: true,
    },
    price: { type: Number, default: 9999 },
    stock: { type: Number },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);

schema.pre("find", function () {
  this.populate("category_id size_id");
});
schema.pre("findOne", function () {
  this.populate("size_id category_id");
});

const Product = model(collection, schema);
export default Product;
