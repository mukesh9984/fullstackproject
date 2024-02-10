
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Profile from './Profile';
import EditProfile from './EditProfile';
import './App.css';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignupSubmit = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <h1>Mukesh's App</h1>
        <Routes>
          <Route exact path='/' element={<SignupForm onSignupSuccess={handleSignupSubmit} />} />
          <Route path="/signup" element={<SignupForm onSignupSuccess={handleSignupSubmit} />} />
          <Route path="/login" element={<LoginForm setLoggedIn={setLoggedIn} />} />
          {true ? (
            <>
              <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
              <Route path="/editProfile" element={<EditProfile />} />
            </>
          ) : (
            <Route exact path='/' element={<SignupForm onSignupSuccess={handleSignupSubmit} />} />
          )}
        </Routes>
      </div>
    </Router>

  );
};

export default App;






