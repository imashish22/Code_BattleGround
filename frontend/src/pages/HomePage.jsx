import React from "react";
import { motion } from "framer-motion";
import { formatDate } from "../utils/date";
import { useAuthStore } from "../store/authStore";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import Workflow from "./Workflow";
import Footer from "./Footer";

const HomePage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
    <div className="bg-neutral-900">
    <Navbar />
    <div className="max-w-7xl  bg-neutral-900 mx-auto pt-20 px-6">
    <HeroSection />
    <FeatureSection />
    <Workflow />
    <Footer />
    </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/dashboard" className="text-dark-400 hover:underline">
            Dashboard
          </Link>
        </p>
        <h1>Welcome to Code BattleGround</h1>
            <p>Your one-stop platform for coding challenges and quizzes!</p>
            <Link to="/quiz">
                <button>Go to Quiz</button>
            </Link>
      </div>
      </div>
    </>
  );
};

export default HomePage;
