


import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute ${color} ${size} rounded-full opacity-30`}
      style={{ top, left }}
      animate={{
        y: [0, 20, 0], // Floating effect
        x: [0, 10, -10, 0], // Slight side movement
        opacity: [0.2, 0.4, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror",
        delay,
      }}
    />
  );
};

const AttemptedUser = () => {
  const { id } = useParams();
  const location = useLocation();
  const contestTitle = location.state?.title || "Quiz Contest"; // Get title from state or fallback

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAttemptedUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/score/contest/${id}/attempted-users`);
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch attempted users");
        console.error("Error fetching attempted users:", error);
      }
    };

    fetchAttemptedUsers();
  }, [id]);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users.map(user => ({
      Name: user.studentId.name,
      Score: user.score,
      "Attempted At": new Date(user.attemptedAt).toLocaleString()
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attempted Users");
    XLSX.writeFile(workbook, "Attempted_Users.xlsx");
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="relative bg-white min-h-screen overflow-hidden pt-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Floating Asteroids */}
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="5%" left="10%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="10%" left="30%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-24 h-24" top="5%" left="40%" delay={0} />
        <FloatingShape color="bg-gray-600" size="w-24 h-24" top="30%" left="70%" delay={1} />
        <FloatingShape color="bg-gray-500" size="w-12 h-12" top="50%" left="10%" delay={2} />
        <FloatingShape color="bg-gray-700" size="w-20 h-20" top="80%" left="40%" delay={3} />
        <FloatingShape color="bg-gray-500" size="w-28 h-28" top="5%" left="80%" delay={1.5} />
        <div className="max-w-5xl mx-auto mt-20 p-6 sm:p-8 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-2xl rounded-3xl text-white">
          <h2 className="text-3xl font-extrabold text-center mb-4">{contestTitle}</h2>
          <h3 className="text-2xl font-bold text-center mb-6">Attempted Users</h3>
          <button onClick={downloadExcel} className="mb-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded">Download Excel</button>
          {users.length === 0 ? (
            <p className="text-center text-gray-200">No users have attempted this quiz yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse rounded-lg overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-indigo-700 text-white">
                    <th className="px-4 sm:px-6 py-3 text-lg border border-white">Name</th>
                    <th className="px-4 sm:px-6 py-3 text-lg border border-white">Score</th>
                    <th className="px-4 sm:px-6 py-3 text-lg border border-white">Attempted At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.studentId} className={`text-center ${index % 2 === 0 ? 'bg-indigo-500' : 'bg-purple-500'} hover:bg-indigo-400 transition-all` }>
                      <td className="px-4 sm:px-6 py-4 font-medium border border-white">{user.studentId.name}</td>
                      <td className="px-4 sm:px-6 py-4 font-semibold border border-white">{user.score}</td>
                      <td className="px-4 sm:px-6 py-4 border border-white">{new Date(user.attemptedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default AttemptedUser;
