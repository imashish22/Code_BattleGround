import express from 'express';
import { getCompletedQuestionsByUser } from '../controllers/completedController.js';

const router = express.Router();

router.get('/completed-questions/:userId', getCompletedQuestionsByUser);

export default router;
