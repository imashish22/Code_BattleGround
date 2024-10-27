import express from 'express';
import { addQuestion, getAllQuestions } from '../controllers/questionController.js';
import { getQuestionsByCategory } from '../controllers/questionController.js';
import { getQuestionsByDifficulty } from '../controllers/questionController.js';
import { getQuestionsByCategoryAndDifficulty } from '../controllers/questionController.js';

const router = express.Router();

// POST: Add a new quiz question
router.post('/add', addQuestion);

// GET: Retrieve all questions
router.get('/getall', getAllQuestions);

router.get('/category/:categoryId', getQuestionsByCategory);
router.get('/difficulty/:difficultyLevel', getQuestionsByDifficulty);
router.get('/category/:categoryId/difficulty/:difficultyLevel', getQuestionsByCategoryAndDifficulty);

export default router;
