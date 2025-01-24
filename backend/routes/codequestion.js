// routes/codeQuestionRoutes.js
import express from "express";
import { getCategories, getCodeQuestionById, getQuestions } from "../controllers/codequestionControllerr.js";

const router = express.Router();

// POST: Add a new code question


router.get("/categories", getCategories);
router.get("/questions", getQuestions);
router.get("/:id", getCodeQuestionById);

export default router;
