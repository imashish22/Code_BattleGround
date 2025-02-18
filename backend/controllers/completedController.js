import CompletedQuestion from '../models/CompletedQuestion.js';

export const getCompletedQuestions = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from JWT token

        const completedQuestions = await CompletedQuestion.find({ userId }).populate('questionId', 'title');

        return res.json(completedQuestions);
    } catch (error) {
        console.error("Error fetching completed questions:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getCompletedCodingQuestionsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Find all completed coding questions by user ID
        const completedQuestions = await CompletedQuestion.find({ userId })
            .populate("questionId", "title difficulty") // Populate question details
            .sort({ timestamp: -1 }) // Sort by most recent
            .lean();

        if (!completedQuestions || completedQuestions.length === 0) {
            return res.status(404).json({ success: false, message: "No completed coding questions found" });
        }

        return res.status(200).json({ success: true, data: completedQuestions });
    } catch (error) {
        console.error("Error fetching completed coding questions:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
