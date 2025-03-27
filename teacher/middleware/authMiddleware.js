  import jwt from "jsonwebtoken";
  import dotenv from "dotenv";
  import Teacher from "../models/teacher.js";

  dotenv.config();

  const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.teacher = verified;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid Token" });
    }
  };



  export const protect = async (req, res, next) => {
    try {
      let token = req.headers.authorization;
  
      if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Not authorized, no token" });
      }
  
      token = token.split(" ")[1]; // Extract actual token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Fetch the teacher from the database
      const teacher = await Teacher.findById(decoded.id).select("-password");
      if (!teacher) {
        return res.status(401).json({ error: "Teacher not found" });
      }
  
      req.user = teacher; // Attach teacher to req.user
      next();
    } catch (error) {
      console.error("Auth error:", error);
      res.status(401).json({ error: "Invalid token" });
    }
  };
  
  
  export default authMiddleware;
