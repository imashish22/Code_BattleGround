import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from './auth/LoadingSpinner';
const QuizContainer = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const { category, difficulty } = location.state || { category: 'sql', difficulty: 'Easy' }; // Default values

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
    const [answeredQuestions, setAnsweredQuestions] = useState(Array(10).fill(false)); // Track answered questions

    const fetchQuestions = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/questions', {
                params: {
                    category: category,
                    difficulty: difficulty,
                },
                withCredentials: true,
            });
            setQuestions(response.data);
            // Initialize answered questions state based on the number of questions fetched
            setAnsweredQuestions(new Array(response.data.length).fill(false));
        } catch (error) {
            setError('Error fetching questions: ' + error.message);
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [category, difficulty]); // Fetch questions when category or difficulty changes

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleAnswerQuestion = () => {
        // Mark the current question as answered
        const updatedAnsweredQuestions = [...answeredQuestions];
        updatedAnsweredQuestions[currentQuestionIndex] = true;
        setAnsweredQuestions(updatedAnsweredQuestions);
        handleNextQuestion();
    };

    const handleSubmit = () => {
        // Redirect to the quiz page (adjust the path as needed)
        navigate('/quiz'); // Replace '/quiz' with the actual path to your quiz page
    };

    if (loading) return <LoadingSpinner />; // Show loading spinner when loading
    if (error) return <div>{error}</div>;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="bg-black h-[100vh]">
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-orange-600 text-center mb-4">
                    Quiz Questions - {category.charAt(0).toUpperCase() + category.slice(1)} - {difficulty}
                </h1>
                
                {/* Display question numbers in boxes */}
                <div className="flex justify-center mb-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div 
                            key={index} 
                            className={`w-10 h-10 flex items-center justify-center border rounded-full mx-1 
                                ${answeredQuestions[index] ? 'bg-green-500' : 'bg-gray-600'} 
                                transition duration-200`}
                        >
                            {answeredQuestions[index] ? (
                                <span className="text-white">✔️</span>
                            ) : (
                                <span className="text-white">{index + 1}</span>
                            )}
                        </div>
                    ))}
                </div>

                {currentQuestion ? (
                    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg mt-8 justify-center align-middle">
                        <h2 className="text-xl text-white font-semibold mb-4">
                            {currentQuestionIndex + 1}. {currentQuestion.question}
                        </h2>
                        <ul className="space-y-2">
                            {currentQuestion.answers ? (
                                Object.entries(currentQuestion.answers).map(([key, value]) => (
                                    value ? (
                                        <li key={key} className="flex items-center p-3 border rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-200">
                                            <span className="mr-2 text-white font-bold">{key.toUpperCase()}:</span>
                                            <span className="text-white">{value}</span>
                                        </li>
                                    ) : null
                                ))
                            ) : (
                                <li>No options available</li>
                            )}
                        </ul>
                        <div className="flex justify-between mt-4">
                            <button 
                                onClick={handlePreviousQuestion} 
                                disabled={currentQuestionIndex === 0}
                                className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button 
                                onClick={handleAnswerQuestion} // Mark question as answered and go to the next
                                className="px-4 py-2 bg-orange-600 text-white rounded"
                            >
                                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>No questions available</div>
                )}

                {/* Submit button */}
                <div className="mt-4 text-center">
                    <button 
                        onClick={handleSubmit} 
                        className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition duration-200"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizContainer;
