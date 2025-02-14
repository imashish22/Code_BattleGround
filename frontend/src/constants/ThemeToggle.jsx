import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
      htmlElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      htmlElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const htmlElement = document.documentElement;

    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border border-gray-400 bg-gray-200 dark:bg-gray-800 dark:text-white"
    >
      {isDarkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>
  );
};

export default ThemeToggle;
