import Category from "../models/categoryModel.js";

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories from the database
        res.status(200).json(categories); // Send the categories as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
