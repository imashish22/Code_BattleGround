import QuizResult from "../models/quizScoreModel.js"

// Create a new quiz result
export const createQuizResult = async (req, res) => {
  try {
    const { userId, username, category, difficulty, score } = req.body;

    if (!userId || !username || !category || !difficulty || score === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newResult = new QuizResult({
      userId,
      username,
      category,
      difficulty,
      score,
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
    console.log("Fetching quiz results for user:", userId);  // Log the userId to verify it's correct
    const results = await QuizResult.find({ userId }).sort({ date: -1 });

    if (!results.length) {
      return res.status(404).json({ message: "No results found for this user" });
    }

    res.status(200).json({ data: results });
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    res.status(500).json({ message: "Error fetching quiz results", error });
  }
};

