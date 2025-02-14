    import express from "express";
    import cors from "cors";
    import cookieParser from "cookie-parser";
    import dotenv from "dotenv";
    import {connectDB} from "./db/connectDB.js";
    import authRoutes from "./routes/auth_route.js";    
    import quizRoutes from "./routes/quiz_category.js";
    import quizRoutesQuestion from "./routes/quiz_routes.js";
    import quizscoreRoutes from "./routes/quizScore_route.js";
    import leaderboardRoutes from "./routes/leaderboard.js";
    import codeQuestions from './routes/codequestion.js';
    import judge0Routes from './routes/judge0Routes.js';
    
    dotenv.config();

    const app = express();
    const PORT = process.env.PORT || 5000;

    connectDB();

    app.use(cors({origin:"http://localhost:5173",credentials:true}));

    app.use(express.json());
    app.use(cookieParser())


    // app.use('/api/quizzes', quizRoutes);
    app.use("/api/quiz-question",quizRoutesQuestion)
    app.use("/api/auth",authRoutes)
    app.use("/api/quiz",quizRoutes)
    app.use("/api/quiz/result",quizscoreRoutes)
    app.use('/api/leaderboard', leaderboardRoutes);
    app.use("/api/code-questions",codeQuestions)
    app.use("/api/judge0", judge0Routes);




    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })