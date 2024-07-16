import { render, fireEvent,waitFor   } from '@testing-library/react';
import { describe, test, vi } from 'vitest';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  isUserLoggedIn, signInWithGithub, signInWithGoogle } from '@services/index';

//using vi.fn() to mock the function to check if they are called correctly without calling them
vi.mock('@services/index', () => ({
  signInWithGithub: vi.fn(),
  signInWithGoogle: vi.fn(),
  isUserLoggedIn: vi.fn()
}))


//testing the login function
describe('Login component', () => {
  //test if the component renders correctly
  test("renders without crashing", () => {
    render(
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
      </Router>);
  })

  //testing if the sign in function works as expected(utility functions)
  test("Sign in with provider", async ({expect}) => {
    const {getByText} = render(
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
      </Router>);

      const googleButt = getByText('Sign up with Google');
      const githubButt = getByText('Sign up with Github');

      await waitFor(() => {
        fireEvent.click(googleButt);
        expect(signInWithGoogle).toHaveBeenCalled();
        expect(isUserLoggedIn).toHaveBeenCalled();
  
        fireEvent.click(githubButt);
        expect(signInWithGithub).toHaveBeenCalled();
        expect(isUserLoggedIn).toHaveBeenCalled();
       
      });

  })
});