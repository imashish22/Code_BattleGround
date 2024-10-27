import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); // Ensure this is called at the top!


const adminUsername = process.env.ADMIN_USERNAME;  // Make sure these are correct
const adminPassword = process.env.ADMIN_PASSWORD;  // Ensure this is as well

// Admin login function
export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    console.log("Received Username:", username);
    console.log("Received Password:", password);
    console.log("Stored Admin Username:", adminUsername);  // Should show the correct value
    console.log("Stored Admin Password:", adminPassword);  // Should show the correct value

    // Check if the provided credentials match the stored admin credentials
    if (username !== adminUsername || password !== adminPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: adminUsername }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
