import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';  // Import your To-Do list component
import LoginPage from './components/LoginPage/LoginPage';  // Import the Login component

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/todo" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
