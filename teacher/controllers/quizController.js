import QuizContest from "../models/QuizContest.js";
import xlsx from "xlsx";
import bcrypt from "bcryptjs";

// ✅ Upload and Create Quiz
export const createQuiz = async (req, res) => {
  try {
    const { title, description, password, timeLimit, deadline } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // ✅ Read Excel file
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const questions = xlsx.utils.sheet_to_json(sheet);

    // ✅ Process questions
  

    const formattedQuestions = questions.map((q) => ({
        questionText: q["Question"] || q["question"],
        options: [
          q["Option A"] || q["OptionA"],
          q["Option B"] || q["OptionB"],
          q["Option C"] || q["OptionC"],
          q["Option D"] || q["OptionD"],
        ].filter(Boolean),
        correctAnswer: q["Correct Answer"] || q["correctanswer"], // Add correct answer field
      }));
      
      

    // ✅ Hash password if provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // ✅ Save to database
    // const newQuiz = new QuizContest({
    //   title,
    //   description,
    //   questions: formattedQuestions,
    //   password: hashedPassword,
    //   timeLimit,
    //   deadline,
    //   createdBy: req.user.id,
    // });


    const newQuiz = new QuizContest({
      title,
      description,
      questions: formattedQuestions,
      password: hashedPassword,
      timeLimit,
      deadline: new Date(deadline.trim()), // ✅ Trim and convert deadline to Date
      createdBy: req.user.id,
    });

    
    await newQuiz.save();
    res.status(201).json({ message: "Quiz created successfully", newQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Fetch Quiz (with password check)
export const getQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { password } = req.body;

    const quiz = await QuizContest.findById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    // ✅ Check deadline
    if (new Date() > new Date(quiz.deadline)) {
      return res.status(400).json({ error: "Quiz deadline has passed" });
    }

    // ✅ Verify password (if required)
    if (quiz.password) {
      const isMatch = await bcrypt.compare(password, quiz.password);
      if (!isMatch) return res.status(403).json({ error: "Incorrect password" });
    }

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


// export const getTeacherQuizzes = async (req, res) => {
//   try {
//     const teacherId = req.user.id; // Get teacher's ID from auth middleware

//     console.log(teacherId);
//     const quizzes = await QuizContest.find({ createdBy: teacherId });

//     res.json({ count: quizzes.length, quizzes });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

export const getTeacherQuizzes = async (req, res) => {
  try {
    const quizzes = await QuizContest.find({ createdBy: req.user.id }); // ✅ Fetch only quizzes created by the logged-in teacher
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Server error" });
  }
};
