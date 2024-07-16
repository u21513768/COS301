// Login.js
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://onwwwinvmssfezabtusm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ud3d3aW52bXNzZmV6YWJ0dXNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTU2NTcxNCwiZXhwIjoyMDI1MTQxNzE0fQ.mOxGCVENYEd-Q0f6c-9YavSrxdLNwW63wcF4Zjp61jg';
const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null); // State to store user data

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error logging in:', error.message);
    } else {
      console.log('User logged in:', user);
      setUserData(user); // Update user data state
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <input type="submit" value="Login" />
      </form>
      {userData && ( // Conditionally render user data if available
        <div>
          <h2>User Data:</h2>
          <p>Email: {userData.email}</p>
          <p>UID: {userData.id}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default Login;
