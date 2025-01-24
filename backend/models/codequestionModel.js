// models/codequestion.js
import mongoose from 'mongoose';

const codeQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },  // Ensure title is unique
  description: String,
  difficulty: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'CodeCategory' },
  testCases: [
    {
      inputs: [mongoose.Schema.Types.Mixed],
      outputs: [mongoose.Schema.Types.Mixed],
    },
  ],
  sampleInput: String,
  sampleOutput: String,
});

const CodeQuestion = mongoose.model('CodeQuestion', codeQuestionSchema);

export default CodeQuestion;
