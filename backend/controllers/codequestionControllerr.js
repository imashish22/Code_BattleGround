

// Add a new coding question
// controllers/userController.js
import CodeCategory from "../models/codecategoryModel.js";
import CodeQuestion from "../models/codequestionModel.js";

// Fetch categories for user
export const getCategories = async (req, res) => {
  try {
    const categories = await CodeCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Fetch questions for user (with pagination and filtering)
export const getQuestions = async (req, res) => {
  const { category, difficulty, page = 1, pageSize = 10 } = req.query;

  try {
    const filters = {};
    if (category) filters.category = category;
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


export const getAllCodeQuestions = async (req, res) => {
  try {
    const codeQuestions = await CodeQuestion.find().populate('category');
    res.status(200).json(codeQuestions);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching code questions",
      error: error.message,
    });
  }
};



export const filterCodeQuestions = async (req, res) => {
  const { category, difficulty } = req.query;

  // Initialize filter object
  const filter = {};

  // Add category filter if present
  if (category) {
    filter.category = category;
  }

  // Add difficulty filter if present
  if (difficulty) {
    filter.difficulty = difficulty;
  }

  try {
    // Fetch questions with applied filters and populate category field
    const codeQuestions = await CodeQuestion.find(filter)
      .populate('category', 'name') // Populating category to include the name
      .exec();

    // Return filtered questions
    res.status(200).json(codeQuestions);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching filtered code questions",
      error: error.message,
    });
  }
};


export const getCodeQuestionById = async (req, res) => {
  try {
    const question = await CodeQuestion.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    res.json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}