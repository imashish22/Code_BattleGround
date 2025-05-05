    import { useState } from 'react';
    import { useAuthStore } from '../store/authStore'; 
    import axios from 'axios';
    import { motion } from 'framer-motion';
    import { MdAccountCircle } from 'react-icons/md'; // Profile Icon
    import Navbar from '../components/Navbar';
    import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

    const FloatingShape = ({ color, size, top, left, delay }) => {
    return (
        <motion.div
        className={`absolute ${color} ${size} rounded-full opacity-30`}
        style={{ top, left }}
        animate={{
            y: [0, 20, 0],
            x: [0, 10, -10, 0],
            opacity: [0.2, 0.4, 0.3],
        }}
        transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
            delay,
        }}
        />
    );
    };

    const CreateRoom = () => {
        const { user } = useAuthStore();
        const navigate = useNavigate();
        const [roomName, setRoomName] = useState('');
        const [password, setPassword] = useState('');
        const [roomId, setRoomId] = useState('');
        const [duration, setDuration] = useState('');
        const [loading, setLoading] = useState(false);
        const [joinRoomId, setJoinRoomId] = useState('');
        const [joinPassword, setJoinPassword] = useState('');
      
        const createRoom = async () => {
          if (!user) return;
          setLoading(true);
          try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/rooms/create`, {
              roomId,
              roomName,
              password,
              duration,
              userId: user._id,
              username: user.name,
            });
            console.log('Room created:', response.data);
            toast.success('Room created successfully! 🎉');
            navigate(`/room/select-question/${roomId}`); // navigate to select-questions page
          } catch (error) {
            console.error('Error creating room:', error);
            toast.error('Failed to create room 😞');
          } finally {
            setLoading(false);
          }
        };
        

        console.log(user._id, user.username, "user id and username")
      
        const joinRoom = async () => {
          if (!joinRoomId) return;
          setLoading(true);
          try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/rooms/join`, {
              roomId: joinRoomId,
              password: joinPassword,
              userId: user._id,
            });
            console.log('Joined room:', response.data);
            toast.success('Joined room successfully! 🚀');
            navigate(`/lobby/${response.data.roomId}`); // after joining, navigate to lobby
          } catch (error) {
            console.error('Error joining room:', error);
            toast.error('Failed to join room 😔');
          } finally {
            setLoading(false);
          }
        };

    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 min-h-screen">
        {/* Navbar and Floating Shapes */}
        <Navbar />
        <motion.div
            className="relative bg-white min-h-screen overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        >
            {/* Floating Elements */}
            <FloatingShape color="bg-blue-400" size="w-16 h-16" top="5%" left="10%" delay={0} />
            <FloatingShape color="bg-purple-400" size="w-24 h-24" top="20%" left="40%" delay={1} />
            <FloatingShape color="bg-pink-400" size="w-16 h-16" top="50%" left="80%" delay={2} />

            {/* Form Section */}
            <div className="max-w-3xl mx-auto pt-20 px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="p-8 bg-gradient-to-r from-purple-600 to-pink-500 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
            >
                <h2 className="text-3xl font-bold mb-4 text-center text-white">
                <MdAccountCircle size={40} className="inline mr-2 text-white" /> Create a New Room
                </h2>
                
                <div className="space-y-6">
                {/* Room Name Input */}
                <input
                    type="text"
                    placeholder="Room Name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                {/* Room ID Input */}
                <input
                    type="text"
                    placeholder="Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Duration Input */}
                <input
                    type="number"
                    placeholder="Room Duration (in minutes)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Password Input */}
                <input
                    type="password"
                    placeholder="Password (optional)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                {/* Create Room Button */}
                <button
                    onClick={createRoom}
                    className={`w-full py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Room"}
                </button>
                </div>

                {/* Join Room Section */}
                <div className="mt-12">
                <h3 className="text-2xl font-semibold text-center text-white mb-4">Join an Existing Room</h3>

                <div className="space-y-4">
                    {/* Room ID Input for Joining */}
                    <input
                    type="text"
                    placeholder="Room ID"
                    value={joinRoomId}
                    onChange={(e) => setJoinRoomId(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    {/* Password Input for Joining */}
                    <input
                    type="password"
                    placeholder="Password (if required)"
                    value={joinPassword}
                    onChange={(e) => setJoinPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Join Room Button */}
                    <button
                    onClick={joinRoom}
                    className={`w-full py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                    >
                    {loading ? "Joining..." : "Join Room"}
                    </button>
                </div>
                </div>
            </motion.div>
            </div>
        </motion.div>
        </div>
    );
    };

    export default CreateRoom;
