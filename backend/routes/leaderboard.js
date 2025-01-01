import express from 'express';
import { getLeaderboardByDifficulty } from '../controllers/leaderboardController.js';

const router = express.Router();

// Route to fetch leaderboard based on difficulty level
router.get('/:difficulty', getLeaderboardByDifficulty);

export default router;
