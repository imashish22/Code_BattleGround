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
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold text-green-500">Quiz Results</h1>
      <p className="text-2xl mt-4">
        You scored {score} out of {total}!
      </p>
      <button
        onClick={handleGoBack}
        className="mt-6 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        Go Back to Dashboard
      </button>
    </div>
  );
};

export default QuizResults;
