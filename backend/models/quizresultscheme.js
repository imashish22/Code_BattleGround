import mongoose from "mongoose";

const QuizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  username: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "Quiz" }, // NEW
  score: { type: Number, required: true },
  attemptNumber: { type: Number, required: true }, // NEW
  isFirstAttempt: { type: Boolean, default: false }, // NEW
  timeTaken: { type: Number }, // NEW (optional)
  accuracy: { type: Number }, // NEW (optional)
  date: { type: Date, default: Date.now },
});

export default mongoose.model("QuizScore", QuizResultSchema);
