import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import { AuthProvider } from "../context/AuthContext";
import CreateQuizPage from "../pages/CreateQuizPage";
import TeacherDashboard from "../pages/TeacherDashboard";
import AttemptedUser from "../pages/AttemptedUser";
import { Toaster } from "react-hot-toast";

const AppRoutes = () => {
  return (
    <>
     <Router> {/* ✅ Place Router at the top */}
      <AuthProvider> {/* ✅ Wrap AuthProvider inside Router */}
        <Routes>
        <Route path="*" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path = "/create-quiz" element = {<CreateQuizPage/>}/>
          <Route path = "/get-quiz" element = {<TeacherDashboard/>}/>
          <Route path = "/attempted-users/:id" element = {<AttemptedUser/>}/>
        </Routes>
      </AuthProvider>
    </Router>
    <Toaster/>
    </>
   
    
  );
};

export default AppRoutes;
