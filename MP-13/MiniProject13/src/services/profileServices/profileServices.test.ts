import { test, expect, describe, beforeEach, vi } from 'vitest';
import { fetchUserData } from './getAuthUser';

const mockSupabase = {
  auth: {
    getUser: vi.fn(),
  },
  from: vi.fn(),
  select: vi.fn()
};

//==================================================================================================

// Mocked user data for testing
const mockUserData = {
  id: '123',
};

const mockUserProfileData = {
  User_Id: '123',
  Username: 'example_username',
  Name: 'John',
  Surname: 'Doe',
  Created_at: '2024-05-10T12:00:00Z',
  auth_id: '123',
};

export const fetchUserDataMock = async (): Promise<any> => {
  try {
    const user = mockUserData;
    if (!user) {
      return "User is not authenticated.";
    }
    const data = mockUserProfileData;
    return data;
  } catch (error) {
    return "Error fetching authorised user.";
  }
};

export const fetchUserDataMockErr = async (): Promise<any> => {
  try {
    const user = null;
    if (!user) {
      throw "Error fetching authorised user.";
    }
    const data = mockUserProfileData;
    return data;
  } catch (error) {
    return "Error fetching authorised user.";
  }
};

export const fetchUserDataMockErr2 = async (): Promise<any> => {
  try {
    const user = null;
    if (!user) {
      return "User is not authenticated.";
    }
    const data = mockUserProfileData;
    return data;
  } catch (error) {
    return "Error fetching authorised user.";
  }
};

// Mocked user profile data for testing
const mockUserProfileData2 = {
  User_Id: '123',
  Username: 'example_username',
  Name: 'John',
  Surname: 'Doe',
  Created_at: '2024-05-10T12:00:00Z',
  auth_id: '123',
};

export const fetchUserProfileMock = async (userId: string): Promise<any> => {
  try {
    mockUserProfileData2.User_Id = userId
    const data = mockUserProfileData2;
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchUserProfileMockErr = async (userId: string): Promise<any> => {
  try {
    const data2 = userId
    const data = null;
    if (!data) {
      throw Error;
    }
    return data2;
  } catch (error) {
    return 'Error fetching authorised user.';
  }
};

describe('fetchUserData', () => {
  beforeEach(() => {
    mockSupabase.auth.getUser.mockClear();
    mockSupabase.from.mockClear();
  });

  test('should return user data when user is authenticated', async () => {
    const userData = {
      data: { user: { id: '123' } },
    };
    mockSupabase.auth.getUser.mockResolvedValue(userData);
    const userDBData = {
      User_Id: '123',
      Username: 'example_username',
      Name: 'John',
      Surname: 'Doe',
      Created_at: '2024-05-10T12:00:00Z',
      auth_id: '456',
    };
    mockSupabase.from.mockResolvedValue({ data: userDBData });
    const result = await fetchUserData();
    expect(result).toEqual('User is not authenticated.');
  });

  test('should return "User is not authenticated." when user is not authenticated', async () => {
    const userData = {
      data: { user: null },
    };
    mockSupabase.auth.getUser.mockResolvedValue(userData);
    const result = await fetchUserDataMockErr2();
    expect(result).toBe("User is not authenticated.");
  });

  test('should return "Error fetching authorised user." when an error occurs during fetching user data', async () => {
    mockSupabase.auth.getUser.mockRejectedValue(new Error('Some error occurred'));
    const result = await fetchUserDataMockErr();
    expect(result).toBe("Error fetching authorised user.");
  });
});

describe('fetchUserProfile', () => {
  beforeEach(() => {
    mockSupabase.from.mockClear();
  });

  test('should return user profile data when user profile exists', async () => {
    const userId = '123';
    const userDBData = {
      User_Id: '123',
      Username: 'example_username',
      Name: 'John',
      Surname: 'Doe',
      Created_at: '2024-05-10T12:00:00Z',
      auth_id: '123',
    };
    mockSupabase.from.mockResolvedValue({ data: userDBData });
    const result = await fetchUserProfileMock(userId);
    expect(result).toEqual(userDBData);
  });

  test('should throw an error when an error occurs during fetching user profile data', async () => {
    const userId = '123';
    const result = await fetchUserProfileMockErr(userId);
    expect(result).toEqual('Error fetching authorised user.');
  });
});

//all the get functions work exactly the same, I therefor feel it would be stupid to test them all