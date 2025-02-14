// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import MonacoEditor from "@monaco-editor/react";

// const QuestionDetail = () => {
//   const { id } = useParams(); // Get question ID from URL
//   const [question, setQuestion] = useState(null);
//   const [code, setCode] = useState("// Write your code here");
//   const [language, setLanguage] = useState("cpp"); // Language state

//   useEffect(() => {
//     // Fetch question details from backend
//     const fetchQuestion = async () => {
//       try {
//         const response = await axios.get(`/api/code-questions/${id}`);
//         setQuestion(response.data);
//       } catch (error) {
//         console.error("Error fetching question details:", error);
//       }
//     };
//     fetchQuestion();
//   }, [id]);

//   const handleRunCode = () => {
//     alert("Running code: " + code);
//     // Add your code execution logic here
//   };

//   const handleLanguageChange = (e) => {
//     setLanguage(e.target.value);
//   };

//   if (!question) return <p className="text-white">Loading...</p>;

//   return (
    
//     <div className="h-screen p-6 bg-gray-900 text-white grid grid-cols-2 gap-4">
//   {/* Left panel: Problem description */}
  
// <div className="overflow-y-auto p-8 bg-gray-800 rounded-lg shadow-lg">
//   <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-3 border-b-4 border-yellow-400 pb-4">
//     <i className="fas fa-tasks text-yellow-400"></i>
//     <span className="text-white">{question.title}</span>
//   </h1>features

//   <div className="mb-8">
//     <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
//       <i className="fas fa-info-circle text-blue-400"></i>
//       Description
//     </h2>
//     <p className="text-gray-300 leading-relaxed text-lg">{question.description}</p>
//     <hr className="my-6 border-gray-600" />
//   </div>

//   <div className="mb-8">
//     <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
//       <i className="fas fa-keyboard text-green-400"></i>
//       Input
//     </h2>
//     <p className="text-gray-300 leading-relaxed text-lg">{question.sampleInput}</p>
//     <hr className="my-6 border-gray-600" />
//   </div>

//   <div>
//     <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
//       <i className="fas fa-terminal text-red-400"></i>
//       Output
//     </h2>
//     <p className="text-gray-300 leading-relaxed text-lg">{question.sampleOutput}</p>
//   </div>
// </div>




//   {/* Right panel: Code editor */}
//   <div className="flex flex-col bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//     <div className="flex-grow">
//       {/* Monaco editor */}
//       <MonacoEditor
//         height="100%"
//         language="javascript"
//         theme="vs-dark"
//         value={code}
//         onChange={(value) => setCode(value)}
//         options={{
//           minimap: { enabled: false },
//           fontSize: 14,
//           automaticLayout: true,
//         }}
//       />
//     </div>

//     <div className="flex items-center justify-between p-4 bg-gray-900">
//       <select
//         className="p-2 bg-gray-700 rounded text-white"
//         value={language}
//         onChange={(e) => setLanguage(e.target.value)}
//       >
//         <option value="javascript">JavaScript</option>
//         <option value="python">Python</option>
//         <option value="cpp">C++</option>
//       </select>
//       <button
//         className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
//         onClick={handleRunCode}
//       >
//         Run Code
//       </button>
//     </div>
//   </div>
// </div>

//   );
// };

// export default QuestionDetail;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react";

const QuestionDetail = () => {
  const { id } = useParams(); // Get question ID from URL
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("cpp"); // Default language is C++
  const [output, setOutput] = useState(""); // Store execution output

  useEffect(() => {
    // Fetch question details from backend
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`/api/code-questions/${id}`);
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching question details:", error);
      }
    };
    fetchQuestion();
  }, [id]);

  const languageMap = {
    javascript: 63,
    python: 71,
    cpp: 54,
    java: 62,
    c: 50,
  };

  
  const handleRunCode = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/judge0/execute/${id}`, {
        source_code: code,
        language_id: languageMap[language],
      });
      setOutput(response.data.results.map(result => `Status: ${result.status}\nExpected: ${result.expectedOutput.join("\n")}\nGot: ${result.actualOutput.join("\n")}\nPassed: ${result.passed}`).join("\n\n"));

    } catch (error) {
      console.error("Error executing code:", error.response?.data || error.message);
      return res.status(500).json({ message: "Internal Server Error" });
      setOutput("Error executing code");
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  if (!question) return <p className="text-white">Loading...</p>;

  return (
    <div className="h-screen p-6 bg-gray-900 text-white grid grid-cols-2 gap-4">
      {/* Left panel: Problem description */}
      <div className="overflow-y-auto p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-3 border-b-4 border-yellow-400 pb-4">
          <i className="fas fa-tasks text-yellow-400"></i>
          <span className="text-white">{question.title}</span>
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
            <i className="fas fa-info-circle text-blue-400"></i>
            Description
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">{question.description}</p>
          <hr className="my-6 border-gray-600" />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
            <i className="fas fa-keyboard text-green-400"></i>
            Input
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">{question.sampleInput}</p>
          <hr className="my-6 border-gray-600" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
            <i className="fas fa-terminal text-red-400"></i>
            Output
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">{question.sampleOutput}</p>
        </div>
      </div>

      {/* Right panel: Code editor */}
      <div className="flex flex-col bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex-grow">
          {/* Monaco editor */}
          <MonacoEditor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              automaticLayout: true,
            }}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-900">
          <select
            className="p-2 bg-gray-700 rounded text-white"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="c">C</option>
          </select>
          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
            onClick={handleRunCode}
          >
            Run Code
          </button>
        </div>

        {/* Output section */}
        <div className="p-4 bg-gray-900 text-white">
          <h3 className="text-lg font-semibold">Output:</h3>
          <pre className="bg-gray-800 p-2 rounded mt-2 text-green-400">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
