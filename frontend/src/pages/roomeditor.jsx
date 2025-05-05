import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import PopupModal from "../components/PopupModal";

const Roomeditor = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [allPassed, setAllPassed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  console.log(questionId);
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (output.length > 0 && output.every((test) => test.status === "✅ Passed")) {
      setAllPassed(true);
    }
  }, [output]);

  const saveCompletion = async () => {
    if (allPassed) {
      const completionData = {
        questionId,
        questionTitle: question.title,
        timestamp: new Date().toISOString(),
      };
      try {
        await axios.post(`${import.meta.env.VITE_API_URI}/api/judge0/user/completed`, completionData);
        alert("That looks great! 🎉 All test cases passed and your completion is recorded.");
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
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/code-questions/${questionId}`);
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
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/judge0/execute`, {
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
    } finally {
      setIsLoading(false);
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
        <h1 className="text-4xl font-extrabold mb-8 border-b-4 border-yellow-400 pb-4">
          <i className="fas fa-tasks text-yellow-400"></i>
          <span className={`${darkMode ? "bg-gray-800" : "bg-white text-black"} px-3`}>{question.title}</span>
        </h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            <i className="fas fa-info-circle text-blue-400"></i>
            <span className={`${darkMode ? "bg-gray-800" : "bg-white text-black"} px-3`}>Description</span>
          </h2>
          <p>{question.description}</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            <i className="fas fa-keyboard text-green-400"></i>
            <span className={`${darkMode ? "bg-gray-800" : "bg-white text-black"} px-3`}>Input</span>
          </h2>
          <p>{question.sampleInput}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">
            <i className="fas fa-terminal text-red-400"></i>
            <span className={`${darkMode ? "bg-gray-800" : "bg-white text-black"} px-3`}>Output</span>
          </h2>
          <p>{question.sampleOutput}</p>
        </div>
      </div>

      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div className={`flex-grow border-b-2 ${darkMode ? "border-white" : "border-black"} relative`}>
          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center backdrop-blur-sm">
              <div className="text-white text-lg font-semibold animate-pulse">Running Code...</div>
            </div>
          )}
          {showPopup && (
        <PopupModal message="OOPS! you cant Paste here Sorry!🙏🙏 " onClose={handleClosePopup} />
      )}
          <MonacoEditor
            height="98%"
            language={language}
            theme={darkMode ? "vs-dark" : "light"}
            value={code}
            onChange={setCode}
            options={{ minimap: { enabled: false }, fontSize: 14, automaticLayout: true }}
            onMount={(editor, monaco) => {
              editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
                // alert("Paste operation is disabled!");
                setShowPopup(true);
              });
              editor.onKeyDown((e) => {
                if ((e.ctrlKey || e.metaKey) && e.code === "KeyV") {
                  e.preventDefault();
                  // alert("Paste operation is disabled!");
                  setShowPopup(true);
                }
              });
            }}
          />
        </div>

        <div className={`flex items-center justify-between p-3 ${darkMode ? "bg-gray-900" : "bg-slate-300"}`}>
          <select className="p-2 bg-gray-700 rounded text-white" value={language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="c">C</option>
          </select>
          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
            onClick={handleRunCode}
            disabled={isLoading}
          >
            {isLoading ? "Running..." : "Run Code"}
          </button>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white" onClick={() => navigate(-1)}>
            Submit
          </button>
          <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white" onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className={`p-4 overflow-y-auto ${darkMode ? "bg-gray-900 text-white" : "bg-slate-300 text-black"}`}>
          <h3 className="text-lg font-semibold">Test Case Results:</h3>

          {allPassed && (
            <div className="my-2 p-2 text-green-400 font-semibold bg-green-900 bg-opacity-30 rounded">
              ✅ That looks great! All test cases passed.
            </div>
          )}

          <table className={`w-full mt-2 border-collapse border ${darkMode ? "border-gray-700" : "border-gray-400"}`}>
            <thead>
              <tr className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-300 text-black"}`}>
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
                  <tr key={result.id} className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}>
                    <td className="border px-4 py-2 text-center">{result.id}</td>
                    <td className="border px-4 py-2 text-center">{result.input}</td>
                    <td className="border px-4 py-2 text-center">{result.expectedOutput}</td>
                    <td className="border px-4 py-2 text-center">{result.actualOutput}</td>
                    <td
                      className={`border px-4 py-2 text-center font-semibold ${
                        result.status.includes("Passed") ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {result.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center text-gray-500">
                    No test cases executed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Roomeditor;
  