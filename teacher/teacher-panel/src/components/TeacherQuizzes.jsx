


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import axios from "axios";
import { toast } from "react-hot-toast";

const TeacherQuizzes = () => {
  const { id } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in");
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/quiz/my-quizzes`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setQuizzes(response.data);
      } catch (error) {
        toast.error("Failed to fetch quizzes");
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizClick = (quizId) => {
    console.log(id);
    navigate(`/attempted-users/${quizId}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-purple-700">Your Created Quizzes</h2>

      {quizzes.length === 0 ? (
        <p className="text-center text-gray-500">No quizzes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quiz) => (
            <div 
              key={quiz._id} 
              className="p-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-xl rounded-3xl border border-gray-300 hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
              onClick={() => handleQuizClick(quiz._id)}
            >
              <h3 className="text-2xl font-bold mb-2">{quiz.title}</h3>
              <p className="text-lg opacity-90">{quiz.description}</p>
              <p className="text-md mt-4 font-semibold">⏳ Time Limit: {quiz.timeLimit} mins</p>
              <p className="text-md font-semibold">📅 Deadline: {new Date(quiz.deadline).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherQuizzes;
