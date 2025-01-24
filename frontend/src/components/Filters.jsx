// src/components/Filters.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Filters = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

   const fetchCategories = async () => {
    const response = await axios.get(`api/code-questions/categories`);
    return response.data;
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    loadCategories();
  }, []);

  const handleFilterChange = () => {
    onFilterChange({
      category: selectedCategory,
      difficulty: selectedDifficulty,
    });
  };

  return (
    <div className="p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg text-white">
    <h3 className="mb-4 text-xl font-semibold">Filters</h3>
    <div className="mb-4">
      <label className="block mb-2">Category</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
    <div className="mb-4">
      <label className="block mb-2">Difficulty</label>
      <select
        value={selectedDifficulty}
        onChange={(e) => setSelectedDifficulty(e.target.value)}
        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
      >
        <option value="">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
    <button
      onClick={handleFilterChange}
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded w-full"
    >
      Apply Filters
    </button>
  </div>
  );
};

export default Filters;
