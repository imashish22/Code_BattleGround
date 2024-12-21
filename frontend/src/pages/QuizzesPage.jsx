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
          category: selectedCategory._id, 
          difficulty: difficulty.value,
        },
      });
    }
  };

  return (
    <>
      <div className="bg-black">
        <Navbar />

        <div className="container mx-auto p-6">
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
                    className={`p-6 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
                      selectedCategory?.name === category.name
                        ? "ring-4 ring-offset-2 ring-indigo-400"
                        : ""
                    }`}
                    style={{
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, #F6AD55 0%, rgba(255, 165, 0, 0.8) 100%)`, // Apply orange gradient
                    }}
                  >
                    {/* Category Name */}
                    <span className="text-2xl font-semibold text-white">
                      {category.name}
                    </span>
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
