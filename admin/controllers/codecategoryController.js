import CodeCategory from "../models/codecategory.js";

// Create a new Code Category

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required' });

    const existingCategory = await CodeCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new CodeCategory({ name });
    await newCategory.save();

    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getQuestions = async (req, res) => {
  const { category, difficulty, page = 1, pageSize = 10 } = req.query;

  try {
    const filters = {};
    if (category) filters.CodeCategory = category;
    if (difficulty) filters.difficulty = difficulty;

    const questions = await CodeQuestion.find(filters)
      .populate("category", "name")
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize));

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
};

// Get all Code Categories
export const getAllCodeCategories = async (req, res) => {
  try {
    const categories = await CodeCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single Code Category by ID
export const getCodeCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await CodeCategory.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Code category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching code category",
      error: error.message,
    });
  }
};

// Update a Code Category
export const updateCodeCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, color, imageUrl } = req.body;

  try {
    const updatedCategory = await CodeCategory.findByIdAndUpdate(
      id,
      { name, description, color, imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Code category not found" });
    }

    res.status(200).json({
      message: "Code category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating code category",
      error: error.message,
    });
  }
};

// Delete a Code Category
export const deleteCodeCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await CodeCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Code category not found" });
    }

    res.status(200).json({ message: "Code category deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting code category",
      error: error.message,
    });
  }
};
