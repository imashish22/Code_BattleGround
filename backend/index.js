    import express from "express";
    import cors from "cors";
    import cookieParser from "cookie-parser";
    import dotenv from "dotenv";
    import {connectDB} from "./db/connectDB.js";
    import authRoutes from "./routes/auth_route.js";    
    import quizRoutes from "./routes/quiz_category.js";
    import quizRoutesQuestion from "./routes/quiz_routes.js";
    import quizscoreRoutes from "./routes/quizScore_route.js";
    import axios from "axios";

    const app = express();
    const PORT = process.env.PORT || 5000;

    dotenv.config();
    connectDB();

    app.use(cors({origin:"http://localhost:5173",credentials:true}));

    app.use(express.json());
    app.use(cookieParser())

   

    // app.use('/api/quizzes', quizRoutes);
    app.use("/api/quiz-question",quizRoutesQuestion)
    app.use("/api/auth",authRoutes)
    app.use("/api/quiz",quizRoutes)
    app.use("/api/quiz-results",quizscoreRoutes)





    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })