// backend/routes/quizRoutes.js

import express from 'express';
import { getQuizQuestions } from '../controllers/quiz_controller.js';

const router = express.Router();

// Route to get quiz questions
router.get('/:category/:difficulty', getQuizQuestions);

export default router;
