

import axios from 'axios';

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
