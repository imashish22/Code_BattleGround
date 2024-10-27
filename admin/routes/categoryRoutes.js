import express from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategory } from '../controllers/categoryController.js';


const router = express.Router();

// POST: Create a new category
router.get('/getall',getAllCategories)

router.post('/create', createCategory);

router.get('/:id',getCategory)


router.delete('/:id', deleteCategory)

// You can add more routes for getting categories later

// Export the router
export default router;
