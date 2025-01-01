    


import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Leaderboard = () => {
  const [difficulty, setDifficulty] = useState("easy"); // Default difficulty level
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch leaderboard data from the backend
  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/leaderboard/${difficulty}`);
      setLeaderboard(response.data);
    } catch (err) {
      setError("Failed to fetch leaderboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch leaderboard whenever the difficulty changes
  useEffect(() => {
    fetchLeaderboard();
  }, [difficulty]);

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100">
        <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text mb-6">
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
                  <th className="px-6 py-4 text-left font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left font-semibold">Username</th>
                  <th className="px-6 py-4 text-left font-semibold">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                  <tr
                    key={user.userId}
                    className={`${
                      index % 2 === 0 ? "bg-gray-900" : "bg-gray-700"
                    } hover:bg-gray-600`}
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.totalScore}</td>
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
    </div>
  );
};

export default Leaderboard;
