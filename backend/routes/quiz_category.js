import express from 'express';
import { getAllCategories } from '../controllers/quiz_categoryController.js';
const router = express.Router();    

router.get('/getall', getAllCategories);


export default router;