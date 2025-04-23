import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeLimit, setTimeLimit] = useState(0);
  
  useEffect(() => {
  }, [timeLimit]); // This will run whenever timeLimit changes

  
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/quiz-contest/all`);
        const currentTime = new Date();
    const activeQuizzes = response.data.filter((quiz) => new Date(quiz.deadline) > currentTime);

    setQuizzes(activeQuizzes);
        // setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);


  const fetchQuizDetails = async (quizId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/quiz-contest/${quizId}`);
      setQuiz(response.data);
    } catch (error) {
      console.error("Error fetching quiz details:", error);
    }
    setLoading(false);
  };



  const fetchShuffledQuestions = async (quizId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/quiz-contest/shuffled-questions/${quizId}`);
      setQuestions(response.data.shuffledQuestions);
      setTimeLimit(response.data.timelimit);
      
      return response.data; // ✅ Return the data so it can be used in QuizContestStart
    } catch (error) {
      console.error("Error fetching shuffled questions:", error);
      return null; // ✅ Ensure a return value even on error
    }
  };

  
    
  return (
    <QuizContext.Provider value={{ quizzes ,quiz, questions, fetchQuizDetails, timeLimit, fetchShuffledQuestions, loading}}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
