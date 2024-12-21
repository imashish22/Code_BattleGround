// import React, { useEffect, useState, useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../pages/Footer";
// import axios from "axios";
// import LoadingSpinner from "../components/auth/LoadingSpinner";

// const QuizPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { category, difficulty } = location.state;

//   const [questions, setQuestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [score, setScore] = useState(null);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/quiz-question/category/${category}/difficulty/${difficulty}`
//         );
//         setQuestions(response.data);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [category, difficulty]);

//   const handleOptionClick = useCallback((questionId, option) => {
//     setUserAnswers((prev) => ({
//       ...prev,
//       [questionId]: option,
//     }));
//   }, []);

//   const handleSubmitQuiz = () => {
//     let newScore = 0;
//     questions.forEach((question) => {
//       if (userAnswers[question._id] === question.answer) {
//         newScore++;
//       }
//     });
//     setScore(newScore);
//     navigate("/quiz-results", { state: { score: newScore, total: questions.length } });
//   };

  

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   if (questions.length === 0) {
//     return <p className="text-white text-center">No questions available.</p>;
//   }

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <div className="bg-black">
//       <Navbar />
//       <div className="container mx-auto p-6">
//         <h1 className="text-3xl font-bold text-center text-white mb-6">
//           Questions for {category} - {difficulty}
//         </h1>

//         <div className="flex justify-center mb-4">
//           {questions.map((_, index) => (
//             <div
//               key={index}
//               className={`w-10 h-10 flex items-center justify-center border rounded-full mx-1 
//                 ${userAnswers[questions[index]._id] ? "bg-green-500" : "bg-gray-600"} 
//                 transition duration-200 text-white font-bold`}
//             >
//               {userAnswers[questions[index]._id] ? "✔️" : index + 1}
//             </div>
//           ))}
//           <div className="text-white text-lg font-semibold mx-2">
//             {currentQuestionIndex + 1} of {questions.length}
//           </div>
//         </div>

//         <div className="bg-gray-800 p-4 rounded-lg mb-4">
//           <h2 className="text-xl font-semibold text-white">{currentQuestion.question}</h2>
//           <div className="mt-2">
//             {currentQuestion.options.map((option, index) => (
//               <button
//                 key={index}
//                 className={`block w-full bg-gray-700 p-2 rounded mb-2 
//                   ${userAnswers[currentQuestion._id] === option ? "bg-orange-500" : ""}`}
//                 onClick={() => handleOptionClick(currentQuestion._id, option)}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//           <div className="flex justify-between mt-4">
//             {currentQuestionIndex > 0 && (
//               <button
//                 onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
//               >
//                 Previous
//               </button>
//             )}
//             {currentQuestionIndex < questions.length - 1 ? (
//               <button
//                 onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
//                 className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition duration-200"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmitQuiz}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
//               >
//                 Finish
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default QuizPage;


import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import axios from "axios";
import LoadingSpinner from "../components/auth/LoadingSpinner";
import { useAuthStore } from "../store/authStore"; // Assuming you're using a store for user authentication

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, difficulty } = location.state;

  const { user } = useAuthStore(); // Fetch the logged-in user's details
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/quiz-question/category/${category}/difficulty/${difficulty}`
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

    // Prepare data for submission
    const quizResult = {
      userId: user._id,
      category,
      difficulty,
      score: newScore,
      // totalQuestions: questions.length,
      date: new Date().toISOString(),
    };

    try {
      // Save quiz result to the database
      await axios.post("http://localhost:5000/api/quiz-results/create", quizResult, {
        withCredentials: true,
      });
      console.log("Quiz result saved successfully.");
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }

    // Navigate to the quiz results page
    navigate("/quiz-results", {
      state: { score: newScore, total: questions.length },
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (questions.length === 0) {
    return <p className="text-white text-center">No questions available.</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-black">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Questions for {category} - {difficulty}
        </h1>

        <div className="flex justify-center mb-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center border rounded-full mx-1 
                ${userAnswers[questions[index]._id] ? "bg-green-500" : "bg-gray-600"} 
                transition duration-200 text-white font-bold`}
            >
              {userAnswers[questions[index]._id] ? "✔️" : index + 1}
            </div>
          ))}
          <div className="text-white text-lg font-semibold mx-2">
            {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold text-white">{currentQuestion.question}</h2>
          <div className="mt-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`block w-full bg-gray-700 p-2 rounded mb-2 
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
      <Footer />
    </div>
  );
};

export default QuizPage;
