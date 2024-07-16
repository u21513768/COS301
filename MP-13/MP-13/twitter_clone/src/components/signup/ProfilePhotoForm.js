import React, { useState } from 'react';

const ProfilePhotoForm = ({ onSubmit }) => {
  const [photo, setPhoto] = useState('');

  const handlePhotoChange = (e) => {
    setPhoto(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(photo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pick a profile picture</h2>
      <p>Have a favorite selfie? Upload it now.</p>
      <input type="file" onChange={handlePhotoChange} />
      <button type="submit">Skip for now</button>
    </form>
  );
};

export default ProfilePhotoForm;
