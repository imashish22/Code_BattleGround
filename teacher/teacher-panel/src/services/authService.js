import axios from "axios";

const API_URL = "http://localhost:6005/api/auth";

export const loginTeacher = async (email, password) => {
  const res = await axios.post(`/api/auth/login`, { email, password });
  return res.data;
};

export const signupTeacher = async (name, email, password) => {
  const res = await axios.post(`/api/auth/signup`, { name, email, password });
  return res.data;
};
