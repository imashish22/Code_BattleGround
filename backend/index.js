import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {connectDB} from "./db/connectDB.js";
import authRoutes from "./routes/auth_route.js";    
import quizRoutes from "./routes/quiz_routes.js";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

app.use(cors({origin:"http://localhost:5173",credentials:true}));

app.use(express.json());
app.use(cookieParser())

app.get('/api/questions', async (req, res) => {
    const { category, difficulty } = req.query;
    const apiKey = 'qtuLXmm0Hc5O3MDwymuRVcURdjoV8FjpskunrmJP'; 

    try {
        const response = await axios.get(`https://quizapi.io/api/v1/questions`, {
            params: {
                apiKey,
                category,
                difficulty,
                limit: 10,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching questions:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }
});


// app.use('/api/quizzes', quizRoutes);
app.use("/api/auth",authRoutes)





app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})