import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CodeQuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
  });
  const [loading, setLoading] = useState(true); // State for loading
  const [loadingCategories, setLoadingCategories] = useState(true); // State for loading categories

  // Fetch questions and categories on page load
  useEffect(() => {
    // Fetch categories
    axios
      .get('/api/code-categories/get-all')
      .then((response) => {
        setCategories(response.data);
        setLoadingCategories(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoadingCategories(false);
      });

    // Fetch questions
    fetchQuestions();
  }, []);

  // Fetch all questions from the backend
  const fetchQuestions = () => {
    setLoading(true); // Set loading true while fetching questions
    axios
      .get('/api/code-questions/all')
      .then((response) => {
        setQuestions(response.data);
        setLoading(false); // Set loading false after questions are fetched
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
        setLoading(false);
      });
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Apply filters and update the questions
  const applyFilters = () => {
    setLoading(true); // Set loading true while applying filters
    let filterParams = {};

    if (filters.category) {
      filterParams.category = filters.category;
    }
    if (filters.difficulty) {
      filterParams.difficulty = filters.difficulty;
    }

    axios
      .get('/api/code-questions/filter', { params: filterParams })
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data); 
        setLoading(false); // Set loading false after applying filters
      })
      .catch((error) => {
        console.error('Error applying filters:', error);
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <h3>All Coding Questions</h3>

      {/* Filter Form */}
      <div className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Category</label>
            <select
              className="form-control"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {loadingCategories ? (
                <option>Loading categories...</option>
              ) : (
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Difficulty</label>
            <select
              className="form-control"
              name="difficulty"
              value={filters.difficulty}
              onChange={handleFilterChange}
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="col-md-4 d-flex align-items-end">
            <button className="btn btn-primary" onClick={applyFilters}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Displaying Questions */}
      {loading ? (
        <div>Loading questions...</div> // Loading state
      ) : (
        <div>
          <h4>Total Questions: {questions.length}</h4>
          {questions.length === 0 ? (
            <p>No questions found for the selected filters.</p> // Message for no data found
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Difficulty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr key={question._id}>
                    <td>{question.title}</td>
                    <td>{question.category?.name}</td>
                    <td>{question.difficulty}</td>
                    <td>
                      <button className="btn btn-info btn-sm">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeQuestionPage;
