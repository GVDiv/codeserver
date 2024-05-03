import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    email: { type: String, require: true, unique:true, index: true },
    password: { type: String, require: true },
    role: { type: Number, default: 0, index: true },
    photo: { type: String, default:"https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"},
  },
  {
    timestamps: true,
  }
);

const User = model(collection, schema);
export default User;
