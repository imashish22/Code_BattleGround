import { useEffect, useState } from "react";
import FloatingShape from "./components/auth/FloatingShape";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerficationPage from "./pages/EmailVerficationPage";
import { useAuthStore } from "./store/authStore";
import HomePage from "./pages/HomePage";
import LoadingSpinner from "./components/auth/LoadingSpinner";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { Toaster } from "react-hot-toast";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import Quiz from "./components/Quiz";
import QuizContainer from "./components/QuizContainer";
import QuizzesPage from "./pages/QuizzesPage";
import QuizPage from "./pages/QuizPage";
import QuizResults from "./pages/QuizResults";
import axios from "axios";
import Leaderboard from "./pages/Leaderboard";
import CodingQuestionsPage from "./pages/CodingQuestionsPage";
import QuestionDetail from "./pages/QuestionDetail";
import Footer from "./pages/Footer";
import { QuizProvider } from "./context/QuizContext";
import StudentDashboard from "./pages/StudentContestDashboard";
import QuizDetails from "./pages/QuizDetails";
import QuizContestStart from "./pages/QuizContestStart";
import CreateRoom from "./pages/CreateRoom";
import SelectQuestions from "./pages/SelectQuestions";
import Lobby from "./pages/Lobby";
import QuestionList from "./components/QuestionList";
import QuestionsList from "./pages/QuestionList";
import Roomeditor from "./pages/roomeditor";


axios.defaults.baseURL = import.meta.env.VITE_API_URL;  // Use the Vite environment variable
axios.defaults.withCredentials = true; 


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <>
     
 <QuizProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
            <Route
              path="/login"
              element={
                <RedirectAuthenticatedUser>
                  <LoginPage />
                </RedirectAuthenticatedUser>
              }
            />
          <Route path="/verify-email" element={<EmailVerficationPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />  
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          {/* catch all routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/quiz" element={<QuizPage/>} />
          <Route path="/quiz-results" element={<QuizResults/>} />
          {/* <Route path="/quiz" element={<Quiz/>} /> */}
          {/* <Route path="/quiz-container" element={<QuizContainer/>} /> */}
          <Route path="/quizzes" element={<QuizzesPage/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
          <Route path="/code-quetions" element={<CodingQuestionsPage/>} />
          <Route path="/questions/:id" element={<QuestionDetail />} />
          <Route path="/contest" element={<StudentDashboard />} />
          <Route path="/contest/:id" element={<QuizDetails />} />
          <Route path="/contest/shuffled-questions/:id" element={<QuizContestStart />} />
          <Route path="/room" element={<CreateRoom />} />
          <Route path="/room/select-question/:roomId" element={<SelectQuestions />} />
          <Route path="/lobby/:roomId" element={<Lobby />} />
          <Route path="/lobby/:roomId/question-list" element={<QuestionsList />} />
          <Route path="/lobby/:roomId/question-list/editor/:questionId" element={<Roomeditor />} />
        </Routes>
        </QuizProvider>
         <Footer />
        <Toaster />
      {/* </div> */}
    </>
  );
}

export default App;
