import mongoose from 'mongoose';

// Define the Question schema
const QuestionSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true // Array of options for multiple-choice questions
    },
    answer: {
        type: String,
        required: true // Correct answer
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'], // Difficulty levels
        required: true
    }
}, { timestamps: true });

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
