import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import adminRoutes from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import codecategoryRoutes from "./routes/codecategoryRoutes.js";
import codeQuestionRoutes from "./routes/codequestionRoute.js";
const app = express();
const PORT = process.env.PORT || 6000;
const path = require("path");
// Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(express.static(path.join(__dirname, "/admin-panel/build")));

app.use("/api/admin", adminRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/code-categories", codecategoryRoutes);
app.use("/api/code-questions", codeQuestionRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/admin-panel/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
