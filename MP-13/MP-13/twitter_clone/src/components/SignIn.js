// SignIn.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styling/SignIn.css';
import HomeImage from './HomeImage';

const SignIn = () => {
  return (
    <div className='pageContainer'>
      <div className='imageContainer'>
        <HomeImage />
      </div>
      <div className='signInContainer'>
        <h2>Sign In Page</h2>
        
        <Link to="/signup">Sign up with phone or email</Link>
        <p className='terms'>
        By singing up you agree to the <a href='https://twitter.com/en/tos'>Terms of Service</a>
        and <a href='https://twitter.com/en/privacy'>Privacy Policy</a>, including <a href='https://help.twitter.com/en/rules-and-policies/x-cookies'> Cookie Use</a>.
        </p>
        <div className='login'>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
