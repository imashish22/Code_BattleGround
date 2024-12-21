// backend/routes/quizRoutes.js

import express from 'express';
import { checkAnswers, getQuestionsByCategoryAndDifficulty, getQuizQuestions } from '../controllers/quiz_controller.js';

const router = express.Router();

// Route to get quiz questions
router.get('/category/:categoryId/difficulty/:difficultyLevel', getQuestionsByCategoryAndDifficulty);

router.post('/check-answers', checkAnswers);

export default router;
