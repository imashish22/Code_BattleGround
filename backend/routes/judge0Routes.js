import express from "express";
import { executeCode } from './../controllers/judge0Controller.js';

import { getCompletedCodingQuestionsByUser } from '../controllers/completedController.js';
import { verifyToken } from '../middleware/verifyToken.js'; // Use your middleware

const router = express.Router();

router.get("/completed/:userId", getCompletedCodingQuestionsByUser);

// router.post("/run", runCode);
router.post('/execute', executeCode);

export default router;