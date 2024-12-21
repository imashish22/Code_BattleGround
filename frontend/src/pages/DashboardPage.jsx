import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatDate } from "../utils/date"; // Ensure this function is defined
import { useAuthStore } from "../store/authStore";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import axios from "axios";

const DashboardPage = () => {
    const { user, logout } = useAuthStore(); // Use destructured `user` and `logout`
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false); // Track whether to show all quizzes or just the last 5

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
                const response = await axios.get(`http://localhost:5000/api/quiz-results/${user._id}`, {
                    withCredentials: true,
                });
                console.log("Fetched quizzes data:", response.data);
                setQuizzes(response.data.data || []); // Update the quizzes state with the response data
            } catch (err) {
                console.error("Error fetching quizzes:", err);
                setError("Failed to load quizzes.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, [user]);

    const displayedQuizzes = showAll ? quizzes : quizzes.slice(0, 5); // Show all or the last 5 quizzes

    return (
        <div className="bg-neutral-900">
            <Navbar />
            <div className="max-w-7xl bg-neutral-900 mx-auto pt-20 px-6 flex">
                {/* Main Content Area */}
                <div className="w-7/10 pr-4 overflow-y-auto h-screen">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
                    >
                        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                            Quiz Attempted
                        </h2>
                        {loading ? (
                            <p className="text-gray-300">Loading quizzes...</p>
                        ) : error ? (
                            <p className="text-red-400">{error}</p>
                        ) : quizzes.length > 0 ? (
                            <div>
                                <table className="w-full table-auto text-gray-300 text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-800 text-blue-400">
                                            <th className="p-3 border-b border-gray-700">No</th>
                                            <th className="p-3 border-b border-gray-700">Topic</th>
                                            <th className="p-3 border-b border-gray-700">Difficulty</th>
                                            <th className="p-3 border-b border-gray-700">Score</th>
                                            <th className="p-3 border-b border-gray-700">Date Attempted</th>
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
                                        onClick={() => setShowAll(!showAll)}
                                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                                    >
                                        {showAll ? "Show Less" : "View More"}
                                    </button>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-300">You haven't attempted any quizzes yet.</p>
                        )}
                    </motion.div>
                </div>

                {/* Sidebar Area */}
                <div className="w-3/10 pl-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
                    >
                        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
                            Dashboard
                        </h2>
                        <div className="space-y-6">
                            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
                                <h3 className="text-xl font-semibold text-orange-400 mb-3">Profile Information</h3>
                                <p className="text-gray-300">Name: {user.name}</p>
                                <p className="text-gray-300">Email: {user.email}</p>
                            </div>
                            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
                                <h3 className="text-xl font-semibold text-orange-400 mb-3">Account Activity</h3>
                                <p className="text-gray-300">
                                    <span className="font-bold">Joined:</span>{" "}
                                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <p className="text-gray-300">
                                    <span className="font-bold">Last Login:</span>{" "}
                                    {user.lastLogin ? formatDate(user.lastLogin) : "N/A"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Logout
                        </button>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPage;
