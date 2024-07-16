import React, { useState, useEffect } from 'react';

const UsernameForm = ({ onSubmit, formData }) => {
  const [username, setUsername] = useState(formData.name ? `@${formData.name}` : '@');

  useEffect(() => {
    // Update the username when formData.name changes
    setUsername(formData.name ? `@${formData.name}` : '@');
  }, [formData.name]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Remove "@" symbol before submitting the username
    const submittedUsername = username.startsWith('@') ? username.substring(1) : username;
    onSubmit(submittedUsername);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>What should we call you?</h2>
      <p>Your @username is unique, you can always change it later.</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(`@${e.target.value}`)}
        required
        placeholder="@"
      />
      <p>List of randomised usernames based on name</p>
      <input type="submit" value="Skip for now" />
    </form>
  );
};

export default UsernameForm;
