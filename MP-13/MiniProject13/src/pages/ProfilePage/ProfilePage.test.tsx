import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './ProfilePage';


describe('Profile component', () => {
    test("renders without crashing", () => {
      render(
        <Router>
            <Routes>
              <Route path="/" element={<ProfilePage />} />
            </Routes>
        </Router>);
    })
  })
  
  const getTimeDisplay = (timestamp: string) => {
    const currentTime = new Date();
    const parsedTimestamp = new Date(timestamp);
  
    const timeDiff = currentTime.getTime() - parsedTimestamp.getTime(); 
    const minutesDiff = Math.floor(timeDiff / 60000);
  
    let timeDisplay;
    if (minutesDiff < 60) {
      timeDisplay = `${minutesDiff}m`;
    } else {
      const hoursDiff = Math.floor(minutesDiff / 60); 
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

  test('getTimeDisplay returns correct time display for timestamps within the last hour', () => {
    const currentTimestamp = new Date().getTime();
    const oneMinuteAgo = new Date(currentTimestamp - 60000).toISOString();
    expect(getTimeDisplay(oneMinuteAgo)).toBe('1m');
  });

  test('getTimeDisplay returns correct time display for timestamps within the last 24 hours', () => {
    const currentTimestamp = new Date().getTime();
    const oneHourAgo = new Date(currentTimestamp - 3600000).toISOString();
    expect(getTimeDisplay(oneHourAgo)).toBe('1h');
  });

  test('getTimeDisplay returns correct time display for timestamps beyond 24 hours', () => {
    const timestamp = '2022-01-01T00:00:00.000Z';
    expect(getTimeDisplay(timestamp)).toBe('Jan 1');
  });

