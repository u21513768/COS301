import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import SignUpForm from './signup/SignUpForm'; // Component for entering basic information
import VerificationCodeForm from './signup/VerificationCodeForm'; // Component for entering verification code
import PasswordForm from './signup/PasswordForm'; // Component for entering password
import ProfilePhotoForm from './signup/ProfilePhotoForm'; // Component for uploading profile photo
import UsernameForm from './signup/UsernameForm'; // Component for entering username
import NotificationForm from './signup/NotificationForm'; // Component for setting notification preferences
import InterestForm from './signup/InterestForm'; // Component for selecting interests
import SubInterestForm from './signup/SubInterestForm'; // Component for selecting sub-interests
import FollowAccountForm from './signup/FollowAccountForm'; // Component for following accounts

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // State to track the current step of the signup process
  const [signUpComplete, setSignUpComplete] = useState(false); // State to track if sign-up process is complete
  const [formData, setFormData] = useState({}); // State to store form data across steps

  async function signUpNewUser(formData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.emailOrPhone,
        password: 'password',
        options: {
          emailRedirectTo: 'https://twitter.com',
        },
      });
      console.log('Sign-up data:', data);
      console.error('Sign-up error:', error);
      return { data, error };
    } catch (error) {
      console.error('Error during sign-up:', error.message);
      return { error };
    }
  }
  

  const handleSignUpSubmit = async (formData) => {
    // Handle sign-up submission logic
    console.log('Sign up form data:', formData);
    setFormData(formData);

    await signUpNewUser(formData);
    // Move to the next step (verification code form)
    setStep(2);
  };

  const handleVerificationCodeSubmit = (verificationCode) => {
    // Handle verification code submission logic
    console.log('Verification code:', verificationCode);
    // Move to the next step (password form)
    setStep(3);
  };

  const handlePasswordSubmit = (password) => {
    // Handle password submission logic
    console.log('Password:', password);
    // Move to the next step (username form)
    setStep(4);
  };

  const handlePhotoSubmit = (photo) => {
    // Handle photo submission logic
    console.log('Profile photo:', photo);
    // Move to the next step (username form)
    setStep(5);
  };

  const handleUsernameSubmit = (username) => {
    // Handle username submission logic
    console.log('Username:', username);
    // Set sign-up process as complete
    setStep(6);
  };

  const handleNotificationFormSubmit = (notificationPreferences) => {
    console.log('Notification preferences:', notificationPreferences);
    // Move to the next step (interest form)
    setStep(7);
  }

  const handleInterestSubmit = (interests) => {
    console.log('Interests:', interests);
    // Move to the next step (sub-interest form)
    setStep(8);
  }

  const handleSubInterestSubmit = (subInterests) => {
    console.log('Sub-interests:', subInterests);
    // Move to the next step (notification form)
    setStep(9);
  }

  const handleFollowAccountSubmit = (accounts) => {
    console.log('Accounts:', accounts);
    // Set sign-up process as complete
    setSignUpComplete(true);
  }

  // If sign-up process is complete, navigate back to the sign-in page
  if (signUpComplete) {
    navigate('/'); // Render nothing, as navigation will take place
  }

  // Render the appropriate form based on the current step
  let formComponent;
  switch (step) {
    case 1:
      formComponent = <SignUpForm onSubmit={handleSignUpSubmit} />;
      break;
    case 2:
      formComponent = <VerificationCodeForm formData={formData} onSubmit={handleVerificationCodeSubmit} setStep={setStep} />;
      break;
    case 3:
      formComponent = <PasswordForm onSubmit={handlePasswordSubmit} />;
      break;
    case 4:
      formComponent = <ProfilePhotoForm onSubmit={handlePhotoSubmit} />;
      break;
    case 5:
      formComponent = <UsernameForm onSubmit={handleUsernameSubmit} formData={formData} />;
      break;
    case 6:
      formComponent = <NotificationForm onSubmit={handleNotificationFormSubmit} />;
      break;
    case 7:
      formComponent = <InterestForm onSubmit={handleInterestSubmit} />;
      break;
    case 8:
      formComponent = <SubInterestForm onSubmit={handleSubInterestSubmit} />;
      break;
    case 9:
      formComponent = <FollowAccountForm onSubmit={handleFollowAccountSubmit} />;
      break;
    default:
      formComponent = <SignUpForm onSubmit={handleSignUpSubmit} />;
  }

  return (
    <div>
      <h1>Twitter Sign Up</h1>
      {formComponent}
    </div>
  );
};

export default SignUp;
