import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CodeCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  // Fetch all categories from the backend
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/code-categories/get-all');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Failed to load categories');
    }
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert('Please enter a category name.');
      return;
    }
    try {
      const response = await axios.post('/api/code-categories/create', { name: newCategory });

      // Check if the response contains a category and update the state
      if (response.data && response.data.category) {
        setCategories([...categories, response.data.category]);
        setNewCategory('');
      } else {
        alert('Error: Category not returned from backend');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert(error.response?.data?.message || 'Error adding category');
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await axios.delete(`/api/code-categories/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Code Category Manager</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleAddCategory}>
          Add New Category
        </button>
      </div>
      <h3>Existing Categories</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            category ? (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ) : null
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CodeCategory;
