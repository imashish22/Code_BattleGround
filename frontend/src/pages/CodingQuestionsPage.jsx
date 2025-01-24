// src/pages/CodingQuestionsPage.js
import React, { useState } from "react";
import Filters from "../components/Filters";
import QuestionList from "../components/QuestionList";
import Navbar from "../components/Navbar";

const CodingQuestionsPage = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="bg-neutral-900 h-full min-h-screen">
        <Navbar />
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text mt-6">
          Coding Questions
        </h1>
      <div className="max-w-7xl mx-auto pt-20 px-6 flex">
        <div className="w-3/12">
          <Filters onFilterChange={setFilters} />
        </div>
        <div className="w-9/12 pl-4">
          <div className="p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800">
            <QuestionList filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingQuestionsPage;
