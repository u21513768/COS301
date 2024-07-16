// SignUp.js
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://onwwwinvmssfezabtusm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ud3d3aW52bXNzZmV6YWJ0dXNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTU2NTcxNCwiZXhwIjoyMDI1MTQxNzE0fQ.mOxGCVENYEd-Q0f6c-9YavSrxdLNwW63wcF4Zjp61jg';
const supabase = createClient(supabaseUrl, supabaseKey);

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [userData, setUserData] = useState(null); // State to store user data

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { user, error } = await supabase.auth.signUp({
      email,
      password,
      data: {
        name,
        birth_date: `${year}-${month}-${day}`,
      },
    });

    if (error) {
      console.error('Error signing up:', error.message);
    } else {
      console.log('User signed up:', user);
      console.log(user);
      setUserData(user); // Update user data state
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <label>
          Date of Birth:
          <input type="number" placeholder="Month" value={month} onChange={e => setMonth(e.target.value)} min="1" max="12" required />
          <input type="number" placeholder="Day" value={day} onChange={e => setDay(e.target.value)} min="1" max="31" required />
          <input type="number" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} min="1900" max="2024" required />
        </label>
        <input type="submit" value="Sign Up" />
      </form>
      {userData && ( // Conditionally render user data if available
        <div>
          <h2>User Data:</h2>
          <p>Name: {userData.user_metadata.name}</p>
          <p>Email: {userData.email}</p>
          <p>UID: {userData.id}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default SignUp;
