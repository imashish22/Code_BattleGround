import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CodeQuestion = () => {
  const [categories, setCategories] = useState([]);
  const [questionData, setQuestionData] = useState({
    title: '',
    description: '',
    difficulty: '',
    category: '',
    testCases: [{ inputs: '', outputs: '' }],
    sampleInput: '',
    sampleOutput: ''
  });

  // Fetch categories on component mount
  useEffect(() => {
    axios.get('/api/code-categories/get-all') // Assuming '/api/categories/get-all' returns the category data
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle changes in test case inputs/outputs
  const handleTestCaseChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTestCases = [...questionData.testCases];
    updatedTestCases[index][name] = value;
    setQuestionData((prevData) => ({
      ...prevData,
      testCases: updatedTestCases
    }));
  };

  // Add new test case field
  const addTestCase = () => {
    setQuestionData((prevData) => ({
      ...prevData,
      testCases: [...prevData.testCases, { inputs: '', outputs: '' }]
    }));
  };

  // Remove a test case field
  const removeTestCase = (index) => {
    const updatedTestCases = questionData.testCases.filter((_, i) => i !== index);
    setQuestionData((prevData) => ({
      ...prevData,
      testCases: updatedTestCases
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/api/code-questions/add', questionData) // Assuming '/api/code-questions/add' is the endpoint to add questions
      .then((response) => {
        alert('Question added successfully!');
      })
      .catch((error) => {
        console.error('Error adding question:', error);
        alert('Error adding question!');
      });
  };

  return (
    <div className="container mt-5">
      <h3>Add New Coding Question</h3>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={questionData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={questionData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Difficulty */}
        <div className="mb-3">
          <label className="form-label">Difficulty</label>
          <select
            className="form-control"
            name="difficulty"
            value={questionData.difficulty}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-control"
            name="category"
            value={questionData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Test Cases */}
        <h5>Test Cases</h5>
        {questionData.testCases.map((testCase, index) => (
          <div key={index} className="mb-3">
            <div className="d-flex">
              <div className="w-50">
                <label className="form-label">Input</label>
                <textarea
                  className="form-control"
                  name="inputs"
                  value={testCase.inputs}
                  onChange={(e) => handleTestCaseChange(e, index)}
                  required
                />
              </div>
              <div className="w-50 ms-3">
                <label className="form-label">Output</label>
                <textarea
                  className="form-control"
                  name="outputs"
                  value={testCase.outputs}
                  onChange={(e) => handleTestCaseChange(e, index)}
                  required
                />
              </div>
            </div>
            <button type="button" className="btn btn-danger mt-2" onClick={() => removeTestCase(index)}>
              Remove Test Case
            </button>
          </div>
        ))}

        {/* Add Test Case Button */}
        <button type="button" className="btn btn-primary mb-3" onClick={addTestCase}>
          Add Test Case
        </button>

        {/* Sample Input */}
        <div className="mb-3">
          <label className="form-label">Sample Input</label>
          <textarea
            className="form-control"
            name="sampleInput"
            value={questionData.sampleInput}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Sample Output */}
        <div className="mb-3">
          <label className="form-label">Sample Output</label>
          <textarea
            className="form-control"
            name="sampleOutput"
            value={questionData.sampleOutput}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success">Add Question</button>
      </form>
    </div>
  );
};

export default CodeQuestion;
