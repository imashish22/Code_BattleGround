import mongoose from "mongoose";

const StudentAttemptSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "QuizContest", required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  score: { type: Number, required: true },
  attemptedAt: { type: Date, default: Date.now },
});

export default mongoose.model("StudentAttempt", StudentAttemptSchema);
