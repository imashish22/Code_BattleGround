// import { useState, useContext } from "react";
// import AuthContext from "../context/AuthContext";

// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(email, password);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-96 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-4">Teacher Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input className="w-full p-2 border rounded mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           <input className="w-full p-2 border rounded mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           <button className="w-full bg-blue-500 text-white py-2 rounded" type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-500 to-red-600">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 border border-white border-opacity-30">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">Teacher Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 bg-white bg-opacity-20 border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full p-3 bg-white bg-opacity-20 border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-md text-lg font-semibold hover:scale-105 transition duration-300">
            Login
          </button>
        </form>
        <p className="text-black text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-300 hover:text-orange-400 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
