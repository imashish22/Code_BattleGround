import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayQuestions = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await axios.get('http://localhost:6000/api/questions/getAll'); // Update this endpoint as needed
            setQuestions(response.data);
        };
        fetchQuestions();
    }, []);

    return (
        <div>
            <h2>Questions List</h2>
            <ul>
                {questions.map((question) => (
                    <li key={question._id}>
                        <p>{question.question}</p>
                        <p>Options: {question.options.join(', ')}</p>
                        <p>Answer: {question.answer}</p>
                        <p>Difficulty: {question.difficulty}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayQuestions;
