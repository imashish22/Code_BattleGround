import mongoose from "mongoose";

const QuizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  username: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("QuizResult", QuizResultSchema);
