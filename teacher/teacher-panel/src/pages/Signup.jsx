// import { useState } from "react";
// import { signupTeacher } from "../services/authService";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     await signupTeacher(name, email, password);
//     navigate("/login");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-96 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-4">Teacher Signup</h2>
//         <form onSubmit={handleSignup}>
//           <input className="w-full p-2 border rounded mb-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//           <input className="w-full p-2 border rounded mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           <input className="w-full p-2 border rounded mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           <button className="w-full bg-blue-500 text-white py-2 rounded" type="submit">Sign Up</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;



// import { useState } from "react";
// import { signupTeacher } from "../services/authService";
// import { useNavigate, Link } from "react-router-dom";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     await signupTeacher(name, email, password);
//     navigate("/login");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-500 to-red-600">
//       <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 border border-white border-opacity-30">
//         <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">Teacher Signup</h2>
//         <form onSubmit={handleSignup} className="space-y-4">
//           <input
//             className="w-full p-3 bg-white bg-opacity-20 border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
//             type="text"
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             className="w-full p-3 bg-white bg-opacity-20 border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             className="w-full p-3 bg-white bg-opacity-20 border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-md text-lg font-semibold hover:scale-105 transition duration-300">
//             Sign Up
//           </button>
//         </form>
//         <p className="text-black text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-orange-300 hover:text-orange-400 font-semibold">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import { useState } from "react";
import { signupTeacher } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await signupTeacher(name, email, password);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-500 to-red-600">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 border border-white border-opacity-30">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">Teacher Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              className="w-full p-3 bg-white bg-opacity-20 border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              className="w-full p-3 bg-white bg-opacity-20 border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              className="w-full p-3 bg-white bg-opacity-20 border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-md text-lg font-semibold hover:scale-105 transition duration-300"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="text-black text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-300 hover:text-orange-400 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
