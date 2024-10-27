import Question from '../models/question.js';

// Add a new quiz question
export const addQuestion = async (req, res) => {
    const { category, question, options, answer, difficulty } = req.body;

    try {
        const newQuestion = new Question({
            category,
            question,
            options,
            answer,
            difficulty
        });

        await newQuestion.save();
        res.status(201).json(newQuestion); // Respond with the created question
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getQuestionsByDifficulty = async (req, res) => {
    const { difficultyLevel } = req.params;

    try {
        const questions = await Question.find({ difficulty: difficultyLevel });
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getQuestionsByCategoryAndDifficulty = async (req, res) => {
    const { categoryId, difficultyLevel } = req.params;

    try {
        const questions = await Question.find({
            category: categoryId,
            difficulty: difficultyLevel
        });

        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for this category and difficulty level.' });
        }

        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all quiz questions
export const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('category'); // Populate category info
        res.status(200).json(questions); // Send questions as a JSON response
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getQuestionsByCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const questions = await Question.find({ category: categoryId });
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
