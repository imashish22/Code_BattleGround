
import axios from 'axios';
import CodeQuestion from '../models/codequestionModel.js';
import RoomRoomSubmission from '../models/roomsubmission.js';
import dotenv from 'dotenv';

dotenv.config();

const JUDGE0_BASE_URL = "https://judge029.p.rapidapi.com/submissions";
const JUDGE0_API_KEY = process.env.RAPIDAPI_KEY; 

export const roomexecuteCode = async (req, res) => {
    try {
        const { sourceCode, languageId,id ,userId} = req.body; 
        const question = await CodeQuestion.findById(id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        let testResults = [];
        let allPassed = true; 


        for (const testCase of question.testCases) {
            const formattedInput = testCase.inputs.join("\n");
            const expectedOutput = testCase.outputs.map(String).join("\n"); 

            const submissionResponse = await axios.post(`${JUDGE0_BASE_URL}?base64_encoded=false&wait=true`, {
                source_code: sourceCode,
                language_id: languageId,
                stdin: formattedInput
            }, {
                 headers: {
    'x-rapidapi-key': JUDGE0_API_KEY,
    'x-rapidapi-host': 'judge029.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
            });

            const actualOutput = submissionResponse.data.stdout?.trim() || "";
            const passed = actualOutput === expectedOutput;
            if (!passed) allPassed = false;

            testResults.push({
                input: testCase.inputs,
                expectedOutput: expectedOutput.split("\n"),
                actualOutput: actualOutput.split("\n"),
                status: submissionResponse.data.status.description,
                passed
            });
        }

        if (allPassed) {
            const completionExists = await CompletedQuestion.findOne({ userId, questionId: id });

            if (!completionExists) {
                await CompletedQuestion.create({
                    userId,
                    questionId: id,
                    completedAt: new Date()
                });
            }
        }

        return res.json({
            questionTitle: question.title,
            results: testResults
        }); 

    } catch (error) {
        console.error("Error executing code:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
