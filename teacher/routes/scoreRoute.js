import express from "express";  
import { getAttemptedUsers } from "../controllers/scoreController.js";


const router = express.Router();

router.get("/contest/:contestId/attempted-users", getAttemptedUsers);


export default router;