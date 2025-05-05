import mongoose from "mongoose";

const roomSubmissionSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "CodeQuestion" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: { type: String },
  testCasesPassed: { type: Number },
  totalTestCases: { type: Number },
  timeTaken: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const RoomSubmission = mongoose.model("RoomSubmission", roomSubmissionSchema);

export default RoomSubmission;
