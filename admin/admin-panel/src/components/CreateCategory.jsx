import React, { useState } from 'react';
import axios from 'axios';

const CreateCategory = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:6000/api/category/add', { name });
            alert(response.data.message);
            setName('');
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Create Category</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
};

export default CreateCategory;
