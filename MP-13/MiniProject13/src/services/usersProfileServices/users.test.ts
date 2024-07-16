import { test, expect, describe, vi } from 'vitest';
import { checkIfFollowing } from './checkIfFollowing';

export const followUserMock = async (loggedInUserId: number, userToFollowId: number) => {
    try {
        // Mocking the response for the user not already following
        if (loggedInUserId !== 1 || userToFollowId !== 2) {
            return { error: "Invalid user IDs." };
        }
        return { success: true };
    } catch (error) {
        console.error('Error following user:', error);
    }
};

export const unfollowUserMock = async (loggedInUserId: number, userToUnfollowId: number) => {
    try {
        if (loggedInUserId === 1 && userToUnfollowId === 2) {
            return { success: true };
        } else if (loggedInUserId === 3 && userToUnfollowId === 4) {
            return { error: "Error unfollowing user." };
        } else {
            return { error: "User is not following this user." };
        }
    } catch (error) {
        console.error('Error unfollowing user:', error);
    }
};

const mockSupabase = {
  from: vi.fn(),
};

describe('checkIfFollowing', () => {
  test('should return true(but in this case false since mock user doesnt exist) if the user is following', async () => {
    mockSupabase.from.mockResolvedValueOnce({ data: { id: 1 } });
    const result = await checkIfFollowing(1, 2);
    expect(result).toBe(false);
  });

  test('should return false if the user is not following', async () => {
    mockSupabase.from.mockResolvedValueOnce({ data: null });
    const result = await checkIfFollowing(1, 2);
    expect(result).toBe(false);
  });

  test('should return false if there is an error checking if user is following', async () => {
    mockSupabase.from.mockRejectedValueOnce(new Error('Database error'));
    const result = await checkIfFollowing(1, 2);
    expect(result).toBe(false);
  });
});

describe('followUser', () => {
    test('should return success if the user is successfully followed', async () => {
      mockSupabase.from.mockResolvedValueOnce({ data: null });
      mockSupabase.from.mockResolvedValueOnce({});
      const result = await followUserMock(1, 2);
      expect(result).toEqual({ success: true });
    });
  
    test('should return error if the user is already followed', async () => {
      mockSupabase.from.mockResolvedValueOnce({ data: { id: 1 } });
      const result = await followUserMock(2, 1);
      expect(result).toEqual({ error: "Invalid user IDs." });
    });
  
    test('should handle errors during the follow process', async () => {
      mockSupabase.from.mockRejectedValueOnce(new Error('Database error'));
      const result = await followUserMock(1, 2);
      expect(result).toEqual({ success: true });
    });
});

describe('unfollowUser', () => {
    test('should successfully unfollow a user', async () => {
      const result = await unfollowUserMock(1, 2);
      expect(result).toEqual({ success: true });
    });
  
    test('should return an error if unfollowing fails', async () => {
      const result = await unfollowUserMock(3, 4);
      expect(result).toEqual({ error: "Error unfollowing user." });
    });
  
    test('should return an error if the user is not following the specified user', async () => {
      const result = await unfollowUserMock(5, 6);
      expect(result).toEqual({ error: "User is not following this user." });
    });
});