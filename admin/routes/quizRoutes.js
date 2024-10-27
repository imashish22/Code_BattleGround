// quizRoutes.js
import express from 'express';
import {
    createQuiz,                  // For adding a new quiz question
    getAllQuestions,             // For fetching all quiz questions
    getQuestionsByDifficulty,     // For fetching questions filtered by difficulty
} from '../controllers/quizController.js';

const router = express.Router();

// Route to create a new quiz question
router.post('/', createQuiz); // Create quiz question

// Route to get all quiz questions
router.get('/', getAllQuestions); // Get all questions

// Route to get questions by difficulty
router.get('/difficulty/:level', getQuestionsByDifficulty); // Get questions by difficulty

export default router;
