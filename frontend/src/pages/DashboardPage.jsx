
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { formatDate } from "../utils/date";
// import { useAuthStore } from "../store/authStore";
// import Navbar from "../components/Navbar";
// import Footer from "./Footer";
// import axios from "axios";

// const FloatingShape = ({ color, size, top, left, delay }) => {
//   return (
//       <motion.div
//         className={`absolute ${color} ${size} rounded-full opacity-30`}
//         style={{ top, left }}
//         animate={{
//           y: [0, 20, 0], // Floating effect
//           x: [0, 10, -10, 0], // Slight side movement
//           opacity: [0.2, 0.4, 0.3]
//         }}
//         transition={{
//           duration: 6,
//           repeat: Infinity,
//           ease: "easeInOut",
//           repeatType: "mirror",
//           delay
//         }}
//       />
//     );
// };

// const DashboardPage = () => {
//     const { user, logout } = useAuthStore(); // Use destructured user and logout
//     const [quizzes, setQuizzes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [loadingg, setLoadingg] = useState(true);
//     const [error, setError] = useState(null);
//     const [showAll, setShowAll] = useState(false); // Track whether to show all quizzes or just the last 5
//     const [completedQuestions, setCompletedQuestions] = useState([]);
//     const [errorr, setErrorr] = useState(null);

//     const handleLogout = () => {
//         logout();
//     };

//     useEffect(() => {
//         const fetchQuizzes = async () => {
//             if (!user || !user._id) {
//                 console.error("User ID is missing, cannot fetch quizzes.");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await axios.get(`/api/quiz/result/${user._id}`, {
//                     withCredentials: true,
//                 });
//                 setQuizzes(response.data.data || []); // Update the quizzes state with the response data
//             } catch (err) {
//                 console.error("Error fetching quizzes:", err);
//                 setError("Failed to load quizzes.");
//             } finally {
//                 setLoading(false);
//             }
//         };

       
//         fetchQuizzes();
//     }, [user]);

//     useEffect(() => {  
//         const fetchcode = async()=>{
//             if (!user || !user._id) {
//                 console.error("User ID is missing, cannot fetch quizzes.");
//                 setLoadingg(false);
//                 return;
//             }
//             try{
//                 const responses = await axios.get(`/api/code-questions/completed-questions/${user._id}`, {
//                     withCredentials: true,
//                 });
//                 console.log(responses.data)
//                 setCompletedQuestions(responses.data || []);
                
//             }
//             catch(err){
//                 console.error("Error fetching quizzes:", err);
//                 setErrorr("Failed to load quizzes.");
//             }
//             finally{
//                 setLoadingg(false);
//             }
            
//         }
//         fetchcode();


//      }, [user]);

//     const displayedQuizzes = showAll ? quizzes : quizzes.slice(0, 5); // Show all or the last 5 quizzes

//     return (
//         <div className="bg-neutral-900">
//              <motion.div 
//                     className="relative bg-black min-h-screen overflow-hidden"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 1.5, ease: "easeInOut" }}
//                   >
//                     {/* Floating Asteroids */}
//                     <FloatingShape color="bg-gray-400" size="w-16 h-16" top="5%" left="10%" delay={0} />
//                     <FloatingShape color="bg-gray-400" size="w-16 h-16+" top="20%" left="10%" delay={0} />
//                     <FloatingShape color="bg-gray-400" size="w-24 h-24" top="20%" left="40%" delay={0} />
//                     <FloatingShape color="bg-gray-400" size="w-16 h-16" top="17%" left="3%" delay={0} />
//                     <FloatingShape color="bg-gray-600" size="w-24 h-24" top="30%" left="70%" delay={1} />
//                     <FloatingShape color="bg-gray-500" size="w-12 h-12" top="50%" left="10%" delay={2} />
//                     <FloatingShape color="bg-gray-700" size="w-20 h-20" top="80%" left="40%" delay={3} />
//                     <FloatingShape color="bg-gray-500" size="w-28 h-28" top="5%" left="80%" delay={1.5} />

//             <Navbar />
//             <div className="max-w-7xl  mx-auto pt-20 px-6 flex">
//                 {/* Main Content Area */}
//                 <div className="w-7/10 pr-4 overflow-y h-screen">
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         transition={{ duration: 0.5 }}
//                         className="p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
//                     >
//                         <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
//                             Quiz Attempted
//                         </h2>
//                         {loading ? (
//                             <p className="text-gray-300">Loading quizzes...</p>
//                         ) : error ? (
//                             <p className="text-red-400">{error}</p>
//                         ) : quizzes.length > 0 ? (
//                             <div>
//                                 <table className="w-full table-auto text-gray-300 text-left border-collapse">
//                                     <thead>
//                                         <tr className="bg-gray-800 text-blue-400">
//                                             <th className="p-3 border-b border-gray-700">No</th>
//                                             <th className="p-3 border-b border-gray-700">Topic</th>
//                                             <th className="p-3 border-b border-gray-700">Difficulty</th>
//                                             <th className="p-3 border-b border-gray-700">Score</th>
//                                             <th className="p-3 border-b border-gray-700">Date Attempted</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {displayedQuizzes.map((quiz, index) => (
//                                             <tr key={quiz._id || index} className="hover:bg-gray-700">
//                                                 <td className="p-3 border-b border-gray-700">{index + 1}</td>
//                                                 <td className="p-3 border-b border-gray-700">{quiz.category}</td>
//                                                 <td className="p-3 border-b border-gray-700">{quiz.difficulty}</td>
//                                                 <td className="p-3 border-b border-gray-700">{quiz.score}</td>
//                                                 <td className="p-3 border-b border-gray-700">
//                                                     {quiz.date ? formatDate(quiz.date) : "N/A"}
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                                 {quizzes.length > 5 && (
//                                     <button
//                                         onClick={() => setShowAll(!showAll)}
//                                         className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
//                                     >
//                                         {showAll ? "Show Less" : "View More"}
//                                     </button>
//                                 )}
//                             </div>
//                         ) : (
//                             <p className="text-gray-300">You haven't attempted any quizzes yet.</p>
//                         )}
//                     </motion.div>  

              
                
                
//                 </div>
//                 <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         transition={{ duration: 0.5 }}
//                         className="p-8 bg-gray-900 mt-6 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
//                     >
//                         <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
//                             Code Submit Successfully 
//                         </h2>
//                         {loadingg ? (
//                             <p className="text-gray-300">Loading data...</p>
//                         ) : errorr ? (
//                             <p className="text-red-400">{error}</p>
//                         ) : completedQuestions.length > 0 ? (
//                             <div>
//                                 <table className="w-full table-auto text-gray-300 text-left border-collapse">
//                                     <thead>
//                                         <tr className="bg-gray-800 text-blue-400">
//                                             <th className="p-3 border-b border-gray-700">No</th>
//                                             <th className="p-3 border-b border-gray-700">Topic</th>
//                                             <th className="p-3 border-b border-gray-700">Difficulty</th>
//                                             <th className="p-3 border-b border-gray-700">Date Attempted</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {completedQuestions.map((code, index) => (
//                                             <tr key={code._id || index} className="hover:bg-gray-700">
//                                                 <td className="p-3 border-b border-gray-700">{index + 1}</td>
//                                                 <td className="p-3 border-b border-gray-700">{code.questionId.title}</td>
//                                                 <td className="p-3 border-b border-gray-700">{code.questionId.difficulty}</td>
//                                                 <td className="p-3 border-b border-gray-700">
//                                                     {code.timestamp ? formatDate(code.timestamp) : "N/A"}
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                                 {/* {quizzes.length > 5 && (
//                                     <button
//                                         onClick={() => setShowAll(!showAll)}
//                                      className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
//                                     >
//                                         {showAll ? "Show Less" : "View More"}
//                                     </button>
//                                 )} */}
//                             </div>
//                         ) : (
//                             <p className="text-gray-300">You haven't attempted any quizzes yet.</p>
//                         )}
//                     </motion.div>

                

//                 {/* Sidebar Area */}
//                 <div className="w-3/10 pl-4">
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         transition={{ duration: 0.5 }}
//                         className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
//                     >
//                         <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
//                             Dashboard
//                         </h2>
//                         <div className="space-y-6">
//                             <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
//                                 <h3 className="text-xl font-semibold text-orange-400 mb-3">Profile Information</h3>
//                                 <p className="text-gray-300">Name: {user.name}</p>
//                                 <p className="text-gray-300">Email: {user.email}</p>
//                             </div>
//                             <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
//                                 <h3 className="text-xl font-semibold text-orange-400 mb-3">Account Activity</h3>
//                                 <p className="text-gray-300">
//                                     <span className="font-bold">Joined:</span>{" "}
//                                     {new Date(user.createdAt).toLocaleDateString("en-US", {
//                                         year: "numeric",
//                                         month: "long",
//                                         day: "numeric",
//                                     })}
//                                 </p>
//                                 <p className="text-gray-300">
//                                     <span className="font-bold">Last Login:</span>{" "}
//                                     {user.lastLogin ? formatDate(user.lastLogin) : "N/A"}
//                                 </p>
//                             </div>
//                         </div>
                        // <button
                        //     onClick={handleLogout}
                        //     className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                        // >
                        //     Logout
                        // </button>
//                     </motion.div>
//                 </div>
//             </div>
//             <Footer />
//         </motion.div>
//         </div>
//     );
// };

// export default DashboardPage;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatDate } from "../utils/date";
import { useAuthStore } from "../store/authStore";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import axios from "axios";

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute ${color} ${size} rounded-full opacity-30`}
      style={{ top, left }}
      animate={{
        y: [0, 20, 0], // Floating effect
        x: [0, 10, -10, 0], // Slight side movement
        opacity: [0.2, 0.4, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror",
        delay,
      }}
    />
  );
};

const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const [quizzes, setQuizzes] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingg, setLoadingg] = useState(true);
  const [error, setError] = useState(null);
  const [errorr, setErrorr] = useState(null);
  const [showAllQuizzes, setShowAllQuizzes] = useState(false);

  const handleLogout = () => {
            logout();
        };

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!user || !user._id) {
        console.error("User ID is missing, cannot fetch quizzes.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/quiz/result/${user._id}`, {
          withCredentials: true,
        });
        setQuizzes(response.data.data || []);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [user]);

  useEffect(() => {
    const fetchCompletedQuestions = async () => {
      if (!user || !user._id) {
        console.error("User ID is missing, cannot fetch completed questions.");
        setLoadingg(false);
        return;
      }
      try {
        const responses = await axios.get(
          `/api/code-questions/completed-questions/${user._id}`,
          { withCredentials: true }
        );
        setCompletedQuestions(responses.data || []);
      } catch (err) {
        console.error("Error fetching completed questions:", err);
        setErrorr("Failed to load data.");
      } finally {
        setLoadingg(false);
      }
    };

    fetchCompletedQuestions();
  }, [user]);

  const displayedQuizzes = showAllQuizzes ? quizzes : quizzes.slice(0, 5);

  return (
    <div className="bg-black px-6 mx-auto min-h-screen">
      <Navbar />
      <motion.div
        className="relative bg-black min-h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Floating Elements */}
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="5%" left="10%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-24 h-24" top="20%" left="40%" delay={0} />
        <FloatingShape color="bg-gray-600" size="w-24 h-24" top="30%" left="70%" delay={1} />
        <FloatingShape color="bg-gray-500" size="w-12 h-12" top="50%" left="10%" delay={2} />
        <FloatingShape color="bg-gray-500" size="w-12 h-12" top="80%" left="80%" delay={2} />
        <FloatingShape color="bg-gray-500" size="w-24 h-24" top="80%" left="40%" delay={1} />

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto pt-20 px-6">
        <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-gray-900 mb-4 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-purple-700 text-transparent bg-clip-text">
                User Profile
              </h2>
              {user ? (
                <div>
                  <p className="text-gray-300 text-center">Name: {user.name}</p>
                  <p className="text-gray-300 text-center">Email: {user.email}</p>
                  <button
                            onClick={handleLogout}
                            className="w-full px-6 py-3 mt-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Logout
                        </button>
                </div>
              ) : (
                <p className="text-gray-300 text-center">Loading user data...</p>
              )}
            </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Profile Section */}
           

            {/* Quiz Attempted Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
                Quiz Attempted
              </h2>
              {loading ? (
                <p className="text-gray-300 text-center">Loading quizzes...</p>
              ) : error ? (
                <p className="text-red-400 text-center">{error}</p>
              ) : quizzes.length > 0 ? (
                <div className="overflow-hidden">
                  <table className="w-full table-auto text-gray-300 text-left">
                    <thead>
                      <tr className="bg-gray-800 text-blue-400">
                        <th className="p-3 border-b border-gray-700">No</th>
                        <th className="p-3 border-b border-gray-700">Topic</th>
                        <th className="p-3 border-b border-gray-700">Difficulty</th>
                        <th className="p-3 border-b border-gray-700">Score</th>
                        <th className="p-3 border-b border-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedQuizzes.map((quiz, index) => (
                        <tr key={quiz._id || index} className="hover:bg-gray-700">
                          <td className="p-3 border-b border-gray-700">{index + 1}</td>
                          <td className="p-3 border-b border-gray-700">{quiz.category}</td>
                          <td className="p-3 border-b border-gray-700">{quiz.difficulty}</td>
                          <td className="p-3 border-b border-gray-700">{quiz.score}</td>
                          <td className="p-3 border-b border-gray-700">
                            {quiz.date ? formatDate(quiz.date) : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {quizzes.length > 5 && (
                    <button
                      className="block w-full text-center bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                      onClick={() => setShowAllQuizzes(!showAllQuizzes)}
                    >
                      {showAllQuizzes ? "Show Less" : "View More"}
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-gray-300 text-center">No quizzes attempted yet.</p>
              )}
            </motion.div>

            {/* Completed Coding Questions */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">
                Code Submissions
              </h2>
              {loadingg ? (
                <p className="text-gray-300 text-center">Loading quizzes...</p>
              ) : errorr ? (
                <p className="text-red-400 text-center">{error}</p>
              ) : completedQuestions.length > 0 ? (
                <div className="overflow-hidden">
                  <table className="w-full table-auto text-gray-300 text-left">
                    <thead>
                      <tr className="bg-gray-800 text-blue-400">
                        <th className="p-3 border-b border-gray-700">No</th>
                        <th className="p-3 border-b border-gray-700">Topic</th>
                        <th className="p-3 border-b border-gray-700">Difficulty</th>
                        <th className="p-3 border-b border-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedQuestions.map((code, index) => (
                        <tr key={code._id || index} className="hover:bg-gray-700">
                          <td className="p-3 border-b border-gray-700">{index + 1}</td>
                          <td className="p-3 border-b border-gray-700">{code.questionId.title}</td>
                          <td className="p-3 border-b border-gray-700">{code.questionId.difficulty}</td>
                          <td className="p-3 border-b border-gray-700">
                            {code.timestamp ? formatDate(code.timestamp) : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {quizzes.length > 5 && (
                    <button
                      className="block w-full text-center bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                      onClick={() => setShowAllQuizzes(!showAllQuizzes)}
                    >
                      {showAllQuizzes ? "Show Less" : "View More"}
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-gray-300 text-center">No quizzes attempted yet.</p>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      </div>
  );
};

export default DashboardPage;