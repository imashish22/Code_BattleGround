




import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import Workflow from "./Workflow";
import Footer from "./Footer";

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute ${color} ${size} rounded-full opacity-30`}
      style={{ top, left }}
      animate={{
        y: [0, 20, 0], // Floating effect
        x: [0, 10, -10, 0], // Slight side movement
        opacity: [0.2, 0.4, 0.3]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror",
        delay
      }}
    />
  );
};

const HomePage = () => {
  return (
    <>
      <motion.div 
        className="relative bg-black min-h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Floating Asteroids */}
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="5%" left="10%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="10%" left="30%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-24 h-24" top="5%" left="40%" delay={0} />
        <FloatingShape color="bg-gray-400" size="w-16 h-16" top="17%" left="3%" delay={0} />
        <FloatingShape color="bg-gray-600" size="w-24 h-24" top="30%" left="70%" delay={1} />
        <FloatingShape color="bg-gray-500" size="w-12 h-12" top="50%" left="10%" delay={2} />
        <FloatingShape color="bg-gray-700" size="w-20 h-20" top="80%" left="40%" delay={3} />
        <FloatingShape color="bg-gray-500" size="w-28 h-28" top="5%" left="80%" delay={1.5} />

        {/* Main Content */}
        <Navbar />
        <div className="max-w-7xl mx-auto pt-20 px-6">
          <HeroSection />
          <FeatureSection />
          <Workflow />
        <Footer />

        </div>

        {/* Call-to-Action Section */}
        {/* <motion.div 
          className="px-8 py-4 bg-gray-900 bg-opacity-50 flex flex-col items-center space-y-2 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.3)" }}
        >
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/dashboard" className="text-blue-400 hover:underline">
              Dashboard
            </Link>
          </p>

          <h1 className="text-white text-3xl font-bold">Welcome to Code BattleGround</h1>
          <p className="text-gray-300">Your one-stop platform for coding challenges and quizzes!</p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Link to="/home">
              <motion.button 
                className="px-6 py-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-400 shadow-lg"
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(14, 165, 233, 0.8)" }}
                whileTap={{ scale: 0.95 }}
              >
               Let's Start 🚀
              </motion.button>
            </Link>
          </motion.div>
        </motion.div> */}
      </motion.div>
    </>
  );
};

export default HomePage;
