// quizController.js
import Quiz from '../models/quiz.js';
import Category from '../models/category.js';

// Create a new quiz question
export const createQuiz = async (req, res) => {
    try {
        const { question, options, answer, category, difficulty } = req.body;

        // Check if all required fields are provided
        if (!question || !options || !answer || !category || !difficulty) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the category exists
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Create a new quiz question
        const newQuiz = new Quiz({ question, options, answer, category, difficulty });
        await newQuiz.save();

        // Respond with the created quiz question
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all quiz questions
export const getAllQuestions = async (req, res) => {
    try {
        const questions = await Quiz.find().populate('category', 'name'); // Populate category name
        return res.status(200).json(questions); // Return all questions
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get questions filtered by difficulty
export const getQuestionsByDifficulty = async (req, res) => {
    const { level } = req.params; // Extract difficulty level from request parameters

    try {
        // Find questions by difficulty level
        const questions = await Quiz.find({ difficulty: level }).populate('category', 'name');

        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for this difficulty level.' });
        }

        return res.status(200).json(questions); // Return the found questions
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
