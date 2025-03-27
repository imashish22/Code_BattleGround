import express from "express";
import { getCurrentUser, login, signup } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js"; // Ensure user is authenticated

const router = express.Router();

// Get current logged-in user
router.get("/me", protect, getCurrentUser);
router.post("/signup", signup);
router.post("/login", login);

export default router;
