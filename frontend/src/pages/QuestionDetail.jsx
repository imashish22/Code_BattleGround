




// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import MonacoEditor from "@monaco-editor/react";

// const QuestionDetail = () => {
//   const { id: questionId } = useParams(); // Get question ID from URL
//   const [question, setQuestion] = useState(null);
//   const [code, setCode] = useState("// Write your code here");
//   const [language, setLanguage] = useState("cpp"); // Default language is C++
//   const [output, setOutput] = useState(""); // Store execution output

//   useEffect(() => {
//     // Fetch question details from backend
//     const fetchQuestion = async () => {
//       try {
//         const response = await axios.get(`/api/code-questions/${questionId}`);
//         console.log("Question Data:", response.data);  // Debugging: Log the response data
//         setQuestion(response.data);
//       } catch (error) {
//         console.error("Error fetching question details:", error);
//       }
//     };
//     fetchQuestion();
//   }, [questionId]);

//   // Language to Judge0 ID mapping
//   const languageMap = {
//     javascript: 63,
//     python: 71,
//     cpp: 54,
//     java: 62,
//     c: 50,
//   };

//   // Handle code execution
//   const handleRunCode = async () => {
//     try {
//       const response = await axios.post(
//         "/api/judge0/execute",
//         {
//           sourceCode: code, // Send user-written code
//           languageId: languageMap[language], // Convert selected language to Judge0 ID
//           id: questionId, // Send question ID
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true, // Ensure credentials are sent
//         }
//       );

//       console.log("Execution Response:", response.data);

      

//       if (response.data.results && response.data.results.length > 0) {
//         const formattedResults = response.data.results.map((result, index) => ({
//           id: index + 1,
//           input: result.input.join(", "), // Join input array
//           expectedOutput: result.expectedOutput.join(", "), // Expected output
//           actualOutput: result.actualOutput.join(", "), // Actual output
//           status: result.passed ? "✅ Passed" : "❌ Failed",
//         }));
  
//         setOutput(formattedResults);
//       } else {
//         setOutput([{ id: 0, input: "N/A", expectedOutput: "N/A", actualOutput: "N/A", status: "No output returned" }]);
//       }

//     } catch (error) {
//       console.error("Error executing code:", error.response ? error.response.data : error.message);
//       setOutput("Error executing code");
//     }
//   };

//   const handleLanguageChange = (e) => {
//     setLanguage(e.target.value);
//   };

//   if (!question) return <p className="text-white">Loading...</p>;  // Display loading message if question data is not fetched

//   return (
//     <div className="h-screen p-6 bg-gray-900 text-white grid grid-cols-2 gap-4">
//       {/* Left panel: Problem description */}
//       <div className="overflow-y-auto p-8 bg-gray-800 rounded-lg shadow-lg">
//         <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-3 border-b-4 border-yellow-400 pb-4">
//           <i className="fas fa-tasks text-yellow-400"></i>
//           <span className="text-white">{question.title}</span>
//         </h1>

//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
//             <i className="fas fa-info-circle text-blue-400"></i>
//             Description
//           </h2>
//           <p className="text-gray-300 leading-relaxed text-lg">{question.description}</p>
//           <hr className="my-6 border-gray-600" />
//         </div>

//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
//             <i className="fas fa-keyboard text-green-400"></i>
//             Input
//           </h2>
//           <p className="text-gray-300 leading-relaxed text-lg">{question.sampleInput}</p>
//           <hr className="my-6 border-gray-600" />
//         </div>

//         <div>
//           <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
//             <i className="fas fa-terminal text-red-400"></i>
//             Output
//           </h2>
//           <p className="text-gray-300 leading-relaxed text-lg">{question.sampleOutput}</p>
//         </div>
//       </div>

//       {/* Right panel: Code editor */}
//       <div className="flex flex-col bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//         <div className="flex-grow">
//           {/* Monaco editor */}
//           <MonacoEditor
//             height="100%"
//             language={language}
//             theme="vs-dark"
//             value={code}
//             onChange={(value) => setCode(value)}
//             options={{
//               minimap: { enabled: false },
//               fontSize: 14,
//               automaticLayout: true,
//             }}
//           />
//         </div>

//         <div className="flex items-center justify-between p-4 bg-gray-900">
//           <select
//             className="p-2 bg-gray-700 rounded text-white"
//             value={language}
//             onChange={handleLanguageChange}
//           >
//             <option value="javascript">JavaScript</option>
//             <option value="python">Python</option>
//             <option value="cpp">C++</option>
//             <option value="java">Java</option>
//             <option value="c">C</option>
//           </select>
//           <button
//             className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
//             onClick={handleRunCode}
//           >
//             Run Code
//           </button>
//         </div>

        
//         {/* Output section */}
// <div className="p-4 bg-gray-900 text-white">
//   <h3 className="text-lg font-semibold">Test Case Results:</h3>
//   <div className="overflow-x-auto">
//     <table className="w-full mt-2 border-collapse border border-gray-700">
//       <thead>
//         <tr className="bg-gray-800 text-white">
//           <th className="border border-gray-700 px-4 py-2">#</th>
//           <th className="border border-gray-700 px-4 py-2">Input</th>
//           <th className="border border-gray-700 px-4 py-2">Expected Output</th>
//           <th className="border border-gray-700 px-4 py-2">Actual Output</th>
//           <th className="border border-gray-700 px-4 py-2">Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {output.length > 0 ? (
//           output.map((result) => (
//             <tr key={result.id} className="bg-gray-800 text-center">
//               <td className="border border-gray-700 px-4 py-2">{result.id}</td>
//               <td className="border border-gray-700 px-4 py-2">{result.input}</td>
//               <td className="border border-gray-700 px-4 py-2">{result.expectedOutput}</td>
//               <td className="border border-gray-700 px-4 py-2">{result.actualOutput}</td>
//               <td
//                 className={`border border-gray-700 px-4 py-2 font-semibold ${
//                   result.status.includes("Passed") ? "text-green-400" : "text-red-400"
//                 }`}
//               >
//                 {result.status}
//               </td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="5" className="text-center p-4 text-gray-400">No test cases executed yet.</td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </div>
// </div>

//       </div>
//     </div>
//   );
// };

// export default QuestionDetail;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const QuestionDetail = () => {
  const { id: questionId } = useParams(); // Get question ID from URL
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("cpp"); // Default language is C++
  const [output, setOutput] = useState(""); // Store execution output
  const [darkMode, setDarkMode] = useState(true); 
    const { user } = useAuthStore();// Dark mode state
  const navigate = useNavigate();
  const [allPassed, setAllPassed] = useState(false);

  useEffect(() => {
    // Check if all test cases have passed
    if (output.length > 0 && output.every((test) => test.status === "Passed")) {
      setAllPassed(true);
    }
  }, [output]);

  const saveCompletion = async () => {
    if (allPassed) {
      const completionData = {
        questionId,
        questionTitle,
        timestamp: new Date().toISOString(), // Store exact date & time
      };

      try {
        await axios.post("/api/judge0/user/completed", completionData);
        alert("Question completion recorded!");
      } catch (error) {
        console.error("Error saving completion:", error);
      }
    }
  };

  useEffect(() => {
    if (allPassed) {
      saveCompletion();
    }
  }, [allPassed]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`/api/code-questions/${questionId}`);
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching question details:", error);
      }
    };
    fetchQuestion();
  }, [questionId]);

  const languageMap = {
    javascript: 63,
    python: 71,
    cpp: 54,
    java: 62,
    c: 50,
  };

  const handleRunCode = async () => {
    try {
      const response = await axios.post("/api/judge0/execute", {
        sourceCode: code,
        languageId: languageMap[language],
        id: questionId,
        userId: user._id,
      });

      if (response.data.results?.length > 0) {
        const formattedResults = response.data.results.map((result, index) => ({
          id: index + 1,
          input: result.input.join(", "),
          expectedOutput: result.expectedOutput.join(", "),
          actualOutput: result.actualOutput.join(", "),
          status: result.passed ? "✅ Passed" : "❌ Failed",
        }));
        setOutput(formattedResults);
      } else {
        setOutput([{ id: 0, input: "N/A", expectedOutput: "N/A", actualOutput: "N/A", status: "No output returned" }]);
      }
    } catch (error) {
      setOutput("Error executing code");
    }
  };

  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  if (!question) return <p className="text-white">Loading...</p>;

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-slate-100 text-black"} h-screen p-6 grid grid-cols-2 gap-4`}>
        
      <div className={`${darkMode ? "bg-gray-800" : "bg-white text-black"} overflow-y-auto p-8 rounded-lg shadow-lg`}>
      <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 px-4 py-2 mb-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <h1 className="text-4xl font-extrabold mb-8 border-b-4 border-yellow-400 pb-4">  <i className="fas fa-tasks text-yellow-400"></i>
                <span className={`${darkMode ? "bg-gray-800" : "bg-white text-black"} px-3`}>{question.title}</span></h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
         <i className="fas fa-info-circle text-blue-400 "></i>
         <span className={`${darkMode ? "bg-gray-800" : "bg-white text-black"} px-3`}>Description</span></h2>
          <p>{question.description}</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3"> <i className="fas fa-keyboard text-green-400 "></i>
          <span className={`${darkMode ? "bg-gray-800" : "bg-white text-black"} px-3`}>Input</span></h2>
          <p>{question.sampleInput}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3"> <i className="fas fa-terminal text-red-400"></i>
          <span className={`${darkMode ? "bg-gray-800" : "bg-white text-black"} px-3`}>Output</span></h2>
          <p>{question.sampleOutput}</p>
        </div>
      </div>
      
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div className={`flex-grow border-b-2 ${darkMode ? "border-white" : "border-black" }    `}>
          <MonacoEditor
            height="100%"
            language={language}
            theme={darkMode ? "vs-dark" : "light"}
            value={code}
            onChange={setCode}
            options={{ minimap: { enabled: false }, fontSize: 14, automaticLayout: true }}
          />
        </div>
        
        <div className="flex items-center justify-between p-3 ${darkMode ? 'bg-gray-900' : 'bg-slate-300' }">
          <select className="p-2 bg-gray-700 rounded text-white" value={language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="c">C</option>
          </select>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white" onClick={handleRunCode}>Run Code</button>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white" onClick={() => navigate(-1)}>submit</button>
          <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white" onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-slate-300 text-black' }">
          <h3 className="text-lg font-semibold">Test Case Results:</h3>
          {/* <table className="w-full mt-2 border-collapse border ${darkMode ? 'border-gray-700' : 'border-gray-400' }">
            <thead>
              <tr className="${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black' }">
                <th>#</th><th>Input</th><th>Expected Output</th><th>Actual Output</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {output.length > 0 ? (
                output.map((result) => (
                  <tr key={result.id} className="${darkMode ? 'bg-gray-800 text-center' : 'bg-gray-200 text-center' }">
                    <td>{result.id}</td>
                    <td>{result.input}</td>
                    <td>{result.expectedOutput}</td>
                    <td>{result.actualOutput}</td>
                    <td className={result.status.includes("Passed") ? "text-green-400" : "text-red-400"}>{result.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">No test cases executed yet.</td>
                </tr>
              )}
            </tbody>
          </table> */}

<table className={`w-full mt-2 border-collapse border ${darkMode ? 'border-gray-700' : 'border-gray-400'}`}>
  <thead>
    <tr className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}>
      <th className="border px-4 py-2 text-center">#</th>
      <th className="border px-4 py-2 text-center">Input</th>
      <th className="border px-4 py-2 text-center">Expected Output</th>
      <th className="border px-4 py-2 text-center">Actual Output</th>
      <th className="border px-4 py-2 text-center">Status</th>
    </tr>
  </thead>
  <tbody>
    {output.length > 0 ? (
      output.map((result) => (
        <tr key={result.id} className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
          <td className="border px-4 py-2 text-center">{result.id}</td>
          <td className="border px-4 py-2 text-center">{result.input}</td>
          <td className="border px-4 py-2 text-center">{result.expectedOutput}</td>
          <td className="border px-4 py-2 text-center">{result.actualOutput}</td>
          <td className={`border px-4 py-2 text-center font-semibold ${
            result.status.includes("Passed") ? "text-green-400" : "text-red-400"
          }`}>
            {result.status}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5" className="border px-4 py-2 text-center text-gray-500">No test cases executed yet.</td>
      </tr>
    )}
  </tbody>
</table>

        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
