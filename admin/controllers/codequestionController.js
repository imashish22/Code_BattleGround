// controllers/codeQuestionController.js
import CodeQuestion from "../models/codequestion.js";
import CodeCategory from "../models/codecategory.js";

// Add a new coding question
export const addCodeQuestion = async (req, res) => {
  const { title, description, difficulty, category, testCases, sampleInput, sampleOutput } = req.body;

  // Check if all required fields are provided
  if (!title || !description || !difficulty || !category || !testCases) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the category exists by the ID provided
    const existingCategory = await CodeCategory.findById(category);

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Check if a question with the same title already exists
    const existingQuestion = await CodeQuestion.findOne({ title });

    if (existingQuestion) {
      return res.status(400).json({ error: "A question with this title already exists" });
    }

    // Create the new code question
    const newCodeQuestion = new CodeQuestion({
      title,
      description,
      difficulty,
      category,
      testCases,
      sampleInput,
      sampleOutput,
    });

    // Save the new question to the database
    await newCodeQuestion.save();

    res.status(201).json({
      message: "Code question added successfully",
      question: newCodeQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding code question",
      error: error.message,
    });
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
