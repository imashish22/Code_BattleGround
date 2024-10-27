import Category from '../models/category.js';


export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const newCategory = new Category({ name });
        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCategory = async (req, res) => {
    const { id } = req.params; 

    try {
        const category = await Category.findById(id); 

        if (!category) {
            return res.status(404).json({ message: 'Category not found' }); 
        }

        res.status(200).json(category); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};


export const getAllCategories = async (req, res) => {
    console.log("Fetching all categories..."); // Debug log
    try {
        const categories = await Category.find(); // Fetch all categories from the database
        console.log(categories); // Log the fetched categories
        res.status(200).json(categories); // Send the categories as a JSON response
    } catch (error) {
        console.error("Error fetching categories:", error); // Log any errors
        res.status(500).json({ message: error.message }); // Handle errors appropriately
    }
};


export const deleteCategory = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters

    try {
        const category = await Category.findByIdAndDelete(id); // Find and delete the category

        if (!category) {
            return res.status(404).json({ message: 'Category not found' }); // Handle case where category is not found
        }

        res.status(200).json({ message: 'Category deleted successfully' }); // Send success message
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors appropriately
    }
};
