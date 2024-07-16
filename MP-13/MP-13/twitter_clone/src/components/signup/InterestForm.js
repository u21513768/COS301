import React, { useState } from 'react';

const InterestForm = ({ onSubmit }) => {
  const [interests, setInterests] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedCount((prevCount) => prevCount + 1);
      setInterests((prevInterests) => [...prevInterests, value]);
    } else {
      setSelectedCount((prevCount) => prevCount - 1);
      setInterests((prevInterests) => prevInterests.filter((interest) => interest !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCount >= 3) {
      onSubmit(interests);
    } else {
      alert('Please select at least 3 interests.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>What do you want to see on Twitter?</h2>
      <p>
        Select at least 3 interests to personalize your Twitter experience. They will be visible on your profile.
      </p>
      <label>
        <input
          type="checkbox"
          value="Technology"
          checked={interests.includes('Technology')}
          onChange={handleInterestChange}
        />
        Technology
      </label>
      <label>
        <input
          type="checkbox"
          value="Sports"
          checked={interests.includes('Sports')}
          onChange={handleInterestChange}
        />
        Sports
      </label>
      <label>
        <input
          type="checkbox"
          value="Music"
          checked={interests.includes('Music')}
          onChange={handleInterestChange}
        />
        Music
      </label>
      <p>Selected: {selectedCount}</p>
      <button type="submit" disabled={selectedCount < 3}>Next</button>
    </form>
  );
};

export default InterestForm;
