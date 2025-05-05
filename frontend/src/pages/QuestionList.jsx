import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [roomTitle, setRoomTitle] = useState(""); 
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [completedQuestions, setCompletedQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/rooms/room/${roomId}`);
        const room = response.data;
        setQuestions(room.selectedQuestions);
        setRoomTitle(room.title || "");
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
    const completed = JSON.parse(localStorage.getItem("completedQuestions")) || [];
    setCompletedQuestions(completed);
  }, [roomId]);

  const handleSelectQuestion = (questionId) => {
    console.log("Selected question ID:", questionId);
    navigate(`/lobby/:roomId/question-list/editor/${questionId}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="flex-grow p-6 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl font-bold mb-10 text-center text-indigo-700">Choose a Question to Solve</h1>

        {/* Display in a row */}
        <div className="flex flex-wrap gap-6 justify-center">
          {questions.length > 0 ? (
            questions.map((question) => {
              const isCompleted = completedQuestions.includes(question._id);
              return (
                <div
                  key={question._id}
                  className={`w-72 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                    isCompleted ? "border-4 border-green-500" : ""
                  }`}
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">{question.questionTitle}</h2>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{question.description}</p>
                  </div>

                  <button
                    onClick={() => handleSelectQuestion(question.questionId)}
                    className={`mt-4 px-6 py-3 ${
                      isCompleted ? "bg-green-500 hover:bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"
                    } text-white font-semibold rounded-xl transition-all`}
                  >
                    {isCompleted ? "Completed ✅" : "Start Solving"}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No questions available yet...</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-700 text-white py-4 text-center text-lg font-medium rounded-t-2xl">
        {roomTitle ? `Room: ${roomTitle}` : "Room"}
      </footer>
    </div>
  );
};

export default QuestionsList;
