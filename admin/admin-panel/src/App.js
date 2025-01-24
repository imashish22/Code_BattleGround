import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CategoryManager from './components/CategoryManager';
import AddQuestion from './components/AddQuestion';
import CodeCategory from './components/CodeCategory';
import CodeQuestion from './components/CodeQuestion';
import CodeQuestionPage from './components/CodeQuestionsPage';

const App = () => {
    return (
        <Router>
            <div className="d-flex">
                {/* Sidebar */}
                <div className="col-md-3 bg-light p-4 vh-100">
                    <h2 className="text-dark font-weight-bold">Admin Panel Features</h2>
                    <ul className="list-group">
  <li className="list-group-item bg-primary">
    <Link to="/categories" className="text-white text-decoration-none">
      Manage Categories
    </Link>
  </li>
  <li className="list-group-item bg-primary">
    <Link to="/add-question" className="text-white text-decoration-none">
      Add Quiz Questions
    </Link>
  </li>
  <li className="list-group-item bg-primary">
    <Link to="/code-categories" className="text-white text-decoration-none">
      Add Code Categories
    </Link>
  </li>
  <li className="list-group-item bg-primary">
    <Link to="/code-question-add" className="text-white text-decoration-none">
      Add Code Questions
    </Link>
  </li>
  <li className="list-group-item bg-primary">
    <Link to="/code-questions" className="text-white text-decoration-none">
      Code Questions
    </Link>
  </li>
</ul>

                </div>

                {/* Main Content */}
                <div className="col-md-9 p-4">
                    <Routes>
                        <Route path="/categories" element={<CategoryManager />} />
                        <Route path="/add-question" element={<AddQuestion />} />
                        <Route path="/code-categories" element={<CodeCategory />} />
                        <Route path="/code-question-add" element={<CodeQuestion />} />
                        <Route path="/code-questions" element={<CodeQuestionPage />} />
                        <Route path="/" element={<h1 className="text-dark">Welcome to the Admin Panel</h1>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
