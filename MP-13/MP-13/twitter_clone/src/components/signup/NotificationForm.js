import React, { useState } from 'react';

const NotificationForm = ({ onSubmit }) => {
  const [notificationPreferences, setNotificationPreferences] = useState(false);

  const handlePreferenceChange = () => {
    setNotificationPreferences(prev => !prev); // Toggle the boolean value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(notificationPreferences);
  };

  return (
    <form onSubmit={handleSubmit}>
      <small>Notification symbol here</small>
      <h2>Turn on notifications</h2>
      <p>Get the most out of Twitter by staying up to date with what's happening.</p>
      <label>
        <input
          type="checkbox"
          checked={notificationPreferences}
          onChange={handlePreferenceChange}
        />
        Allow notifications
      </label>
      <button type="submit">Skip for now</button>
    </form>
  );
};

export default NotificationForm;
