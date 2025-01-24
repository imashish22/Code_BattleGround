// src/components/QuestionList.js
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const QuestionList = ({ filters }) => {
  const [questions, setQuestions] = useState([]);
  const { user } = useAuthStore(); // Fetch the logged-in user's details
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuestions();
    // Reset when filters change
    return () => {
      setQuestions([]);
      setPage(1);
      setHasMore(true);
    };
  }, [filters]);

  const fetchQuestions = async (filters, page, pageSize = 10) => {
    const response = await axios.get(`api/code-questions/questions`, {
      params: { ...filters, page, pageSize },
    });
    return response.data;
  };

  const loadQuestions = async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const data = await fetchQuestions(filters, page);
      setQuestions((prev) => [...prev, ...data]);
      if (data.length < 10) setHasMore(false);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading questions:", error);
    }
    setLoading(false);
  };
  

  return (
    <div className="p-6">
      <table className="table-auto w-full text-white ">
        <thead>
          <tr>
          <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Difficulty</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question,index) => (
            <tr key={question._id} className="border-b border-gray-600">
                <td className="px-4 py-2">{index +1 }</td>
              <td className="px-4 py-2">{question.title}</td>
              <td className="px-4 py-2">{question.category?.name}</td>
              <td className="px-4 py-2">{question.difficulty}</td>
              <td className="px-4 py-2 text-center">
              <button
  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
  onClick={() => navigate(`/questions/${question._id}`)}
>
  Solve
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {hasMore && !loading && (
        <button
          onClick={loadQuestions}
          className="w-full px-4 py-2 mt-4 bg-blue-500 hover:bg-blue-600 rounded"
        >
          Load More
        </button>
      )}
      
      {loading && <p className="text-white">Loading...</p>}
    </div>
  );
};

export default QuestionList;
