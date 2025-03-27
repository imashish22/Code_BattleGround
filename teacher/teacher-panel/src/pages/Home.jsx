import React from "react";
import Lottie from "react-lottie-player";
import animationData from "../assets/rocket.json"; // Store your Lottie JSON file in src/assets/

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 text-center">
      {/* Lottie Animation */}
      <div className="flex justify-center items-center">
        <Lottie
          loop
          animationData={animationData}
          play
          style={{ width: "70%", maxWidth: 300, height: "auto" }}
        />
      </div>

      {/* Title & Description */}
      <h1 className="text-3xl md:text-5xl font-bold text-orange-700 mt-6">
        Welcome to Code Battleground
      </h1>
      <p className="text-gray-600 mt-4 text-base md:text-lg">
        Empowering teachers to create and manage coding contests with ease.
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 px-4">
        {/* Card 1 - Create Contest */}
        <div className="relative p-6 md:p-10 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 shadow-xl transition-all transform hover:scale-110 hover:shadow-2xl border border-transparent hover:border-neon">
          <h2 className="text-xl md:text-3xl font-bold text-white">✨ Create Contests</h2>
          <p className="text-gray-200 mt-3">
            Easily create quiz contests by uploading an Excel file with questions.
          </p>
        </div>

        {/* Card 2 - View Scores */}
        <div className="relative p-6 md:p-10 rounded-2xl bg-gradient-to-br from-green-600 to-teal-700 shadow-xl transition-all transform hover:scale-110 hover:shadow-2xl border border-transparent hover:border-neon">
          <h2 className="text-xl md:text-3xl font-bold text-white">📊 View Scores</h2>
          <p className="text-gray-200 mt-3">
            See student scores in real-time and track contest performance.
          </p>
        </div>

        {/* Card 3 - Download Results */}
        <div className="relative p-6 md:p-10 rounded-2xl bg-gradient-to-br from-orange-600 to-red-700 shadow-xl transition-all transform hover:scale-110 hover:shadow-2xl border border-transparent hover:border-neon">
          <h2 className="text-xl md:text-3xl font-bold text-white">📥 Download Results</h2>
          <p className="text-gray-200 mt-3">
            Download quiz results in Excel format for analysis and record-keeping.
          </p>
        </div>
      </div>

      {/* Table Representation with Gradient Background */}
      <div className="mt-10 overflow-x-auto px-2">
        <table className="w-full border-collapse border shadow-lg bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-2xl overflow-hidden text-xs md:text-base">
          <thead className="bg-gradient-to-r from-orange-500 to-red-500">
            <tr>
              <th className="p-2 md:p-4 border border-white">Question</th>
              <th className="p-2 md:p-4 border border-white">Option A</th>
              <th className="p-2 md:p-4 border border-white">Option B</th>
              <th className="p-2 md:p-4 border border-white">Option C</th>
              <th className="p-2 md:p-4 border border-white">Option D</th>
              <th className="p-2 md:p-4 border border-white">Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-600 transition">
              <td className="p-2 md:p-4 border">What is 2+2?</td>
              <td className="p-2 md:p-4 border">3</td>
              <td className="p-2 md:p-4 border">4</td>
              <td className="p-2 md:p-4 border">5</td>
              <td className="p-2 md:p-4 border">6</td>
              <td className="p-2 md:p-4 border font-bold text-green-400">4</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Download Sample Excel */}
      <div className="mt-6 px-4">
        <a
          href="/sample.xlsx"
          download="sample.xlsx"
          className="bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg hover:bg-orange-600 transition transform hover:scale-110"
        >
          📥 Download Sample File
        </a>
      </div>
    </div>
  );
};

export default Home;
