

import React from "react";
import logo from "../assets/logo.png";
import {
  FaGithub,
  FaLinkedin,
  FaHome,
  FaTrophy,
  FaBrain,
  FaCode,
} from "react-icons/fa";
import { Link } from "react-router-dom";
// import { MdCall } from "react-icons/md";

const socialLinks = [
  { id: "github", url: "https://github.com/imashish22/Code_BattleGround", icon: FaGithub },
  {
    id: "linkedin",
    url: "https://www.linkedin.com/in/ashish-jha-512913250/",
    icon: FaLinkedin,
  },
];

const quickLinks = [
  { id: "home", label: "Home", hash: "/", icon: FaHome },
  { id: "courses", label: "Problems", hash: "/code-questions", icon: FaCode },
  { id: "about", label: "Quizzes", hash: "/quizzes", icon: FaBrain },
  { id: "contact", label: "Leaderboard", hash: "/leaderboard", icon: FaTrophy },
];

const Footer = () => {
  return (
    <footer className="px-9 pb-5 w-full  font-montserrat text-white border-neutral-200 bg-gradient-to-r from-orange-500 to-orange-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-center md:items-start p-4">
          {/* <img src={logo} alt="Logo" className="w-auto h-12 mb-4" /> */}
          <span className="sm:text-4xl font-bold mb-3 text-2xl underline">
            Code BattleGround
          </span>
          <h2 className="font-bold text-primary text-2xl mb-4">
            For Source Code
          </h2>
          <ul className="flex list-none p-0 gap-2">
            {socialLinks.map((link) => (
              <li
                key={link.id}
                className="hover:-translate-y-1 transition-transform duration-300 hover:text-primary"
              >
                <a href={link.url} target="_blank" className="text-2xl">
                  <link.icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <h2 className="font-bold text-primary text-3xl mb-4">Quick Links</h2>
          <ul className="list-none p-0">
            {quickLinks.map((link) => (
              <li key={link.id} className="mb-2.5">
                <Link
                  to={link.hash}
                  smooth
                  className="flex flex-row w-fit items-center gap-2 text-[1rem] font-normal relative before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-0 before:h-[2px] before:bg-primary hover:before:w-full before:transition-all before:duration-300 hover:text-primary"
                >
                  <link.icon size={17} /> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <h2 className="font-bold text-primary text-3xl mb-4">
            About Code Battleground
          </h2>
          <p className="font-semibold">
            <span className="text-3xl">👋</span>{" "}
            <span className="font-bold text-xl tracking-tight text-primary">
            Code BattleGround
            </span>{"  "}
              is a Competitive Coding Platform built using the
            MERN stack that provides users
            with the opportunity to practice competitive programming, solve
            problems, participate in timed contests, and enhance their coding
            skills. It features various quiz categories, difficulty levels, and
            a leaderboard system that allows users to track their progress.
          </p>
        </div>
      </div>

      <div className="text-center text-sm font-semibold mt-7 pt-4 mb-2.5">
        Made with <span className="text-xl">💓</span> by codebattleground,
        Copyright © 2024 All rights reserved by{" "}
        <span className="text-primary font-bold">Ashish, Akshar & Sumit</span>
      </div>
    </footer>
  );
};

export default Footer;
