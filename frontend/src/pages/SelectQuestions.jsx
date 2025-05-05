import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const SelectQuestions = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = "67e26ab1f5d98797df7342b4"; // You can dynamically get the user ID from authentication or context

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/code-questions/questions`);
      setQuestions(response.data); // Assuming response.data is an array
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const toggleQuestion = (id) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter(qid => qid !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  const handleProceed = async () => {
    if (selectedQuestions.length === 0) {
      alert('Please select at least one question!');
      return;
    }

    try {
      // Sending selected questions to backend
      await axios.post(`${import.meta.env.VITE_API_URI}/api/rooms/select-questions`, {
        roomId,
        questionIds: selectedQuestions, // Passing selected question IDs
        userId, // Passing the user ID
      });

      // Navigate to Lobby Page with selected questions
      navigate(`/lobby/${roomId}`, { state: { selectedQuestions } });
    } catch (error) {
      console.error('Error posting selected questions:', error);
      alert('An error occurred while selecting questions. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Select Questions</h2>

        {loading ? (
          <p>Loading questions...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questions.map((question) => (
              <div
                key={question._id}
                onClick={() => toggleQuestion(question._id)}
                className={`border p-4 rounded-lg cursor-pointer ${
                  selectedQuestions.includes(question._id) ? "bg-blue-300" : "bg-gray-100"
                }`}
              >
                <h4 className="text-lg font-semibold">{question.title}</h4>
                <p className="text-sm text-gray-600">{question.difficulty}</p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleProceed}
          className="mt-8 w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition"
        >
          Proceed to Lobby
        </button>
      </motion.div>
    </div>
  );
};

export default SelectQuestions;
