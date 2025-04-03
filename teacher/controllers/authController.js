import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "../models/teacher.js";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Teacher Signup
export const signup = async (req, res) => {
    try {
        console.log("Signup request received:", req.body); // ✅ Debugging log
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await Teacher.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Teacher({ name, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup error:", error); // ✅ This will log the error in the backend terminal
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// 🔹 Teacher Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });

    if (!teacher) return res.status(400).json({ message: "Teacher not found!" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, { expiresIn: "12h" });

    res.status(200).json({ token, teacher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getCurrentUser = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id).select("-password");
    if (!teacher) return res.status(404).json({ message: "User not found" });

    res.json({
      name: teacher.name,
      email: teacher.email
    }); // 🔥 Ensure only name & email are returned
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


