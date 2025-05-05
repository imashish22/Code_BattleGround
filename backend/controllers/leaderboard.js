



import QuizScore from "../models/quizresultscheme.js";

export const getLeaderboard = async (req, res) => {
  const { difficulty } = req.params;
  const { attemptNumber, sortBy, category } = req.query;

  if (!["easy", "medium", "hard"].includes(difficulty)) {
    return res.status(400).json({ message: "Invalid difficulty level." });
  }

  try {
    const matchConditions = { difficulty };
    if (category) {
      matchConditions.category = category;
    }

    // If attemptNumber is provided
    if (attemptNumber) {
      const attemptCount = parseInt(attemptNumber, 10);

      // Validate attemptNumber
      if (isNaN(attemptCount) || attemptCount <= 0) {
        return res.status(400).json({ message: "Invalid attempt number." });
      }

      // Aggregation to fetch the Nth attempt per user
      const leaderboard = await QuizScore.aggregate([
        { $match: matchConditions },
        { $sort: { createdAt: 1 } }, // Sort by attempt time
        {
          $group: {
            _id: "$userId",
            username: { $first: "$username" },
            attempts: {
              $push: {
                score: "$score",
                timeTaken: "$timeTaken",
                createdAt: "$createdAt",
              },
            },
          },
        },
        {
          $project: {
            userId: "$_id",
            username: 1,
            selectedAttempt: { $arrayElemAt: ["$attempts", attemptCount - 1] }, 
          },
        },
        { $match: { selectedAttempt: { $ne: null } } }, 
        {
          $project: {
            userId: 1,
            username: 1,
            score: "$selectedAttempt.score",
            timeTaken: "$selectedAttempt.timeTaken",
            createdAt: "$selectedAttempt.createdAt",
          },
        },
        { $sort: { score: -1, timeTaken: 1, createdAt: 1 } },
      ]);

      return res.status(200).json(leaderboard);
    }

    // Default case: No specific attemptNumber — normal leaderboard
    let groupStage = {
      _id: { userId: "$userId", username: "$username" },
      totalScore: { $sum: "$score" },
      totalTimeTaken: { $sum: "$timeTaken" },
      totalAttempts: { $sum: 1 },
      firstAttemptTime: { $first: "$createdAt" },
    };

    let sortStage = {};

    if (sortBy === "timeTaken") {
      sortStage = { totalTimeTaken: 1, totalScore: -1 };
    } else {
      sortStage = { totalScore: -1, totalTimeTaken: 1 };
    }

    const leaderboard = await QuizScore.aggregate([
      { $match: matchConditions },
      { $group: groupStage },
      { $sort: sortStage },
      {
        $project: {
          userId: "$_id.userId",
          username: "$_id.username",
          totalScore: 1,
          totalAttempts: 1,
          totalTimeTaken: 1,
        },
      },
    ]);

    res.status(200).json(leaderboard);

  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Error fetching leaderboard.", error });
  }
};
