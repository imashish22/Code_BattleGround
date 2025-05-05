


import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const QuizList = () => {
  const { quizzes } = useQuiz();
  const navigate = useNavigate();

  return (
  
<div className="max-w-5xl mx-auto mt-10 p-6">
  <h2 className="text-4xl font-extrabold text-center mb-10 text-purple-700">
    Available Contest
  </h2>
  {quizzes.length === 0 ? (
    <p className="text-center text-gray-400 text-lg">No Contest available</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {quizzes.map((quiz) => (
        <div
          key={quiz._id}
          className="bg-gradient-to-r from-purple-600 to-indigo-700 shadow-2xl rounded-3xl p-8 cursor-pointer transition-all transform hover:scale-110 hover:shadow-3xl"
          onClick={() => navigate(`/contest/${quiz._id}`)}
        >
          <h3 className="text-3xl font-extrabold mb-4 text-white">{quiz.title}</h3>
          <p className="text-gray-200 text-lg mb-4">{quiz.description}</p>
          <div className="flex justify-between text-gray-300 text-md font-semibold">
            <p>⏳ Time Limit: {quiz.timeLimit} minutes</p>
            <p>📅 Deadline: {new Date(quiz.deadline).toLocaleString()}</p>
          </div>
          <p className="text-lg text-white font-semibold mt-6">
            ✍️ Created by: {quiz.createdBy?.name || "Unknown"}
          </p>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default QuizList;
