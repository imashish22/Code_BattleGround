


import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, ArrowLeft } from "lucide-react"; // Icons for light/dark mode
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import axios from "axios";
import LoadingSpinner from "../components/auth/LoadingSpinner";

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute ${color} ${size} rounded-full opacity-30`}
      style={{ top, left }}
      animate={{
        y: [0, 20, 0], // Floating effect
        x: [0, 10, -10, 0], // Slight side movement
        opacity: [0.2, 0.4, 0.3]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror",
        delay
      }}
    />
  );
};

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, difficulty } = location.state;
  const { user } = useAuthStore();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `api/quiz-question/category/${category.id}/difficulty/${difficulty}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, [category, difficulty]);

  const handleOptionClick = useCallback((questionId, option) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  }, []);

  const handleSubmitQuiz = async () => {
    let newScore = 0;
    questions.forEach((question) => {
      if (userAnswers[question._id] === question.answer) {
        newScore++;
      }
    });
    setScore(newScore);

    const quizResult = {
      userId: user._id,
      username: user.name,
      category: category.name,
      difficulty,
      score: newScore,
      totalQuestions: questions.length,
      date: new Date().toISOString(),
    };

    try {
      await axios.post("api/quiz/result/create", quizResult, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }

    navigate("/quiz-results", {
      state: { score: newScore, total: questions.length },
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (questions.length === 0) return <p className="text-white text-center">No questions available.</p>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-slate-100 text-black"} min-h-screen transition-colors duration-300`}>
      <motion.div
        className="relative min-h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Floating Asteroids */}
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="5%" left="10%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="10%" left="30%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-24 h-24" top="5%" left="40%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="17%" left="3%" delay={0} />

        {/* Theme Toggle Button */}
        <button
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-all"
          onClick={() => setIsDarkMode((prev) => !prev)}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Main Content */}
        <div className="container mx-auto h-screen p-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 mx-4 mb-4 text-white bg-orange-600 rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-4xl font-bold text-center text-purple-500 underline mb-6">
            Questions for {category.name} - {difficulty}
          </h1>

          <div className="flex justify-center mb-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-10 h-10 flex items-center justify-center border rounded-full mx-1 
                ${userAnswers[questions[index]._id] ? "bg-green-500" : "bg-gray-600"} 
                transition duration-200 text-orange-400 font-bold`}
              >
                {userAnswers[questions[index]._id] ? "✔️" : index + 1}
              </div>
            ))}
            <div className="text-lg font-semibold mx-2">
              {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h2 className="text-3xl text-center font-semibold text-purple-400">{currentQuestion.question}</h2>
            <div className="mt-2">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`block w-full p-2 rounded mb-2 bg-gray-700 text-l text-white transition
                  ${userAnswers[currentQuestion._id] === option ? "bg-orange-500" : ""}`}
                  onClick={() => handleOptionClick(currentQuestion._id, option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              {currentQuestionIndex > 0 && (
                <button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                >
                  Previous
                </button>
              )}
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition duration-200"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizPage;
