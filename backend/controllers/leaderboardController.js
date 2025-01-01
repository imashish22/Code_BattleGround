import QuizResult from '../models/quizScoreModel.js';

/**
 * Function to calculate the leaderboard for a specific difficulty.
 * @param {string} difficulty - The difficulty level (easy, medium, hard).
 * @returns {Array} - Leaderboard data sorted by total score.
 */
const calculateLeaderboardByDifficulty = async (difficulty) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const startOfDay = new Date(today);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  return await QuizResult.aggregate([
    {
      $match: {
        date: { $gte: startOfDay, $lte: endOfDay }, // Only today's results
        difficulty: difficulty, // Filter by difficulty
      },
    },
    {
      $group: {
        _id: { userId: '$userId', username: '$username', category: '$category' },
        maxScore: { $max: '$score' }, // Get the max score for each category
      },
    },
    {
      $group: {
        _id: { userId: '$_id.userId', username: '$_id.username' },
        totalScore: { $sum: '$maxScore' }, // Sum the max scores across categories
      },
    },
    {
      $sort: { totalScore: -1 }, // Sort users by total score in descending order
    },
    {
      $project: {
        userId: '$_id.userId',
        username: '$_id.username',
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
  const validDifficulties = ['easy', 'medium', 'hard'];
  if (!validDifficulties.includes(difficulty)) {
    return res.status(400).json({ message: 'Invalid difficulty level.' });
  }

  try {
    const leaderboard = await calculateLeaderboardByDifficulty(difficulty);
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Error fetching leaderboard.', error });
  }
};
