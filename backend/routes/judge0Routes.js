import express from "express";
import { executeCode } from './../controllers/judge0Controller.js';

const router = express.Router();

// router.post("/run", runCode);
router.post('/execute/:id', executeCode);

export default router;