import { render  } from '@testing-library/react';
import { describe, expect, test, } from 'vitest';
import Home from './HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//===============MOCK FOR fetch USers=====================================================
const fetchUsers = async () => {
  return [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
};

const fetchUsersWithError = async () => {
  throw new Error('Failed to fetch users');
};

let users: any[] = [];
const setUsers = (data: any[]) => {
  users = data;
};

const fetchData = async () => {
  try {
    const usersData = await fetchUsers();
    setUsers(usersData as any[]);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const fetchData2 = async () => {
  try {
    const usersData = await fetchUsersWithError();
    setUsers(usersData as any[]);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};


//=========================MOCK for fetch tweets==============================================================
const mockFetchTweets = async () => {
  return [{ id: 1, text: 'Tweet 1' }, { id: 2, text: 'Tweet 2' }];
};
const mockFetchTweetsError = async () => {
  throw new Error('Failed to fetch tweets');
};

let tweets: any[] = [];
const setTweets = (data: any[]) => {
  tweets = data;
};

const fetchTweetData = async () => {
  try {
    const tweetData = await mockFetchTweets(); 
    setTweets(tweetData as any[]);
  } catch (error) {
    console.error('Error fetching tweets:', error);
  }
};

const fetchTweetData2 = async () => {
  try {
    const tweetData = await mockFetchTweetsError(); 
    setTweets(tweetData as any[]);
  } catch (error) {
    console.error('Error fetching tweets:', error);
  }

};

//========================================Mocking getCurrentUser=============================================================================================

const mockIsUserLoggedIn = async () => {
  return { id: 1, username: 'testUser' };
};

const mockIsUserLoggedInError = async () => {
  throw new Error('Failed to fetch current User');
};


let currentUser: any = null;
const setCurrentUser = (user: any) => {
  currentUser = user;
};

// Simulate the getCurrentUser function
const getCurrentUser = async () => {
  try {
    const user = await mockIsUserLoggedIn(); 
    setCurrentUser(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
  }
};

const getCurrentUserError = async () => {
  try {
    const user = await mockIsUserLoggedInError(); 
    setCurrentUser(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
  }
};

//======================================Mock Function for getTimeDispaly =====================================================================================================

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

//==========================================Mocking formatCOunt function=========================================================================================

const formatCount = (count: number): string | number => {
  if (count < 1000) {
    return count; // Return as it is if less than 1000
  } else if (count < 1000000) {
    // Convert to K format
    return (count / 1000).toFixed(1) + "K";
  } else {
    // Convert to M format
    return (count / 1000000).toFixed(1) + "M";
  }
};
//=====================================================================================================================================================================

describe('HomePage component', () => {
  test("renders without crashing", () => {
    render(
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </Router>);
  })

  test('fetchData updates users data correctly', async () => {
    await fetchData();
    expect(users).toEqual([{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]);
  });

  test('fetchData handles error correctly', async () => {
    users = []
    await fetchData2();
    expect(users).toEqual([]);
  });

  test('fetchTweets updates users data correctly', async () => {
    await fetchTweetData();
    expect(tweets).toEqual([{ id: 1, text: 'Tweet 1' }, { id: 2, text: 'Tweet 2' }]);
  });

  test('fetchTweets handles error correctly', async () => {
    tweets = []
    await fetchTweetData2();
    expect(tweets).toEqual([]);
  });

  test('GetCurrUser updates users data correctly', async () => {
    await getCurrentUser();
    expect(currentUser).toEqual( {id: 1, username: 'testUser'} );
  });

  test('GetCurrUser handles error correctly', async () => {
    currentUser = null;
    await getCurrentUserError();
    expect(currentUser).toEqual(null);
  });

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

  test('formatCount returns count as it is when less than 1000', () => {
    expect(formatCount(500)).toBe(500);
    expect(formatCount(999)).toBe(999);
  });

  test('formatCount returns count in K format when between 1000 and 999999', () => {
    expect(formatCount(1000)).toBe('1.0K');
    expect(formatCount(50000)).toBe('50.0K');
    expect(formatCount(999999)).toBe('1000.0K');
  });

  test('formatCount returns count in M format when greater than or equal to 1000000', () => {
    expect(formatCount(1000000)).toBe('1.0M');
    expect(formatCount(5000000)).toBe('5.0M');
    expect(formatCount(1000000000)).toBe('1000.0M');
  });

});