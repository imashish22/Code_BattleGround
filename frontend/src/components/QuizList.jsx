// import { useQuiz } from "../context/QuizContext";

// const QuizList = () => {
//   const { quizzes } = useQuiz();

//   return (
//     <div className="max-w-3xl mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold text-center mb-4">Available Quizzes</h2>
//       {quizzes.length === 0 ? (
//         <p className="text-center text-gray-500">No quizzes available</p>
//       ) : (
//         quizzes.map((quiz) => (
//           <div key={quiz._id} className="border-b py-4">
//             <h3 className="text-xl font-bold">{quiz.title}</h3>
//             <p className="text-gray-600">{quiz.description}</p>
//             <p className="text-gray-500">Time Limit: {quiz.timeLimit} minutes</p>
//             <p className="text-gray-500">Deadline: {new Date(quiz.deadline).toLocaleString()}</p>
//             <p className="text-sm text-gray-700 font-semibold">
//                 Created by: {quiz.createdBy?.name || "Unknown"}
//               </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default QuizList;


import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const QuizList = () => {
  const { quizzes } = useQuiz();
  const navigate = useNavigate();

  return (
    // <div className="max-w-4xl mx-auto mt-6 p-4">  
    //   <h2 className="text-3xl font-bold text-center mb-6">Available Quizzes</h2>
    //   {quizzes.length === 0 ? (
    //     <p className="text-center text-gray-500">No quizzes available</p>
    //   ) : (
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //       {quizzes.map((quiz) => (
    //         <div
    //           key={quiz._id}
    //           className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105"
    //           onClick={() => navigate(`/contest/${quiz._id}`)}
    //         >
    //           <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
    //           <p className="text-gray-600 mb-2">{quiz.description}</p>
    //           <p className="text-gray-500">Time Limit: {quiz.timeLimit} minutes</p>
    //           <p className="text-gray-500">Deadline: {new Date(quiz.deadline).toLocaleString()}</p>
    //           <p className="text-sm text-gray-700 font-semibold mt-2">
    //             Created by: {quiz.createdBy?.name || "Unknown"}
    //           </p>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
<div className="max-w-5xl mx-auto mt-10 p-6">
  <h2 className="text-4xl font-extrabold text-center mb-10 text-purple-700">
    Available Contest
  </h2>
  {quizzes.length === 0 ? (
    <p className="text-center text-gray-400 text-lg">No Contest available</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {quizzes.map((quiz) => (
        <div
          key={quiz._id}
          className="bg-gradient-to-r from-purple-600 to-indigo-700 shadow-2xl rounded-3xl p-8 cursor-pointer transition-all transform hover:scale-110 hover:shadow-3xl"
          onClick={() => navigate(`/contest/${quiz._id}`)}
        >
          <h3 className="text-3xl font-extrabold mb-4 text-white">{quiz.title}</h3>
          <p className="text-gray-200 text-lg mb-4">{quiz.description}</p>
          <div className="flex justify-between text-gray-300 text-md font-semibold">
            <p>⏳ Time Limit: {quiz.timeLimit} minutes</p>
            <p>📅 Deadline: {new Date(quiz.deadline).toLocaleString()}</p>
          </div>
          <p className="text-lg text-white font-semibold mt-6">
            ✍️ Created by: {quiz.createdBy?.name || "Unknown"}
          </p>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default QuizList;
