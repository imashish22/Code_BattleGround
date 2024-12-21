import express from "express";
import { createQuizResult, getUserQuizResults } from './../controllers/quizScore_controller.js';
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create", createQuizResult); // POST /api/quiz-results
router.get("/:userId", getUserQuizResults); // GET /api/quiz-results/:userId

export default router;
