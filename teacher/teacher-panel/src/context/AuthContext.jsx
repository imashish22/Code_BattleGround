


import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true); // 🔹 New Loading State
  const navigate = useNavigate();

  // ✅ Fetch teacher details if token exists
  useEffect(() => {
    const fetchTeacher = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTeacher(res.data); // 🔥 Fix: Directly set teacher from response
      } catch (error) {
        console.error("Auto-login failed:", error.response?.data?.message || error.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [token]);

  // 🔹 Login Function
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token } = res.data;
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Failed:", err.response?.data?.message || err.message);
    }
  };

  // 🔹 Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setTeacher(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ teacher, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
