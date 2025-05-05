



import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  roomName: { type: String, required: true },
  password: { type: String }, // Optional password
  hostUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      username: { type: String },
      joinedAt: { type: Date, default: Date.now },
      testResults: [
        {
          questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'CodeQuestion' },
          testCaseResults: [
            {
              passed: { type: Boolean },
              nooftestcase: { type: Number }, 
            },
          ],
          submissionTime: { type: Date, default: Date.now },
        },
      ],
    },
  ],
  selectedQuestions: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'CodeQuestion' },
      questionTitle: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

// Method to join the room
roomSchema.methods.joinRoom = function(userId, username, password) {
  if (this.password && this.password !== password) {
    throw new Error("Incorrect password");
  }

  const participant = this.participants.find(p => p.userId.toString() === userId.toString());
  
  if (participant) {
    throw new Error("User is already in the room");
  }

  this.participants.push({ userId, username });
  return this.save();
};

// Method to add coding questions to the room
roomSchema.methods.selectQuestions = function(questions) {
  this.selectedQuestions = questions.map(q => ({
    questionId: q._id,
    questionTitle: q.title,
  }));
  return this.save();
};

// Method to get the leaderboard
roomSchema.methods.getLeaderboard = function() {
  return this.participants
    .map(participant => {
      const totalTestCasesPassed = participant.testResults.reduce((total, result) => {
        return total + result.testCaseResults.filter(tc => tc.passed).length;
      }, 0);

      const totalTime = participant.testResults.reduce((total, result) => {
        return total + result.testCaseResults.reduce((tcTotal, tc) => tcTotal + tc.timeTaken, 0);
      }, 0);

      return {
        userId: participant.userId,
        username: participant.username,
        totalTestCasesPassed,
        totalTime,
      };
    })
    .sort((a, b) => {
      if (b.totalTestCasesPassed === a.totalTestCasesPassed) {
        return a.totalTime - b.totalTime; // Sort by time taken (ascending)
      }
      return b.totalTestCasesPassed - a.totalTestCasesPassed; // Sort by test cases passed (descending)
    });
};

// Method to get room details including host name
roomSchema.methods.getRoomDetails = async function() {
  const room = this;
  const host = await User.findById(room.hostUser, 'username'); // Fetch only the username of the host
  if (!host) {
    throw new Error('Host not found');
  }

  return {
    roomId: room.roomId,
    roomName: room.roomName,
    hostName: host.username, // Add host name dynamically
    password: room.password,
    participants: room.participants.map(participant => ({
      _id: participant.userId,
      username: participant.username,
    })),
    createdAt: room.createdAt,
    selectedQuestions: room.selectedQuestions,
  };
};

const Room = mongoose.model("Room", roomSchema);

export default Room;
