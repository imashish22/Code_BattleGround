import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";  
import Navbar from "./Navbar";
import Footer from "../pages/Footer";
import LoadingSpinner from "./auth/LoadingSpinner";

const Quiz = () => {
  const { isLoading } = useAuthStore(); // Get the loading state from useAuthStore
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [selectedDifficulty, setSelectedDifficulty] = useState(null); // Track selected difficulty
  const navigate = useNavigate();

  const categories = [
    {
      name: "SQL",
      value: "sql",
      color: "bg-blue-500",
      image:
        "https://play-lh.googleusercontent.com/qfvf-FZGZBFYEvoL7gWR0th16iV4grOWsyQUlfK_tVxJQMrTsGszotAOV9VpwoTDgXAC",
    },
    {
      name: "Docker",
      value: "docker",
      color: "bg-yellow-500",
      image:
        "https://logos-world.net/wp-content/uploads/2021/02/Docker-Symbol.png",
    },
    {
      name: "Linux",
      value: "linux",
      color: "bg-green-500",
      image:
        "https://www.pngall.com/wp-content/uploads/5/Linux-Logo-PNG-Download-Image.png",
    },
    {
      name: "DEVOPS",
      value: "devops",
      color: "bg-red-500",
      image:
        "https://www.itrsgroup.com/sites/default/files/inline-images/DevOps%20lifecycle%20graphic_1.png",
    },
    {
      name: "Bash",
      value: "bash",
      color: "bg-red-500",
      image:
        "https://cdn4.iconfinder.com/data/icons/proglyphs-computers-and-development/512/Terminal-512.png",
    },
    {
      name: "CMS",
      value: "cms",
      color: "bg-red-500",
      image: "https://cdn-icons-png.flaticon.com/512/12470/12470102.png"
    },
  ];

  const difficulties = [
    { name: "Easy", value: "easy", color: "bg-teal-500" },
    { name: "Medium", value: "medium", color: "bg-orange-500" },
    { name: "Hard", value: "hard", color: "bg-purple-500" },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    if (selectedCategory) {
      navigate("/quiz-container", {
        state: {
          category: selectedCategory.value,
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

          {isLoading ? ( // Show loading spinner when isLoading is true
            <LoadingSpinner />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
                {categories.map((category) => (
                  <div
                    key={category.value}
                    onClick={() => handleCategorySelect(category)}
                    className={`p-6 rounded-lg shadow-md cursor-pointer ${category.color} text-white text-center transition-transform transform hover:scale-105 ${
                      selectedCategory?.value === category.value
                        ? "ring-4 ring-offset-2 ring-indigo-400"
                        : ""
                    }`}
                  >
                    {/* Image Section */}
                    <div className="w-full h-40">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>
                    {/* Category Name */}
                    <span className="text-2xl font-semibold mt-4">
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

export default Quiz;
