import { create } from "zustand";
import axios from "axios";


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
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/auth/signup`, { email, password, name });
            set({ user: response.data.user, token: response.data.token, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/auth/login`, { email, password }, { withCredentials: true });
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
            await axios.post(`${import.meta.env.VITE_API_URI}/api/auth/logout`, {}, { withCredentials: true }); // Ensure you send the cookies
            set({ user: null, token: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            throw error;
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/auth/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            console.error("Error in verifying email:", error.response || error.message);
            set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
            throw error;
        }
    },
    
    forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/auth/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/auth/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/auth/check-auth`, { withCredentials: true }); // Make sure cookies are sent
            set({ user: response.data.user, token: response.data.token, isAuthenticated: true, isCheckingAuth: false });
            console.log(response.data.token)
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },

    

    // Additional actions...
}));

