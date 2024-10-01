import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; 
import { signOut, onAuthStateChanged } from 'firebase/auth'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';  // Import your To-Do list component
import LoginPage from './components/LoginPage/LoginPage';  // Import the Login component

const App = () => {
  const [user, setUser] = useState(null); // Track the logged-in user state

  // Monitor user authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user when logged in
      } else {
        setUser(null); // Reset user when logged out
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);  // Firebase sign-out
      setUser(null);  // Reset user state after signing out
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* If user is not logged in, redirect them to login page */}
        <Route
          path="/"
          element={user ? <Navigate to="/todo" /> : <LoginPage />}
        />
        {/* Protected route for To-Do list, accessible only if user is logged in */}
        <Route
          path="/todo"
          element={user ? <HomePage handleLogout={handleLogout} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
