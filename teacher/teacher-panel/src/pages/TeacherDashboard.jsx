import Navbar from "../components/Navbar";
import TeacherQuizzes from "../components/TeacherQuizzes";
import { motion } from "framer-motion";

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


const TeacherDashboard = () => {
  return (
    <>

    <Navbar/>
    <motion.div
        className="relative bg-black min-h-screen overflow-hidden pt-20tai"
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
     <div className="p-8">
      
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>
      <TeacherQuizzes />
    </div>
    </motion.div>
    </>
   
  );
};

export default TeacherDashboard;
