import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizResults = () => {
  const { state } = useLocation();
  const { score, total } = state;
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard"); 
  };

  return (
    // <div className="container mx-auto p- bg-black text-center">
    //   <h1 className="text-4xl font-bold text-green-500">Quiz Results</h1>
    //   <p className="text-2xl mt-4">
    //     You scored {score} out of {total}!
    //   </p>
    //   <button
    //     onClick={handleGoBack}
    //     className="mt-6 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
    //   >
    //     Go Back to Dashboard
    //   </button>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="container mx-auto p-6 bg-gradient-to-br from-purple-400 to-purple-600 text-center rounded-lg shadow-lg">
  <h1 className="text-5xl font-extrabold text-green-400 drop-shadow-lg">
    🎉 Quiz Results 🎉
  </h1>
  <p className="text-2xl mt-6 text-gray-300 font-medium">
    You scored <span className="text-green-400 font-bold">{score}</span> out of <span className="text-green-400 font-bold">{total}</span>!
  </p>
  <button
    onClick={handleGoBack}
    className="mt-8 py-3 px-6 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 transform hover:bg-blue-700 hover:scale-105"
  >
    🔙 Go Back to Dashboard
  </button>
</div>
</div>
  );
};

export default QuizResults;
