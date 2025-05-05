

import Room from '../models/roomModel.js';
import CodeQuestion from '../models/codequestionModel.js';
import { User } from '../models/user_model.js';

// Create a new room
export const createRoom = async (req, res) => {
  const { roomId, roomName, password, userId, username, duration } = req.body;

  try {
    const existingRoom = await Room.findOne({ roomId });
    if (existingRoom) {
      return res.status(400).json({ message: 'Room ID already exists' });
    }

    const createdAt = new Date();
    const deadline = new Date(createdAt.getTime() + duration * 60000); // duration in minutes

    const newRoom = new Room({
      roomId,
      roomName,
      password,
      hostUser: userId,
      participants: [{ userId, username }],
      createdAt,
      duration,
      deadline,
    });

    await newRoom.save();
    res.status(201).json({ message: 'Room created successfully', room: newRoom });
  } catch (err) {
    res.status(500).json({ message: 'Error creating room', error: err.message });
  }
};

export const joinRoom = async (req, res) => {
  const { roomId, userId, username, password } = req.body;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const currentTime = new Date();
    if (currentTime >= room.deadline) {
      return res.status(400).json({ message: 'Room has already closed' });
    }

    if (room.password && room.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    room.participants.push({ userId, username, joinedAt: currentTime });
    await room.save();

    res.status(200).json({ message: 'Successfully joined the room' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const selectQuestions = async (req, res) => {
    const { roomId, questionIds, userId } = req.body;
  
    try {
      const room = await Room.findOne({ roomId });
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      if (room.hostUser.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'Only the host can select questions' });
      }
  
      const currentTime = new Date();
      if (currentTime >= room.deadline) {
        return res.status(400).json({ message: 'Room has already closed, cannot select questions' });
      }
  
      const questions = await CodeQuestion.find({ '_id': { $in: questionIds } });
  
      if (questions.length === 0) {
        return res.status(404).json({ message: 'Questions not found' });
      }
  
      room.selectedQuestions = questions.map(question => ({
        questionId: question._id,
        questionTitle: question.title,
      }));
      await room.save();
  
      res.status(200).json({ message: 'Questions selected successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error selecting questions', error: err.message });
    }
  };
  

  export const getRoom = async (req, res) => {
    try {
      const { roomId } = req.params;
  
      const room = await Room.findOne({ roomId })
      .populate('participants', 'username _id');

  
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      res.status(200).json(room);
    } catch (error) {
      console.error('Error fetching room:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Get leaderboard
export const getLeaderboard = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const currentTime = new Date();
    if (currentTime >= room.deadline) {
      return res.status(400).json({ message: 'Room has already closed, leaderboard not available' });
    }

    const leaderboard = room.participants
      .map(participant => {
        const passedTestCases = participant.testResults.filter(result =>
          result.testCaseResults.every(testCase => testCase.passed)
        ).length;

        const totalTestCases = participant.testResults.length;
        return {
          userId: participant.userId,
          username: participant.username,
          passedTestCases,
          totalTestCases,
          submissionTime: participant.submissionTime,
        };
      })
      .sort((a, b) => {
        // Sort by number of test cases passed, then by submission time (earlier first)
        if (a.passedTestCases === b.passedTestCases) {
          return a.submissionTime - b.submissionTime; // Earlier submission first
        }
        return b.passedTestCases - a.passedTestCases; // More test cases passed first
      });

    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: 'Error getting leaderboard', error: err.message });
  }
};


