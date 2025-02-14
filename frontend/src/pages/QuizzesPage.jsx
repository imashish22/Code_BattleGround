import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import axios from 'axios'; // Import axios for API requests
import { useAuthStore } from "../store/authStore";
import LoadingSpinner from "../components/auth/LoadingSpinner";

const QuizzesPage = () => {
  const { isLoading } = useAuthStore(); // Get the loading state from useAuthStore
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [selectedDifficulty, setSelectedDifficulty] = useState(null); // Track selected difficulty
  const [categories, setCategories] = useState([]); // Track fetched categories
  const navigate = useNavigate();

  // Fetch categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/quiz/getall'); 
        setCategories(response.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
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
          // category: selectedCategory._id, 
          // categoryName: selectedCategory.name,
          category: { id: selectedCategory._id, name: selectedCategory.name },
          difficulty: difficulty.value,
        },
      });
    }
  };

  return (
    <>
      <div className="bg-black">
        <Navbar />
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text mt-6">
          Quizzes Questions
        </h1>
        <div className="container mx-auto h-screen p-6">
          <h1 className="text-3xl font-bold text-center mb-6">
            Select a Quiz Category
          </h1>

          {isLoading ? ( 
            <LoadingSpinner />
          ) : (
            <>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
  {categories.map((category) => (
    <div
      key={category._id}
      onClick={() => handleCategorySelect(category)}
      className={`relative p-6 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 overflow-hidden ${
        selectedCategory?.name === category.name ? "ring-4 ring-offset-2 ring-indigo-400" : ""
      }`}
      style={{
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, #3b0764 0%, #6d28d9 50%, #9333ea 100%)`, // Purple neon gradient
      }}
    >
      {/* Futuristic Grid Pattern */}
      <div className="absolute inset-0 opacity-30 bg-grid"></div>

      {/* Animated Neon Border */}
      <div className="absolute inset-0 border-[3px] border-transparent rounded-lg animate-border-glow"></div>

      {/* Category Name */}
      <span className="text-2xl font-semibold text-white relative z-10">{category.name}</span>

      {/* CSS for Futuristic Patterns */}
      <style>
        {`
          /* High-Tech Grid Pattern */
          .bg-grid {
            background-image: 
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
          }

          /* Animated Border Glow */
          @keyframes borderGlow {
            0% {
              border-color: rgba(147, 51, 234, 0.8);
              box-shadow: 0 0 10px rgba(147, 51, 234, 0.5);
            }
            50% {
              border-color: rgba(109, 40, 217, 0.8);
              box-shadow: 0 0 20px rgba(109, 40, 217, 0.6);
            }
            100% {
              border-color: rgba(147, 51, 234, 0.8);
              box-shadow: 0 0 10px rgba(147, 51, 234, 0.5);
            }
          }
          
          .animate-border-glow {
            animation: borderGlow 3s infinite alternate;
          }
        `}
      </style>
    </div>
  ))}
</div>




              {selectedCategory && (
                <>
                  <h2 className="text-2xl font-bold text-orange-500 text-center mt-8">
                    Select Difficulty
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 justify-center">
                    {difficulties.map((difficulty) => (
                      <div
                        key={difficulty.value}
                        onClick={() => handleDifficultySelect(difficulty)}
                        className={`p-6 rounded-lg shadow-md cursor-pointer ${difficulty.color} text-white text-center transition-transform transform hover:scale-105 ${
                          selectedDifficulty?.value === difficulty.value
                            ? "ring-4 ring-offset-2 ring-indigo-400"
                            : ""
                        }`}
                      >
                        <span className="text-xl font-semibold">
                          {difficulty.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default QuizzesPage;
