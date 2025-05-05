



import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const [difficulty, setDifficulty] = useState("easy"); // Default difficulty level
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [attemptNumber, setAttemptNumber] = useState(1); // For tracking attempt number
  const [sortBy, setSortBy] = useState("score"); // Sort by score or time taken
  const [category, setCategory] = useState(""); // Category for filtering
  const [categories, setCategories] = useState(["Math", "Science", "Programming"]); // Example categories

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

  // Fetch leaderboard data from the backend
  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URI}/api/leaderboards/${difficulty}`,
        {
          params: {
            attemptNumber,
            sortBy,
            category,
          },
        }
      );

      // Filter leaderboard based on the attemptNumber selected
      setLeaderboard(response.data);
    } catch (err) {
      setError("Failed to fetch leaderboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch leaderboard whenever the difficulty, attemptNumber, sortBy, or category changes
  useEffect(() => {
    fetchLeaderboard();
  }, [difficulty, attemptNumber, sortBy, category]);

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100">
      <motion.div
        className="relative bg-white min-h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Floating Asteroids */}
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="5%" left="10%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="10%" left="30%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-24 h-24" top="58%" left="40%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="77%" left="3%" delay={0} />
        <FloatingShape color="bg-gray-600" size="w-24 h-24" top="30%" left="70%" delay={1} />
        <FloatingShape color="bg-gray-500" size="w-12 h-12" top="50%" left="10%" delay={2} />
        <FloatingShape color="bg-gray-500" size="w-28 h-28" top="70%" left="80%" delay={1.5} />

        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="sm:text-4xl font-extrabold text-center bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text mb-6 text-3xl">
            Leaderboard
          </h1>

          {/* Difficulty Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {["easy", "medium", "hard"].map((level) => (
              <button
                key={level}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  difficulty === level
                    ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setDifficulty(level)}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>

          {/* Dropdowns for filtering */}
          <div className="flex justify-center gap-8 mb-8">
            {/* Attempt Number Dropdown */}
            <div className="flex items-center">
              <label htmlFor="attemptNumber" className="mr-2 text-black text-lg">
                Attempt Number
              </label>
              <select
                id="attemptNumber"
                value={attemptNumber}
                onChange={(e) => setAttemptNumber(e.target.value)}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg"
              >
                <option value={1}>First Attempt</option>
                <option value={2}>Second Attempt</option>
                <option value={3}>Third Attempt</option>
              </select>
            </div>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-center">
              <p className="text-gray-400 text-lg animate-pulse">
                Loading leaderboard...
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-center text-red-400">
              <p>{error}</p>
            </div>
          )}

          {/* Leaderboard Table */}
          {!loading && !error && leaderboard.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-sm bg-gray-800 shadow-md rounded-lg">
                <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-xl text-center text-black font-semibold uppercase">Rank</th>
                    <th className="px-6 py-4 text-xl text-center font-bold text-black uppercase">Username</th>
                    <th className="px-6 py-4 text-xl text-center font-semibold text-black uppercase">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user, index) => (
                    <tr
                      key={user.userId}
                      className={`${index % 2 === 0 ? "bg-gray-900" : "bg-gray-700"} hover:bg-gray-600`}
                    >
                      <td className="px-6 py-4 text-center">{index + 1}</td>
                      <td className="px-6 py-4 font-bold text-center uppercase">{user.username}</td>
                      <td className="px-6 py-4 text-center">{user.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* No Data Message */}
          {!loading && !error && leaderboard.length === 0 && (
            <div className="text-center text-gray-400">
              <p>No leaderboard data available.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
