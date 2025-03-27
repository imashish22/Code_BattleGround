


import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { teacher, logout, loading } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-3 bg-black text-white backdrop-blur-lg border-b border-neutral-700/80">
      <div className="w-full flex justify-between items-center px-6 md:px-10">
        {/* Left Side: Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
                       <span className="text-xl font-bold tracking-tight">Code Battleground</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Right Side: User Info & Buttons */}
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent p-4 md:p-0 flex flex-col md:flex-row items-center gap-4 md:gap-6 transition-transform duration-300 ease-in-out ${menuOpen ? "block" : "hidden md:flex"}`}
        >
          {loading ? (
            <span>Loading...</span>
          ) : teacher ? (
            <>
              <span className="text-lg">👋 Hello, {teacher.name}!</span>
              <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                <li>
                  <Link
                    to="/create-quiz"
                    className="hover:text-white bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                  >
                    Create Quiz
                  </Link>
                </li>
                <li>
                  <Link
                    to="/get-quiz"
                    className="hover:text-white bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                  >
                    Quizzes
                  </Link>
                </li>
              </ul>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="py-2 px-3 border rounded-md">
                Login
              </Link>
              <Link
                to="/signup"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
