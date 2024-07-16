// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Login from './components/Login';
import SignUp from './components/SignUp';
import VerificationCodeForm from './components/signup/VerificationCodeForm'; // Import the VerificationCodeForm component
import PasswordForm from './components/signup/PasswordForm'; // Import the PasswordForm component
import UsernameForm from './components/signup/UsernameForm'; // Import the UsernameForm component

import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;