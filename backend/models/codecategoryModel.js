import mongoose from "mongoose";

const codeCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  color: { type: String, default: "#ffffff" },
  imageUrl: { type: String, default: "" },
});

const CodeCategory = mongoose.model("CodeCategory", codeCategorySchema);

export default CodeCategory;
