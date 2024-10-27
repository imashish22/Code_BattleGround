import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Import icon for delete action

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState(null);

    // Fetch all categories on component mount
    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories/getall');
            setCategories(response.data);
        } catch (error) {
            setError('Error fetching categories: ' + error.message);
        }
    };

    // Add a new category
    const addCategory = async (e) => {
        e.preventDefault();
        if (!newCategory) return;

        try {
            await axios.post('/api/categories/create', { name: newCategory });
            setNewCategory('');
            fetchCategories();
        } catch (error) {
            setError('Error adding category: ' + error.message);
        }
    };

    // Delete a category by ID
    const deleteCategory = async (id) => {
        try {
            await axios.delete(`/api/categories/${id}`);
            fetchCategories();
        } catch (error) {
            setError('Error deleting category: ' + error.message);
        }
    };

    // Call fetchCategories when the component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <h1 className="font-weight-bold">Category Manager</h1>
            {error && <p className="text-danger">{error}</p>}

            {/* Add Category Form */}
            <form onSubmit={addCategory} className="form-inline mb-3">
                <input
                    type="text"
                    className="form-control mr-2"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                />
                <button type="submit" className="btn btn-primary my-2">Add New Category</button>
            </form>

            {/* Category List */}
            <h2 className="font-weight-bold my-3">Existing Categories</h2>
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
                        <tr key={category._id}>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td>
                                <button
                                    onClick={() => deleteCategory(category._id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryManager;
