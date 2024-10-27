import express from 'express';
import { loginAdmin } from '../controllers/adminController.js';

const router = express.Router();

// Admin login route
router.post('/login', loginAdmin);

export default router;
