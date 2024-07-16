import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notifications from './Notifications';


const getTimeDisplay = (timestamp:string) => {
  const currentTime = new Date();
  const parsedTimestamp = new Date(timestamp);

  const timeDiff = currentTime.getTime() - parsedTimestamp.getTime(); // Get time difference in milliseconds
  const minutesDiff = Math.floor(timeDiff / 60000); // Convert milliseconds to minutes

  let timeDisplay;
  if (minutesDiff < 60) {
    timeDisplay = `${minutesDiff}m`;
  } else {
    const hoursDiff = Math.floor(minutesDiff / 60); // Convert minutes to hours
    if (hoursDiff < 24) timeDisplay = `${hoursDiff}h`;
    else {
      const month = parsedTimestamp.toLocaleString("en-us", {
        month: "short",
      });
      const day = parsedTimestamp.getDate();
      timeDisplay = `${month} ${day}`;
    }
  }

  return timeDisplay;
};

describe('Notifications component', () => {
  test("renders without crashing", () => {
    render(
      <Router>
          <Routes>
            <Route path="/" element={<Notifications />} />
          </Routes>
      </Router>);
  })

  test('displays time in minutes if less than an hour', () => {
    const timestamp = new Date().toISOString(); // Current timestamp
    const timeDisplay = getTimeDisplay(timestamp);
    expect(timeDisplay).toMatch(/\d+m/); 
  });

  test('displays time in hours if less than a day', () => {
    const currentTime = new Date();
    const timestamp = new Date(currentTime.getTime() - 2 * 60 * 60 * 1000).toISOString(); // Two hours ago
    const timeDisplay = getTimeDisplay(timestamp);
    expect(timeDisplay).toMatch(/\d+h/); 
  });

  test('displays date if more than a day ago', () => {
    const timestamp = new Date('2024-04-24T12:00:00').toISOString(); 
    const timeDisplay = getTimeDisplay(timestamp);
    expect(timeDisplay).toMatch(/\w{3} \d+/);
  });


})