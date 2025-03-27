import mongoose from "mongoose";

const AttemptSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "QuizContest", required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: { type: Array, required: true },
  score: { type: Number, required: true },
  attemptedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Attempt", AttemptSchema);
