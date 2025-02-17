
import axios from 'axios';
import CodeQuestion from '../models/codequestionModel.js';
import dotenv from 'dotenv';

dotenv.config();

// Judge0 API Configuration
const JUDGE0_BASE_URL = "https://judge029.p.rapidapi.com/submissions";
const JUDGE0_API_KEY = process.env.RAPIDAPI_KEY; // Replace with your Judge0 API Key if required

// Function to execute any coding problem
export const executeCode = async (req, res) => {
    try {
        // const { id } = req.params; // Extract Question ID from request
        const { sourceCode, languageId,id } = req.body; // Get user's code and language ID

        // 1️⃣ Fetch question from the database
        const question = await CodeQuestion.findById(id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // 2️⃣ Prepare test cases for execution
        let testResults = [];
        for (const testCase of question.testCases) {
            // Convert array inputs into formatted string (for Judge0)
            const formattedInput = testCase.inputs.join("\n");
            const expectedOutput = testCase.outputs.map(String).join("\n"); // Convert numbers to strings

            // 3️⃣ Send submission to Judge0 API
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

            // 4️⃣ Extract execution results
            const actualOutput = submissionResponse.data.stdout?.trim() || "";
            const passed = actualOutput === expectedOutput;

            // 5️⃣ Store test case result
            testResults.push({
                input: testCase.inputs,
                expectedOutput: expectedOutput.split("\n"),
                actualOutput: actualOutput.split("\n"),
                status: submissionResponse.data.status.description,
                passed
            });
        }

        // 6️⃣ Return all test case results
        return res.json({
            questionTitle: question.title,
            results: testResults
        }); 

    } catch (error) {
        console.error("Error executing code:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
