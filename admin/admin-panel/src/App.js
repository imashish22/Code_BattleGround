import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CategoryManager from './components/CategoryManager';
import AddQuestion from './components/AddQuestion';
// import OtherFunctionality from './components/OtherFunctionality';

const App = () => {
    return (
        <Router>
            <div className="d-flex">
                {/* Sidebar */}
                <div className="col-md-3 bg-light p-4 vh-100">
                    <h2 className="text-dark font-weight-bold">Admin Panel Features</h2>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link to="/categories" className="text-primary">
                                Manage Categories
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/add-question" className="text-primary">
                                Add Quiz Questions
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/other" className="text-primary">
                                Other Functionality
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="col-md-9 p-4">
                    <Routes>
                        <Route path="/categories" element={<CategoryManager />} />
                        <Route path="/add-question" element={<AddQuestion />} />
                        {/* <Route path="/other" element={<OtherFunctionality />} /> */}
                        <Route path="/" element={<h1 className="text-dark">Welcome to the Admin Panel</h1>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
