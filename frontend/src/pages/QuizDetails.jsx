


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useQuiz } from "../context/QuizContext";
// import axios from "axios";
// import { useAuthStore } from "../store/authStore";
// import { motion } from "framer-motion";
// import { ArrowLeft } from "lucide-react";

// const FloatingShape = ({ color, size, top, left, delay }) => {
//   return (
//     <motion.div
//       className={`absolute ${color} ${size} rounded-full opacity-30`}
//       style={{ top, left }}
//       animate={{ y: [0, 20, 0], x: [0, 10, -10, 0], opacity: [0.2, 0.4, 0.3] }}
//       transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay }}
//     />
//   );
// };

// const QuizDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { quiz, fetchQuizDetails } = useQuiz();
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [attempted, setAttempted] = useState(false);
//   const { user } = useAuthStore();

//   useEffect(() => {
//     fetchQuizDetails(id);
//     checkAttemptStatus();
//   }, [id]);

//   const checkAttemptStatus = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/quiz-contest/${id}/attempt-status/${user._id}`);
//       setAttempted(response.data.attempted);
//     } catch (error) {
//       console.error("Error checking attempt status:", error);
//     }
//   };

//   const handleVerifyPassword = async () => {
//     if (attempted) {
//       setError("You have already attempted this quiz.");
//       return;
//     }

//     try {
//       await axios.post(`http://localhost:5000/api/quiz-contest/${id}/verify`, { password });
//       await checkAttemptStatus();
//       // navigate(`/quiz/${id}/start`);
//       navigate(`/contest/shuffled-questions/${id}`);
//     } catch (error) {
//       setError("Incorrect password");
//     }
//   };

 

//   if (!quiz) return <p className="text-white text-center text-xl">Loading...</p>;

//   return (
//     <motion.div
//       className="relative bg-black min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1.5, ease: "easeInOut" }}
//     >
//       {/* Floating Background Elements */}
//       <FloatingShape color="bg-gray-400" size="w-20 h-20" top="5%" left="10%" delay={0} />
//       <FloatingShape color="bg-gray-500" size="w-24 h-24" top="10%" left="30%" delay={0.5} />
//       <FloatingShape color="bg-gray-600" size="w-32 h-32" top="15%" left="60%" delay={1} />
//       <FloatingShape color="bg-gray-700" size="w-28 h-28" top="70%" left="40%" delay={1.5} />
//       <FloatingShape color="bg-gray-500" size="w-36 h-36" top="50%" left="80%" delay={2} />

//       {/* Quiz Card */}
//       <motion.div
//         className="bg-white bg-opacity-10 backdrop-blur-md shadow-2xl p-10 rounded-3xl w-full max-w-4xl mx-auto text-white text-center"
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 rounded-lg" onClick={() => window.history.back()}>
//                     <ArrowLeft size={20} /> Back
//                   </button>
//         <h1 className="text-4xl font-extrabold mb-6 text-purple-300">{quiz.title}</h1>
//         <p className="text-lg text-gray-200 mb-6">{quiz.description}</p>

//         <div className="grid grid-cols-2 gap-6 text-lg font-semibold mb-8">
//           <p className="flex items-center justify-center bg-gray-800 p-3 rounded-lg">
//             ⏳ {quiz.timeLimit} min
//           </p>
//           <p className="flex items-center justify-center bg-gray-800 p-3 rounded-lg">
//             📅 {new Date(quiz.deadline).toLocaleString()}
//           </p>
//         </div>

//         <p className="text-lg font-semibold mb-6">✍️ Created By: {quiz.createdBy?.name || "Unknown"}</p>

//         {attempted ? (
//           <p className="mt-6 text-red-400 font-bold text-lg">⚠️ You have already attempted this quiz.</p>
//         ) : quiz.password ? (
//           <div className="mt-6 flex flex-col items-center">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter Password"
//               className="w-full max-w-md px-4 py-3 rounded-lg text-black text-lg border-2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-white"
//             />
//             <motion.button
//               onClick={handleVerifyPassword}
//               className="mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-300 w-full max-w-xs"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               🔓 Unlock Quiz
//             </motion.button>
//           </div>
//         ) : (
//           <motion.button
//             onClick={() => navigate(`/contest/shuffled-questions/${id}`)}
//             className="mt-6 px-8 py-4 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 w-full max-w-xs"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             🚀 Start Quiz
//           </motion.button>
//         )}

//         {error && <p className="mt-4 text-red-400 text-lg">{error}</p>}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default QuizDetails;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute ${color} ${size} rounded-full opacity-30`}
      style={{ top, left }}
      animate={{ y: [0, 20, 0], x: [0, 10, -10, 0], opacity: [0.2, 0.4, 0.3] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay }}
    />
  );
};

const QuizDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quiz, fetchQuizDetails } = useQuiz();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempted, setAttempted] = useState(null); // Set to null initially to avoid false checks
  const { user } = useAuthStore();

  useEffect(() => {
    fetchQuizDetails(id);
    checkAttemptStatus();
  }, [id]);

  const checkAttemptStatus = async () => {
    try {
      const response = await axios.get(`/api/quiz-contest/${id}/attempt-status/${user._id}`);
      setAttempted(response.data.attempted);
    } catch (error) {
      console.error("Error checking attempt status:", error);
    }
  };

  const handleVerifyPassword = async () => {
    if (attempted) {
      navigate(-1); // Navigate back if already attempted
      return;
    }

    try {
      await axios.post(`/api/quiz-contest/${id}/verify`, { password });
      navigate(`/contest/shuffled-questions/${id}`);
    } catch (error) {
      setError("Incorrect password");
    }
  };

  const handleStartQuiz = () => {
    if (attempted) {
      navigate(-1); // If attempted, navigate back
    } else {
      navigate(`/contest/shuffled-questions/${id}`); // Otherwise, start quiz
    }
  };

  if (!quiz || attempted === null) {
    return <p className="text-white text-center text-xl">Loading...</p>; // Ensure attempt check is completed
  }

  return (
    <motion.div
      className="relative bg-black min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Floating Background Elements */}
      <FloatingShape color="bg-gray-400" size="w-20 h-20" top="5%" left="10%" delay={0} />
      <FloatingShape color="bg-gray-500" size="w-24 h-24" top="10%" left="30%" delay={0.5} />
      <FloatingShape color="bg-gray-600" size="w-32 h-32" top="15%" left="60%" delay={1} />
      <FloatingShape color="bg-gray-700" size="w-28 h-28" top="70%" left="40%" delay={1.5} />
      <FloatingShape color="bg-gray-500" size="w-36 h-36" top="50%" left="80%" delay={2} />

      {/* Quiz Card */}
      <motion.div
        className="bg-white bg-opacity-10 backdrop-blur-md shadow-2xl p-10 rounded-3xl w-full max-w-4xl mx-auto text-white text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 rounded-lg" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-4xl font-extrabold mb-6 text-purple-300">{quiz.title}</h1>
        <p className="text-lg text-gray-200 mb-6">{quiz.description}</p>

        <div className="grid grid-cols-2 gap-6 text-lg font-semibold mb-8">
          <p className="flex items-center justify-center bg-gray-800 p-3 rounded-lg">
            ⏳ {quiz.timeLimit} min
          </p>
          <p className="flex items-center justify-center bg-gray-800 p-3 rounded-lg">
            📅 {new Date(quiz.deadline).toLocaleString()}
          </p>
        </div>

        <p className="text-lg font-semibold mb-6">✍️ Created By: {quiz.createdBy?.name || "Unknown"}</p>

        {attempted ? (
          <p className="mt-6 text-red-400 font-bold text-lg">⚠️ You have already attempted this quiz.</p>
        ) : quiz.password ? (
          <div className="mt-6 flex flex-col items-center">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full max-w-md px-4 py-3 rounded-lg text-black text-lg border-2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <motion.button
              onClick={handleVerifyPassword}
              className="mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-300 w-full max-w-xs"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              🔓 Unlock Quiz
            </motion.button>
          </div>
        ) : (
          <motion.button
            onClick={handleStartQuiz} // Corrected navigation logic
            className={`mt-6 px-8 py-4 ${
              attempted ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            } text-white text-lg font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 w-full max-w-xs`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={attempted}
          >
            🚀 Start Quiz
          </motion.button>
        )}

        {error && <p className="mt-4 text-red-400 text-lg">{error}</p>}
      </motion.div>
    </motion.div>
  );
};

export default QuizDetails;
