import mongoose from 'mongoose';

const completedQuestionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CodeQuestion',
        required: true
    },
  
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const CompletedQuestion = mongoose.model('CompletedQuestion', completedQuestionSchema);
export default CompletedQuestion;
