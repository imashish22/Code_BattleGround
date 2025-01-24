import express from "express";
import {
  
  createCategory,
  deleteCodeCategory,
  getAllCodeCategories,
  
} from "../controllers/codecategoryController.js";

const router = express.Router();

// POST: Create a new code category
router.post("/create", createCategory);

// GET: Fetch all code categories
router.get("/get-all", getAllCodeCategories);

// GET: Fetch a single code category by ID


router.delete("/:id", deleteCodeCategory);

export default router;
