import express from 'express';
import { getCompletedQuestions } from '../controllers/completedController.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Use your middleware

const router = express.Router();

router.get("/completed/:userId", getCompletedQuestionsByUser);

export default router;  
