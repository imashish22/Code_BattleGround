import QuizContest from "../models/QuizContest.js";
import Attempt from "../models/Results.js";
import User from "../models/student.js"; // Import User model

export const getAttemptedUsers = async (req, res) => {
  try {
    const { contestId } = req.params;

      const quiztitle = await QuizContest.findById(contestId).select("title");

      if (!quiztitle) {
        return res.status(404).json({ message: "Quiz not found" });
      }
    // Fetch attempts for this quiz
    const attempts = await Attempt.find({ quizId: contestId })
      .populate("studentId", "name email") // Now referencing "User" instead of "Student"
      .select("studentId score attemptedAt"); 

    res.status(200).json(attempts);
  } catch (error) {
    console.error("Error fetching attempted users:", error);
    res.status(500).json({ message: "Error fetching attempted users." });
  }
};
