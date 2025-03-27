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
  password: { type: String, required: false }, // Optional password
  timeLimit: { type: Number, required: true }, // In minutes
  deadline: { type: Date, required: true }, // Submission deadline
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }
});

export default mongoose.model("QuizContest", QuizContestSchema);
