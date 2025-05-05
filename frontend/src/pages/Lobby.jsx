import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Lobby = () => {
  const { roomId } = useParams();
  const { state } = useLocation();
    const navigate = useNavigate();
//   const selectedQuestions = state?.selectedQuestions || [];
  const [selectedquestion,setSelectedQuestions] = useState([]);

  const [participants, setParticipants] = useState([]);
  const [host, setHost] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/rooms/room/${roomId}`);
        const room = response.data;
        console.log(room)
        console.log("Selected Questions:", room.selectedQuestions);
        setSelectedQuestions(room.selectedQuestions); // Set selected questions from the room data
        setParticipants(room.participants); // Room participants

        // Set the first participant as the host
        if (room.participants.length > 0) {
          setHost(room.participants[0]);
        }
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    fetchRoomData();

    // Optional: Poll every few seconds for real-time updates
    const interval = setInterval(fetchRoomData, 3000); // Fetch every 3 sec

    return () => clearInterval(interval); // Cleanup on unmount
  }, [roomId]);

  const handlesubmit = async () => {
    navigate(`/lobby/${roomId}/question-list`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Lobby - Room: {roomId}</h2>

        {/* Participants List */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">Participants</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* Host (First Participant) */}
            {host && (
              <div className="flex flex-col items-center p-4 bg-yellow-200 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {host.username?.charAt(0).toUpperCase()}
                </div>
                <p className="mt-2 font-bold">{host.username}</p>
                <span className="text-sm text-black">(Host)</span>
              </div>
            )}

            {/* Other Participants */}
            {participants
              .filter((p) => p._id !== host?._id) // Exclude the host from being listed as a participant again
              .map((participant) => (
                <div
                  key={participant._id}
                  className="flex flex-col items-center p-4 bg-blue-100 rounded-lg shadow-md"
                >
                  <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {participant.username?.charAt(0).toUpperCase()}
                  </div>
                  <p className="mt-2 font-semibold">{participant.username}</p>
                </div>
              ))}
          </div>

          {/* Total Participants Count */}
          <p className="text-center mt-6 text-gray-700">
            Total Joined: {participants.length}
          </p>
        </div>

        {/* Selected Questions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Selected Questions:</h3>
          <ul className="list-disc list-inside space-y-2">
            {/* Log selectedQuestions to debug */}
            {selectedquestion.map((question) => (
              <li key={question.questionId}>Question: {question.questionTitle}</li>
            ))}
          </ul>
        </div>

        {/* Start Contest Button */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700" onClick={handlesubmit}>   
            Start Contest (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
