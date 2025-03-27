import axios from "axios";


export const loginTeacher = async (email, password) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
  return res.data;
};

export const signupTeacher = async (name, email, password) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, { name, email, password });
  return res.data;
};
