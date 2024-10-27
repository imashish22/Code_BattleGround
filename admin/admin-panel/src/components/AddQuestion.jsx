// src/components/AddQuestion.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const AddQuestion = () => {
    const [categories, setCategories] = useState([]);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [answer, setAnswer] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');

    // Fetch categories from backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories/getall');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newQuestion = {
            question,
            options,
            answer,
            category: selectedCategory,
            difficulty,
        };

        try {
            await axios.post('/api/questions/add', newQuestion);
            alert('Question added successfully!');
            // Reset form after submission
            setQuestion('');
            setOptions(['', '', '', '']);
            setAnswer('');
            setSelectedCategory('');
            setDifficulty('');
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    return (
        <Container className="my-4">
            <h3 className="text-center mb-4">Add New Quiz Question</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="categorySelect">
                    <Form.Label column sm={3}>Category</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            as="select"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="questionText" className="mt-3">
                    <Form.Label column sm={3}>Question</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mt-3">
                    <Form.Label column sm={3}>Options</Form.Label>
                    <Col sm={9}>
                        {options.map((opt, index) => (
                            <Form.Control
                                key={index}
                                type="text"
                                className="mt-2"
                                placeholder={`Option ${index + 1}`}
                                value={opt}
                                onChange={(e) => {
                                    const updatedOptions = [...options];
                                    updatedOptions[index] = e.target.value;
                                    setOptions(updatedOptions);
                                }}
                                required
                            />
                        ))}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="correctAnswer" className="mt-3">
                    <Form.Label column sm={3}>Correct Answer</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="difficultySelect" className="mt-3">
                    <Form.Label column sm={3}>Difficulty</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            as="select"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            required
                        >
                            <option value="">Select difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <div className="text-center mt-4">
                    <Button type="submit" variant="primary">
                        Add Question
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default AddQuestion;
