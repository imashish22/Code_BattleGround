import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; 

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    token: null,  // Store token separately
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name });
            set({ user: response.data.user, token: response.data.token, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
            // Token will be stored in cookies automatically
            set({
                isAuthenticated: true,
                user: response.data.user,
                token: response.data.token, // If you're storing token in frontend as well
                error: null,
                isLoading: false,
            },
            console.log(response.data.token)
        );
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`, {}, { withCredentials: true }); // Ensure you send the cookies
            set({ user: null, token: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            throw error;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true }); // Make sure cookies are sent
            set({ user: response.data.user, token: response.data.token, isAuthenticated: true, isCheckingAuth: false });
            console.log(response.data.token)
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },

    

    // Additional actions...
}));

