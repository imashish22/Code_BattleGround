



import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiLock, FiClock, FiUpload } from "react-icons/fi";

const CreateQuizForm = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    password: "",
    timeLimit: "",
    deadline: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setQuiz((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to create a quiz");
      return;
    }

    const formData = new FormData();
    formData.append("title", quiz.title);
    formData.append("description", quiz.description);
    formData.append("password", quiz.password);
    formData.append("timeLimit", quiz.timeLimit);
    formData.append("deadline", quiz.deadline);
    formData.append("file", quiz.file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/quiz/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("🎉 Contest created successfully!");

      // Reset form after successful submission
      setQuiz({
        title: "",
        description: "",
        password: "",
        timeLimit: "",
        deadline: "",
        file: null,
      });

    } catch (error) {
      console.error("Error creating quiz:", error.response?.data || error);
      toast.error(error.response?.data?.error || "❌ Failed to create Contest");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gradient-to-br from-purple-600 to-purple-800 shadow-xl rounded-2xl text-white border-2 border-purple-400">
      <h2 className="text-3xl font-bold text-center mb-6">🚀 Create Quiz</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Quiz Title</label>
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-purple-100 bg-opacity-20 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            placeholder="Enter quiz title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={quiz.description}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-purple-100 bg-opacity-20 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            placeholder="Enter quiz description"
            rows={3}
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password (Optional)</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-purple-300" />
            <input
              type="password"
              name="password"
              value={quiz.password}
              onChange={handleChange}
              className="w-full pl-10 px-4 py-2 bg-purple-100 bg-opacity-20 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
              placeholder="Enter a password (optional)"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Time Limit (Minutes)</label>
          <div className="relative">
            <FiClock className="absolute left-3 top-3 text-purple-300" />
            <input
              type="number"
              name="timeLimit"
              value={quiz.timeLimit}
              onChange={handleChange}
              className="w-full pl-10 px-4 py-2 bg-purple-100 bg-opacity-20 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
              placeholder="Enter time limit"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            value={quiz.deadline}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-purple-100 bg-opacity-20 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload Excel File</label>
          <div className="relative">
            <FiUpload className="absolute left-3 top-3 text-purple-300" />
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="w-full pl-10 px-4 py-2 bg-purple-100 bg-opacity-20 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-white font-bold transition shadow-md hover:shadow-lg"
        >
          🎯 Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuizForm;
