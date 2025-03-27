import QuizResult from '../models/quizScoreModel.js';

/**
 * Function to calculate the leaderboard for a specific difficulty.
 * @param {string} difficulty - The difficulty level (easy, medium, hard).
 * @returns {Array} - Leaderboard data sorted by total score.
 */




const calculateLeaderboardByDifficulty = async (difficulty) => {

  return await QuizResult.aggregate([
    {
      $match: { difficulty: difficulty },
    },
    {
      $group: {
        _id: { userId: "$userId", username: "$username", category: "$category" },
        maxScore: { $max: "$score" },
      },
    },
    {
      $group: {
        _id: { userId: "$_id.userId", username: "$_id.username" },
        totalScore: { $sum: "$maxScore" },
      },
    },
    {
      $sort: { totalScore: -1 },
    },
    {
      $project: {
        userId: "$_id.userId",
        username: "$_id.username",
        totalScore: 1,
      },
    },
  ]);
};

/**
 * Controller to handle leaderboard API requests.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getLeaderboardByDifficulty = async (req, res) => {
  const { difficulty } = req.params;

  // Validate difficulty
  const validDifficulties = ["easy", "medium", "hard"];
  if (!validDifficulties.includes(difficulty)) {
    return res.status(400).json({ message: "Invalid difficulty level." });
  }

  try {
    const leaderboard = await calculateLeaderboardByDifficulty(difficulty);
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Error fetching leaderboard.", error });
  }
};
