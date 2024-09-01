import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cPassword: { type: String, required: true },
    todoData: [{
      item: { type: String, required: true },
      description: { type: String, required: true }
    }]
  },
  { timestamps: true }
);

const model = mongoose.model("user", schema);
export default model;
