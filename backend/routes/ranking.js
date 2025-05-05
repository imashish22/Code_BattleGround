import express from 'express';
import { getLeaderboard } from '../controllers/leaderboard.js';

const router = express.Router();

// Route: Get leaderboard by difficulty with optional filters (category, attemptNumber, sortBy)
router.get('/:difficulty', getLeaderboard);

export default router;
