// routes/codeQuestionRoutes.js
import express from "express";
import { addCodeQuestion, filterCodeQuestions, getAllCodeQuestions } from "../controllers/codequestionController.js";

const router = express.Router();

// POST: Add a new code question
router.post("/add", addCodeQuestion);

// GET: Fetch all code questions
router.get("/all", getAllCodeQuestions);

router.get('/filter', filterCodeQuestions);

export default router;
