import express from "express";
import multer from "multer";
import { createQuiz, getQuiz, getTeacherQuizzes } from "../controllers/quizController.js";
import authMiddleware, { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Create Quiz (Upload Excel)
router.post("/create", upload.single("file"),protect, createQuiz);

router.get("/my-quizzes",protect, getTeacherQuizzes);

// ✅ Get Quiz (With Password Check)
router.post("/get/:quizId", getQuiz);

export default router;
