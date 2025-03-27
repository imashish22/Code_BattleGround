import mongoose from "mongoose";

const QuizContestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  password: { type: String, required: false },
  timeLimit: { type: Number, required: true },
  deadline: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
});

export default mongoose.model("QuizContest", QuizContestSchema);
