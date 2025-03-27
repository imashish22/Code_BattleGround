const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

 const createQuiz = async (quizData) => {
  try {
    const formData = new FormData();
    formData.append("title", quizData.title);
    formData.append("description", quizData.description);
    formData.append("password", quizData.password);
    formData.append("timeLimit", quizData.timeLimit);
    formData.append("deadline", quizData.deadline);
    formData.append("file", quizData.file);

    const response = await fetch(`/api/quiz/create`, {
      method: "POST",
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

export default { createQuiz };
    