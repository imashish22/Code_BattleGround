  

import QuizScore from "../models/quizresultscheme.js";

// Create a new quiz result
export const createQuizResult = async (req, res) => {
  try {
    const { userId, username, category, difficulty, score, timeTaken } = req.body;

    // Validate required fields
    if (!userId) return res.status(400).json({ message: "User ID is required" });
    if (!username) return res.status(400).json({ message: "Username is required" });
    if (!category) return res.status(400).json({ message: "Category is required" });
    if (!difficulty) return res.status(400).json({ message: "Difficulty is required" });
    if (score === undefined) return res.status(400).json({ message: "Score is required" });
    if (timeTaken === undefined) return res.status(400).json({ message: "Time taken is required" });

    // Find previous attempts by the user for the same quiz category and difficulty
    const previousAttempts = await QuizScore.find({
      userId,
      category,
      difficulty,
    });

    // Determine attempt number
    const attemptNumber = previousAttempts.length + 1;

    const newResult = new QuizScore({
      userId,
      username,
      category,
      difficulty,
      score,
      timeTaken,              
      attemptNumber,          
      createdAt: new Date(),  
    });

    await newResult.save();
    res.status(201).json({ message: "Result saved successfully", data: newResult });
  } catch (error) {
    console.error("Error saving quiz result:", error);
    res.status(500).json({ message: "Error saving quiz result", error });
  }
};

// Get results for a specific user
export const getUserQuizResults = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const results = await QuizScore.find({ userId }).sort({ createdAt: -1 });

    if (!results.length) {
      return res.status(404).json({ message: "No results found for this user" });
    }

    res.status(200).json({ data: results });
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    res.status(500).json({ message: "Error fetching quiz results", error });
  }
};
