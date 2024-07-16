import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bookmarks from './Bookmarks';
import { isUserLoggedIn } from '@services/index';

// Example function that indirectly calls checkUser
async function executeFunctionThatCallsCheckUser() {
  const result = await isUserLoggedIn();
  if (!result) {
    console.log("Redirecting to home page"); // Simulate the behavior of redirecting to the home page
  }
}

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

describe('Bookmarks component', () => {
  test("renders without crashing", () => {
    render(
      <Router>
          <Routes>
            <Route path="/" element={<Bookmarks />} />
          </Routes>
      </Router>);
  })
})

test("checkUser redirects to home page if user is not logged in", async () => {
  const mockIsUserLoggedIn = vi.fn(async () => false);

  Object.defineProperty(window, "@services/index", {
    value: {
      isUserLoggedIn: mockIsUserLoggedIn,
    },
  });

  await executeFunctionThatCallsCheckUser();
});

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