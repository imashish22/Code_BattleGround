

import axios from 'axios';
import Question from '../models/questionModel.js';

export const getQuizQuestions = async (req, res) => {
    const { category, difficulty } = req.params;
    const apiKey = process.env.QUIZ_API_KEY; // Store your API key in .env file

    try {
        const response = await axios.get(`https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=${category}&difficulty=${difficulty}&limit=10`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quiz questions.' });
    }
};

export const checkAnswers = async (req, res) => {
    const { userAnswers } = req.body; // Expects { questionId: answer }

    let score = 0;
    try {
        for (let questionId in userAnswers) {
            const question = await Question.findById(questionId);
            if (question && question.answer === userAnswers[questionId]) {
                score++;
            }
        }
        res.status(200).json({ score });
    } catch (error) {
        console.error("Error checking answers:", error);
        res.status(500).json({ message: "Server error while checking answers" });
    }
};

// export const getQuestionsByCategoryAndDifficulty = async (req, res) => {
//     const { categoryId, difficultyLevel } = req.params;

//     try {
//         const questions = await Question.find({
//             category: categoryId,
//             difficulty: difficultyLevel
//         });

//         if (questions.length === 0) {
//             return res.status(404).json({ message: 'No questions found for this category and difficulty level.' });
//         }

//         return res.status(200).json(questions);
//     } catch (error) {
//         console.error('Error fetching questions:', error); // Add this line for debugging
//         return res.status(500).json({ message: error.message });
//     }
// };

export const getQuestionsByCategoryAndDifficulty = async (req, res) => {
    const { categoryId, difficultyLevel } = req.params;
    const { userAnswers } = req.body; // Accept user's answers in the request body

    try {
        // Fetch questions from the database
        const questions = await Question.find({
            category: categoryId,
            difficulty: difficultyLevel
        });

        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for this category and difficulty level.' });
        }

        // If user answers are provided, calculate the score
        if (userAnswers) {
            let score = 0;

            questions.forEach((question) => {
                const userAnswer = userAnswers[question._id];
                if (userAnswer && userAnswer === question.answer) {
                    score++;
                }
            });

            return res.status(200).json({
                message: 'Quiz completed.',
                totalQuestions: questions.length,
                correctAnswers: score,
                incorrectAnswers: questions.length - score,
                questions
            });
        }

        // If no user answers, just return the questions
        return res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        return res.status(500).json({ message: error.message });
    }
};


