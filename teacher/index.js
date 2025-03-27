import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connectDB.js";  // Import the connectDB function from the db/connectDB.js file
import authRoutes from "./routes/authRoutes.js";  // Import the authRoutes from the routes/authRoutes.js file
import quizRoutes from "./routes/quizRoute.js";  // Import the quizRoutes from the routes/quizRoutes.js file
import scoreRoutes from "./routes/scoreRoute.js";  // Import the scoreRoutes from the routes/scoreRoutes.js file
import  cors  from 'cors';
const app = express();  
const PORT = process.env.PORT || 2000;  // Set the PORT environment variable to 5000
connectDB();  // Call the connectDB function to connect to the MongoDB database

app.use(express.json()); // ✅ Enables JSON parsing
app.use(cors({origin:"*"})); // ✅ Enables CORS
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded data
                

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/score", scoreRoutes);



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})