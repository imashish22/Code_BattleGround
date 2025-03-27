


import QuizContest from "../models/QuizContest.js";
import Attempt from "../models/Attempt.js";
import Teacher from "../models/TeacherModel.js";
import bcrypt from "bcryptjs";

// Fetch all quiz contests
export const allcontest = async (req, res) => {
  try {
    const quizzes = await QuizContest.find()
      .populate("createdBy", "name email")
      .select("title description timeLimit deadline _id createdBy");

    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch quiz details
export const getQuizDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await QuizContest.findById(id).populate("createdBy", "name");

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz details:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Verify quiz password
export const verifyQuizPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const quiz = await QuizContest.findById(id).select("password");

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    if (!quiz.password) {
      return res.status(200).json({ message: "No password required", quizId: quiz._id });
    }

    const isMatch = await bcrypt.compare(password, quiz.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.status(200).json({ message: "Password verified", quizId: quiz._id });
  } catch (error) {
    console.error("Error verifying password:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Check if a student has already attempted a quiz
export const checkAttemptStatus = async (req, res) => {
  try {
    const { quizId, studentId } = req.params;

    const existingAttempt = await Attempt.findOne({ quizId, studentId });

    res.status(200).json({ attempted: !!existingAttempt });
  } catch (error) {
    console.error("Error checking attempt status:", error);
    res.status(500).json({ error: "Server error" });
  }
};



// Submit a quiz attempt
export const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { studentId, answers, score } = req.body;

    const quiz = await QuizContest.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const existingAttempt = await Attempt.findOne({ quizId, studentId });
    if (existingAttempt) {
      return res.status(400).json({ error: "You have already attempted this quiz." });
    }

    const attempt = new Attempt({
      quizId,
      studentId,
      answers,
      score,
      attemptedAt: new Date(),
    });

    await attempt.save();

    res.status(200).json({ message: "Quiz submitted successfully", attempt });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch attempts for a teacher
export const getQuizAttempts = async (req, res) => {
  try {
    const { quizId } = req.params;
    const attempts = await Attempt.find({ quizId }).populate("studentId", "name email");

    res.status(200).json(attempts);
  } catch (error) {
    console.error("Error fetching attempts:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Shuffle function
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Fetch shuffled questions for a student
export const fetchShuffledQuestions = async (req, res) => {
  try {
    const { id } = req.params;

    const quizContest = await QuizContest.findById(id);

    if (!quizContest) {
      return res.status(404).json({ message: "Quiz contest not found" });
    }

    let shuffledQuestions = shuffleArray([...quizContest.questions]);

    shuffledQuestions = shuffledQuestions.map((question) => ({
      ...question.toObject(),
      options: shuffleArray([...question.options]),
    }));
    let timelimit = quizContest.timeLimit;  
    res.json({shuffledQuestions, timelimit});
  } catch (error) {
    console.error("Error fetching shuffled questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};
