




import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { Sun, Moon, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const FloatingShape = ({ color, size, top, left, delay }) => (
  <motion.div
    className={`absolute ${color} ${size} rounded-full opacity-30`}
    style={{ top, left }}
    animate={{ y: [0, 20, 0], x: [0, 10, -10, 0], opacity: [0.2, 0.4, 0.3] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay }}
  />
);

const QuizContestStart = () => {
  const { id: quizId } = useParams();
  const navigate = useNavigate();
  const { questions, fetchShuffledQuestions, timelimit } = useQuiz();
  const [timer, setTimer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const { user } = useAuthStore();
  const studentId = user._id;
  const [showAttemptPopup, setShowAttemptPopup] = useState(false);
const [popupMessage, setPopupMessage] = useState("");


  // State for Score Modal
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(null);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShuffledQuestions(quizId);
      setTimer(data?.timelimit ? data.timelimit * 60 : 300);
    };
    fetchData();
  }, [quizId]);

  useEffect(() => {
    if (timer !== null && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => Math.max(prev - 1, 0)), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && questions.length > 0) {
      handleSubmit();
    }
  }, [timer, questions]);

  // const handleSubmit = async () => {
  //   let score = 0;
  //   const attemptAnswers = [];

  //   questions.forEach((q) => {
  //     const selectedOption = selectedAnswers[q._id] || null;
  //     attemptAnswers.push({ question: q._id, selectedOption });
  //     if (selectedOption === q.correctAnswer) {
  //       score += 1;
  //     }
  //   });

  //   const attemptData = {
  //     studentId,
  //     quizId,
  //     answers: attemptAnswers,
  //     score,
  //     attemptedAt: new Date(),
  //   };

  //   try {
  //     const response = await axios.post(`/api/quiz-contest/${quizId}/submit`, attemptData);
  //     setCalculatedScore(score); // Store Score
  //     setShowScorePopup(true); // Open Score Popup
  //   } catch (error) {
  //     console.error("Error submitting quiz:", error);
  //     alert(error.response?.data?.error || "Submission failed");
  //     if (error.response?.status === 400) {
  //       // ✅ If the user already attempted, show a popup instead of alert
  //       setPopupMessage(errorMessage);
  //       setShowAttemptPopup(true);
  //     } else {
  //       alert(errorMessage); // Show general error message
  //     }
  //   }
  // };
  const handleSubmit = async () => {
  let score = 0;
  const attemptAnswers = [];

  questions.forEach((q) => {
    const selectedOption = selectedAnswers[q._id] || null;
    attemptAnswers.push({ question: q._id, selectedOption });
    if (selectedOption === q.correctAnswer) {
      score += 1;
    }
  });

  const attemptData = {
    studentId,
    quizId,
    answers: attemptAnswers,
    score,
    attemptedAt: new Date(),
  };

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/quiz-contest/${quizId}/submit`, attemptData);
    
    if (response.status === 200) {
      setCalculatedScore(score);
      setShowScorePopup(true);  // 🎉 Show score popup
    }
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Submission failed";

    if (error.response?.status === 400) {
      // ✅ If the user already attempted, show a popup instead of alert
      setPopupMessage(errorMessage);
      setShowAttemptPopup(true);
    } else {
      alert(errorMessage); // Show general error message
    }
  }
};


  if (!questions || questions.length === 0) {
    return <h2 className="text-xl font-semibold text-center text-gray-500 mt-10">Loading Questions...</h2>;
  }

  const handleOptionSelect = (questionId, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex((prev) => prev - 1);
  };

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"} min-h-screen transition-all`}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="5%" left="10%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-20 h-20" top="15%" left="30%" delay={1} />

        <button className="fixed top-4 right-4 p-2 bg-gray-700 rounded-full" onClick={() => setIsDarkMode((prev) => !prev)}>
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

      
<div className="container mx-auto p-10 flex flex-col items-center">
  <button className="flex items-center gap-3 px-5 py-3 bg-orange-600 text-white rounded-lg text-lg shadow-md hover:bg-orange-700 transition"
    onClick={() => window.history.back()}
  >
    <ArrowLeft size={24} /> Back
  </button>

  <h1 className="text-4xl font-extrabold text-center mt-6 text-blue-500">Quiz Time! ⏳ {timer}s</h1>

  <div className="w-full max-w-2xl mt-6 bg-gray-800 p-8 rounded-2xl shadow-2xl text-white">
    <h3 className="text-3xl text-center font-semibold text-purple-400">{questions[currentQuestionIndex]?.questionText}</h3>
    
    <div className="mt-6 space-y-4">
      {questions[currentQuestionIndex]?.options?.map((option, i) => (
      
        <button
  key={i}
  className={`w-full p-4 text-lg font-medium rounded-xl shadow-md transition 
    ${
      selectedAnswers[questions[currentQuestionIndex]._id] === option 
        ? "bg-orange-600 ring-4 ring-orange-500 scale-105 text-white" // Selected state
        : "bg-gray-700 text-white" // Default state
    }`}
  onClick={() => handleOptionSelect(questions[currentQuestionIndex]._id, option)}
>
  {option}
</button>

      ))}
    </div>
  </div>

  <div className="mt-8 flex justify-between w-full max-w-2xl">
    <button
      onClick={handlePrev}
      disabled={currentQuestionIndex === 0}
      className={`px-8 py-3 rounded-full text-lg font-semibold transition shadow-md ${
        currentQuestionIndex === 0 ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"
      }`}
    >
      Previous
    </button>

    {currentQuestionIndex === questions.length - 1 ? (
      <button
        onClick={handleSubmit}
        className="px-8 py-3 bg-green-500 hover:bg-green-700 text-white rounded-full text-lg font-semibold shadow-md transition"
      >
        Submit
      </button>
    ) : (
      <button
        onClick={handleNext}
        className="px-8 py-3 bg-green-500 hover:bg-green-700 text-white rounded-full text-lg font-semibold shadow-md transition"
      >
        Next
      </button>
    )}
  </div>
</div>

      </motion.div>

    

{showScorePopup && (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50"
  >
    <div className="bg-white/90 backdrop-blur-lg text-black p-10 rounded-2xl shadow-2xl max-w-md w-full text-center border border-gray-300">
      <h2 className="text-3xl font-extrabold text-green-600">🎉 Quiz Submitted! 🎉</h2>
      <p className="text-xl text-gray-800 mt-3">Your Score: <span className="font-bold text-blue-600">{calculatedScore}</span></p>
      <p className="text-lg text-gray-600 mt-1">Well done! Keep improving. 🚀</p>
      
      <button 
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-800 text-white font-semibold text-lg rounded-full transition-all duration-300 shadow-md hover:shadow-xl"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  </motion.div>
)}
{showAttemptPopup && (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50"
  >
    <div className="bg-white/90 backdrop-blur-lg text-black p-10 rounded-2xl shadow-2xl max-w-md w-full text-center border border-gray-300">
      <h2 className="text-2xl font-bold text-red-600">⚠️ Already Attempted!</h2>
      <p className="text-lg text-gray-800 mt-3">{popupMessage}</p>

      <button
        className="mt-6 px-6 py-3 bg-gray-600 hover:bg-gray-800 text-white font-semibold text-lg rounded-full transition-all duration-300 shadow-md hover:shadow-xl"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  </motion.div>
)}


    </div>
  );
};

export default QuizContestStart;
