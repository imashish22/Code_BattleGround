import CompletedQuestion from '../models/CompletedQuestion.js';





export const getCompletedQuestionsByUser = async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from request parameters

        const completedQuestions = await CompletedQuestion.find({ userId })
            .populate('questionId', 'title difficulty') // Fetch only the title from CodeQuestion
            .populate('userId', 'username'); // Optional: Fetch the username of the user

        if (!completedQuestions.length) {
            return res.status(404).json({ message: 'No completed questions found for this user' });
        }

        res.status(200).json(completedQuestions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
