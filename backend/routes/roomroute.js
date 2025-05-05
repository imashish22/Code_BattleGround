import express from 'express';
import { createRoom, joinRoom, selectQuestions, getLeaderboard, getRoom } from '../controllers/roomcontroller.js';
import { roomexecuteCode } from '../controllers/roomcodeexecution.js';

const router = express.Router();

router.post('/create', createRoom);
router.post('/join', joinRoom);
router.post('/select-questions', selectQuestions);
router.get('/room/:roomId', getRoom);
router.get('/leaderboard/:roomId', getLeaderboard);
router.post('/room/:roomId/execute',roomexecuteCode)
export default router;
