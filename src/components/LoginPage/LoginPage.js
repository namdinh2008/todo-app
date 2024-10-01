import React, { useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null); // Store the logged-in user state
  const navigate = useNavigate();

  // Listen to authentication state changes (like when user is logged in or logged out)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user state when user logs in or logs out
    });
    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/todo');
    } catch (error) {
      setErrorMessage('Email or password error. Please try again.');
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/todo');
    } catch (error) {
      setErrorMessage('Incorrect email or password. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/todo');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear the user state on sign out
      navigate('/'); // Navigate back to login page
      console.log('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {user ? ( // Check if the user is logged in
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              Welcome, {user.email}!
            </h2>
            <button
              onClick={handleSignOut}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              {isSignUp ? 'Sign Up' : 'Login'}
            </h2>

            {/* Email and Password input fields */}
            <div className="space-y-4 mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={isSignUp ? handleSignUp : handleLogin}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                {isSignUp ? 'Sign Up' : 'Login'}
              </button>
              <button
                onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                <FcGoogle className="mr-2" /> Login with Google
              </button>
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMessage(''); // Reset error message when switching between forms
                }}
                className="w-full text-gray-500 hover:text-blue-700"
              >
                {isSignUp
                  ? 'Already have an account? Log in here.'
                  : 'Don’t have an account? Sign up here.'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
