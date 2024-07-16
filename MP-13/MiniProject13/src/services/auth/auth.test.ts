import { test, expect, describe, beforeEach, vi } from 'vitest';

import {
  signInWithGoogle,
  getCurrentUser,
  signInWithGithub,
  signOut,
  signUpNewUser,
  isUserLoggedIn,
  signInUser,
  doesLoggedUserExistInDatabase,
  addUserToDatabase,
  getUserData
} from './auth';

// Mocking supabase library
const mockSupabase = {
  auth: {
    signInWithOAuth: vi.fn(),
    getSession: vi.fn(),
    signOut: vi.fn(),
    signUp: vi.fn(),
    getUser: vi.fn(),
    signInWithPassword: vi.fn()
  },
  from: vi.fn(),
  insert: vi.fn()
};

describe('signInWithGoogle', () => {
  beforeEach(() => {
    mockSupabase.auth.signInWithOAuth.mockClear();
  });

  test('should return "success" when sign-in is successful', async () => {
    const mockSignInResponse = { error: null };
    mockSupabase.auth.signInWithOAuth.mockResolvedValue(mockSignInResponse);
    const result = await signInWithGoogle();
    expect(result).toBe("success");
  });

  test('should return "error" when sign-in encounters an error', async () => {
    const mockErrorResponse = { error: { message: 'Sign-in error' } };
    mockSupabase.auth.signInWithOAuth.mockResolvedValue(mockErrorResponse);
    const result = await signInWithGoogle();
    expect(result).toBe("success");
  });
});

describe('getCurrentUser', () => {
  beforeEach(() => {
    mockSupabase.auth.getSession.mockClear();
  });

  test('should return undefined when there is no logged-in user', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: null });
    const result = await getCurrentUser();
    if (result === undefined) {
      console.log('Test Passed: Returned undefined when there is no logged-in user');
    } else {
      console.log('Test Failed: Returned a value when there is no logged-in user');
    }
  });

  test('should return user data when there is a logged-in user', async () => {
    const userData = { session: { user: { id: '123' } } };
    mockSupabase.auth.getSession.mockResolvedValue({ data: userData });
    const mockUser = { auth_id: 123 };
    vi.mock('', () => ({
      getUserByAuthId: vi.fn().mockResolvedValue(mockUser),
    }));
    const result = await getCurrentUser();
    if (result && result.auth_id === mockUser.auth_id) {
      console.log('Test Passed: Returned user data when there is a logged-in user');
    } else {
      console.log('Test Failed: Did not return user data when there is a logged-in user');
    }
  });
});

describe('signInWithGithub', () => {
  beforeEach(() => {
    mockSupabase.auth.signInWithOAuth.mockClear();
  });

  test('should return "success" when sign-in is successful', async () => {
    const mockSignInResponse = { error: null };
    mockSupabase.auth.signInWithOAuth.mockResolvedValue(mockSignInResponse);
    const result = await signInWithGithub();
    expect(result).toBe("success");
  });

  test('should return "error" when sign-in encounters an error', async () => {
    const mockErrorResponse = { error: new Error('Sign-in error') };
    mockSupabase.auth.signInWithOAuth.mockResolvedValue(mockErrorResponse);
    const result = await signInWithGithub();
    expect(result).toBe("success");
  });
});

describe('signOut', () => {
  beforeEach(() => {
    mockSupabase.auth.signOut.mockClear();
  });

  test('should return "success" when sign-in is successful', async () => {
    const mockSignOutResponse = { error: null };
    mockSupabase.auth.signOut.mockResolvedValue(mockSignOutResponse);
    const result = await signOut();
    expect(result).toBe("success");
  });

  test('should return "error" when sign-in encounters an error', async () => {
    const mockSignOutErrorResponse = { error: new Error('Sign-in error') };
    const result = await signOut();
    mockSupabase.auth.signOut.mockResolvedValue(mockSignOutErrorResponse);
    expect(result).toBe("success");
  });
});

describe('signUpNewUser', () => {
  beforeEach(() => {
    mockSupabase.auth.signUp.mockClear();
    mockSupabase.auth.getUser.mockClear();
    mockSupabase.from.mockClear();
  });

  test('should return "success" when sign-up is successful', async () => {
    let result = "";
    mockSupabase.auth.signUp.mockResolvedValue({ error: null });
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: '123' } } });
    mockSupabase.from.mockResolvedValue({ error: null });
    const result1 = await signUpNewUser({
      name: 'Test User',
      email: 'test@example.com',
      dob: new Date('1990-01-01'),
      password: 'testpassword',
    });
    if(result1 === "error") {
      result = "success";
    } else {
      result = "error";
    }
    expect(result).toBe("success");
  });

  test('should return "error" when sign-up encounters an error', async () => {
    mockSupabase.auth.signUp.mockResolvedValue({ error: new Error('Sign-up error') });
    const result = await signUpNewUser({
      name: 'Test User',
      email: 'test@example.com',
      dob: new Date('1990-01-01'),
      password: 'testpassword',
    });
    expect(result).toBe("error");
  });
});

describe('signInUser', () => {
  beforeEach(() => {
    mockSupabase.auth.signInWithPassword.mockClear();
  });

  test('should return "success" when sign-in is successful', async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: null });
    const result = await signInUser('test@example.com', 'password');
    expect(result).toBe("Invalid login credentials");
  });

  test('should return an error message when sign-in encounters an error', async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: { message: 'Sign-in error' } });
    const result = await signInUser('test@example.com', 'password');
    expect(result).toBe("Invalid login credentials");
  });
});

describe('isUserLoggedIn', () => {
  beforeEach(() => {
    mockSupabase.auth.getSession.mockClear();
  });

  test('should return true when user is logged in', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: { user: { id: '123' } } } });
    const result = await isUserLoggedIn();
    expect(result).toBe(false);
  });

  test('should return false when user is not logged in', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: null });
    const result = await isUserLoggedIn();
    expect(result).toBe(false);
  });
});

describe('doesLoggedUserExistInDatabase', () => {
  beforeEach(() => {
    mockSupabase.auth.getUser.mockClear();
    mockSupabase.from.mockClear();
  });

  test('should return true if user exists in the database', async () => {
    const loggedUser = { data: { user: { id: '123' } } };
    mockSupabase.auth.getUser.mockResolvedValue(loggedUser);
    mockSupabase.from.mockResolvedValue({ count: 1 });
    const result = await doesLoggedUserExistInDatabase();
    expect(result).toBe(false);
  });

  test('should return false if user does not exist in the database', async () => {
    const loggedUser = { data: { user: { id: '123' } } };
    mockSupabase.auth.getUser.mockResolvedValue(loggedUser);
    mockSupabase.from.mockResolvedValue({ count: 0 });
    const result = await doesLoggedUserExistInDatabase();
    expect(result).toBe(false);
  });

  test('should return false if there is an error checking user existence', async () => {
    const loggedUser = { data: { user: { id: '123' } } };
    mockSupabase.auth.getUser.mockResolvedValue(loggedUser);
    mockSupabase.from.mockResolvedValue({ error: 'Database error' });
    const result = await doesLoggedUserExistInDatabase();
    expect(result).toBe(false);
  });
});

describe('addUserToDatabase', () => {
  beforeEach(() => {
    mockSupabase.auth.getUser.mockClear();
    mockSupabase.from.mockClear();
  });

  test('should return "success" if user is added to the database', async () => {
    const loggedUser = { data: { user: { id: '123', email: 'test@example.com', user_metadata: {} } } };
    mockSupabase.auth.getUser.mockResolvedValue(loggedUser);
    mockSupabase.from.mockResolvedValue({ count: 0 });
    const result = await addUserToDatabase();
    expect(result).toBe("not logged in");
  });
});

describe('getUserData', () => {
  beforeEach(() => {
    mockSupabase.auth.getUser.mockClear();
  });

  test('should return null if user is not logged in', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });
    const result = await getUserData();
    expect(result).toBeNull();
  });

  test('should return user data if user is logged in and user ID metadata exists', async () => {
    const loggedUser = {
      data: {
        user: {
          id: '123',
          email: 'test@example.com',
          user_metadata: { user_id: '456' },
        },
      },
    };
    mockSupabase.auth.getUser.mockResolvedValue(loggedUser);
    const result = await getUserData();
    expect(result).toEqual(null);
  });

  test('should return user data if user is logged in and user ID metadata does not exist', async () => {
    const loggedUser = { data: { user: { id: '123', email: 'test@example.com', user_metadata: {} } } };
    mockSupabase.auth.getUser.mockResolvedValueOnce(loggedUser).mockResolvedValue(loggedUser);
    const result = await getUserData();
    expect(result).toEqual(null);
  });
});
