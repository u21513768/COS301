import React, { useState } from 'react';

const FollowAccountForm = ({ onSubmit }) => {
  const [accounts, setAccounts] = useState([]);

  const handleAccountChange = (e) => {
    const { value } = e.target;
    setAccounts((prevAccounts) =>
      prevAccounts.includes(value)
        ? prevAccounts.filter((account) => account !== value)
        : [...prevAccounts, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(accounts);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Don't miss out</h2>
      <p>When you follow someone, you'll see their Tweets in your Timeline.
        You'll also get more relevant recommendations.
      </p>
      <h3>Follow 1 or more accounts</h3>
      <label>
        <input
          type="checkbox"
          value="OpenAI"
          checked={accounts.includes('OpenAI')}
          onChange={handleAccountChange}
        />
        OpenAI
      </label>
      <label>
        <input
          type="checkbox"
          value="Twitter"
          checked={accounts.includes('Twitter')}
          onChange={handleAccountChange}
        />
        Twitter
      </label>
      <label>
        <input
          type="checkbox"
          value="Google"
          checked={accounts.includes('Google')}
          onChange={handleAccountChange}
        />
        Google
      </label>
      <button type="submit" disabled={accounts < 1}>Next</button>
    </form>
  );
};

export default FollowAccountForm;
