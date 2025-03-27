
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import LoadingSpinner from "../components/auth/LoadingSpinner";
import { motion } from "framer-motion";
import { FaBrain, FaGamepad, FaCode, FaPuzzlePiece } from "react-icons/fa";

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


const QuizzesPage = () => {
  const { isLoading } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/quiz/getall");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const difficulties = [
    { name: "Easy", value: "easy", color: "bg-teal-500" },
    { name: "Medium", value: "medium", color: "bg-orange-500" },
    { name: "Hard", value: "hard", color: "bg-purple-500" },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedDifficulty(null);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    if (selectedCategory) {
      navigate("/quiz", {
        state: {
          category: { id: selectedCategory._id, name: selectedCategory.name },
          difficulty: difficulty.value,
        },
      });
    }
  };

  return (
    <>
      <div className="bg-black min-h-screen">
      <motion.div 
        className="relative bg-black min-h-screen overflow-auto"
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
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text mt-6">
          Quizzes Category
        </h1>

        <div className="container mx-auto h-screen p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-white">
            Select a Quiz Category
          </h1>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {/* Category Selection Grid */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category._id}
                    onClick={() => handleCategorySelect(category)}
                    className={`relative p-6 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 overflow-hidden ${
                      selectedCategory?.name === category.name ? "ring-4 ring-indigo-400" : ""
                    }`}
                    style={{
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, #3b0764 0%, #6d28d9 50%, #9333ea 100%)`,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {/* Animated Icon */}
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="absolute top-4 right-4 text-gray-300 text-3xl"
                    >
                      {index % 4 === 0 ? <FaBrain /> : index % 4 === 1 ? <FaGamepad /> : index % 4 === 2 ? <FaCode /> : <FaPuzzlePiece />}
                    </motion.div>

                    {/* Futuristic Grid Pattern */}
                    <div className="absolute inset-0 opacity-30 bg-grid"></div>

                    {/* Animated Neon Border */}
                    <div className="absolute inset-0 border-[3px] border-transparent rounded-lg animate-border-glow"></div>

                    {/* Category Name */}
                    <span className="text-2xl font-semibold text-white relative z-10">
                      {category.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Difficulty Selection */}
              {selectedCategory && (
                <>
                  <h2 className="text-2xl font-bold text-orange-500 text-center mt-8">
                    Select Difficulty
                  </h2>

                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    {difficulties.map((difficulty) => (
                      <motion.div
                        key={difficulty.value}
                        onClick={() => handleDifficultySelect(difficulty)}
                        className={`p-6 rounded-lg shadow-md cursor-pointer ${difficulty.color} text-white text-center transition-transform transform hover:scale-105 ${
                          selectedDifficulty?.value === difficulty.value
                            ? "ring-4 ring-indigo-400"
                            : ""
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-xl font-semibold">
                          {difficulty.name}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              )}
            </>
          )}
        </div>
              </motion.div>
      </div>

      {/* CSS for Futuristic Patterns */}
     
    </>
  );
};

export default QuizzesPage;