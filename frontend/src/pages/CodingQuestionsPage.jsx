


import React, { useState } from "react";
import { Filter, Code } from "lucide-react";
import Filters from "../components/Filters";
import QuestionList from "../components/QuestionList";
import Navbar from "../components/Navbar";
import codingIllustration from "../assets/coding-illustration.png";
import { motion } from "framer-motion";


const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute ${color} ${size} rounded-full opacity-30`}
      style={{ top, left }}
      animate={{
        y: [0, 20, 0], // Floating effect
        x: [0, 10, -10, 0], // Slight side movement
        opacity: [0.2, 0.4, 0.3]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror",
        delay
      }}
    />
  );
};

const CodingQuestionsPage = () => {
  const [filters, setFilters] = useState({});

  return (
    
    // <div className="relative bg-neutral-900 min-h-screen text-white overflow-hidden">
    <div className="relative min-h-screen text-white overflow-hidden bg-neutral-900/50 backdrop-blur-lg">

       <motion.div 
        className="relative bg-black min-h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Floating Asteroids */}
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="5%" left="10%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-16 h-16+" top="20%" left="10%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-24 h-24" top="20%" left="40%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="17%" left="3%" delay={0} />
        <FloatingShape color="bg-gray-600" size="w-24 h-24" top="30%" left="70%" delay={1} />
        <FloatingShape color="bg-gray-500" size="w-12 h-12" top="50%" left="10%" delay={2} />
        <FloatingShape color="bg-gray-700" size="w-20 h-20" top="80%" left="40%" delay={3} />
        <FloatingShape color="bg-gray-500" size="w-28 h-28" top="5%" left="80%" delay={1.5} />

      <Navbar />

      {/* Floating Animated Coding Symbols - Now Positioned on the Left */}
      <div className="absolute inset-0 -z-10">
        <div className="animate-float1  absolute top-20 left-6 text-orange-500 text-4xl opacity-40">
          {"</>"}
        </div>
        <div className="animate-float2 absolute bottom-32 left-12 text-blue-500 text-5xl opacity-30">
          {"{ }"}
        </div>
        <div className="animate-float3 absolute top-40 left-20 text-green-500 text-3xl opacity-25">
          {"//"}
        </div>
      </div>

      {/* Header Section */}
      <div className="text-center mt-8">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text animate-pulse">
          <Code className="inline-block mr-2 text-orange-500" size={36} />
          Coding Questions
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Solve coding problems and enhance your skills 🚀
        </p>
      </div>

      <div className="max-w-7xl mx-auto pt-10 px-6 flex">
        {/* Filters Sidebar */}
        <div className="w-3/12">
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex items-center">
            <Filter className="text-orange-500 mr-2" size={24} />
            <h2 className="text-lg font-semibold text-white">Filters</h2>
          </div>
          <div className="mt-4">
            <Filters onFilterChange={setFilters} />
          </div>
        </div>

        {/* Question List */}
        <div className="w-9/12 pl-6">
          <div className="relative p-8 bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700 neon-glow">
            {/* Coding Sticker/Illustration */}
            <img
              src={codingIllustration}
              alt="Coding"
              className="absolute -top-14 right-6 w-36 opacity-75 hidden md:block"
            />
            <h2 className="text-2xl font-bold flex items-center text-orange-500">
              <Code className="mr-2" size={28} /> Available Problems
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Choose a problem and start coding! 💻🔥
            </p>
            <QuestionList filters={filters} />
          </div>
        </div>
      </div>

      {/* Background Animation Styles */}
      <style>
        {`
          @keyframes float1 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes float2 {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(-10px); }
          }
          @keyframes float3 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(15px); }
          }
          
          .animate-float1 { animation: float1 6s ease-in-out infinite; }
          .animate-float2 { animation: float2 5s ease-in-out infinite; }
          .animate-float3 { animation: float3 7s ease-in-out infinite; }

          .neon-glow {
            box-shadow: 0 0 10px rgba(255, 165, 0, 0.6), 0 0 20px rgba(255, 165, 0, 0.4);
          }
        `}
      </style>
      </motion.div>
    </div>
  );
};

export default CodingQuestionsPage;
                                                              