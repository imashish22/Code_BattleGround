import express from "express";
import { allcontest, checkAttemptStatus, fetchShuffledQuestions, getQuizAttempts, getQuizDetails, submitQuiz, verifyQuizPassword } from "../controllers/quizcontestController.js";

const router = express.Router();

// ✅ Get all quizzes for students
router.get("/all",allcontest);
// Get quiz details by ID
router.get("/:id", getQuizDetails);

// Verify quiz password
router.post("/:id/verify", verifyQuizPassword);

// Save quiz attempt
router.post("/:quizId/submit", submitQuiz);

// Get all attempts for a specific quiz (for teachers)
router.get("/:quizId/attempts", getQuizAttempts);
router.get("/shuffled-questions/:id", fetchShuffledQuestions);
router.get("/:id/attempt-status/:studentId", checkAttemptStatus);

// router.post("api/quiz-contest/:id/mark-attempted",,markattemptstatu)

export default router;
