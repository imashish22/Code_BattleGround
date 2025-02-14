// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();


// const JUDGE0_API_URL = "https://judge029.p.rapidapi.com/submissions";
// const JUDGE0_API_KEY = process.env.RAPIDAPI_KEY;

// export const runCode = async (req, res) => {
//     try {
//         const { source_code, language_id, stdin } = req.body;
//         const response = await axios.post(
//             `${JUDGE0_API_URL}?base64_encoded=false&wait=true`,
//             { source_code, language_id, stdin },
//             {
//                 headers: {
//                     'x-rapidapi-key':JUDGE0_API_KEY,
//                     'x-rapidapi-host': 'judge029.p.rapidapi.com',
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         res.json(response.data);
//     } catch (error) {
//         console.error("Error executing code:", error);
//         res.status(500).json({ error: "Error executing code" });
//         console.log(process.env.RAPIDAPI_KEY);

//     }
// };



// import axios from "axios";
// import CodeQuestion from '../models/codequestionModel.js'; // Ensure correct path
// import dotenv from "dotenv";

// const JUDGE0_API_URL = "https://judge029.p.rapidapi.com/submissions";

// export const runCode = async (req, res) => {
//     try {
//         const { questionId, source_code, language_id } = req.body;

//         // Fetch question from database
//         const question = await CodeQuestion.findById(questionId);
//         if (!question) {
//             return res.status(404).json({ error: "Question not found" });
//         }

//         // Extract test cases
//         const testCases = question.testCases;

//         // Execute each test case with Judge0
//         const results = await Promise.all(
//             testCases.map(async (testCase) => {
//                 const response = await axios.post(
//                     `${JUDGE0_API_URL}?base64_encoded=false&wait=true`,
//                     {
//                         source_code,
//                         language_id,
//                         stdin: testCase.inputs.join("\n"), // Join inputs with new line
//                     },
//                     {
//                         headers: {
//                             "x-rapidapi-key": process.env.RAPIDAPI_KEY, // Store in .env
//                             "x-rapidapi-host": "judge029.p.rapidapi.com",
//                             "Content-Type": "application/json",
//                         },
//                     }
//                 );

//                 // Compare expected vs. actual output
//                 return {
//                     input: testCase.inputs,
//                     expectedOutput: testCase.outputs.map(String),
//                     actualOutput: response.data.stdout ? response.data.stdout.trim().split("\n") : [],
//                     status: response.data.status.description,
//                     passed: JSON.stringify(response.data.stdout?.trim().split("\n")) === JSON.stringify(testCase.outputs),
//                 };
//             })
//         );

//         res.json({ question: question.title, results });
//     } catch (error) {
//         console.error("Error executing code:", error);
//         res.status(500).json({ error: "Error executing code" });
//     }
// };



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
        const { id } = req.params; // Extract Question ID from request
        const { sourceCode, languageId } = req.body; // Get user's code and language ID

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
    'x-rapidapi-key': '240e4b4c0dmsha1d65fa77b2d487p13b50djsn5457f268ddb7',
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
