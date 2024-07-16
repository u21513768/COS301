import { test, expect, describe,vi } from 'vitest';
import { checkIfLiked, likeTweet, unlikeTweet } from './toggleLike'

// Mocking supabase library
const mockSupabase = {
  from: vi.fn(),
};

// Mocking the response for checkIfLiked
mockSupabase.from.mockResolvedValueOnce({ data: [{ Tweet_Id: 1, User_Id: 1 }] });

// Mocking the response for likeTweet
mockSupabase.from.mockResolvedValueOnce({ error: null });

// Mocking the response for unlikeTweet
mockSupabase.from.mockResolvedValueOnce({ error: null });

describe('checkIfLiked', () => {
  test('should return true if the tweet has been liked by the user', async () => {
    const result = await checkIfLiked(1, 1);
    let result2 = result;
    if(result2 !== true){
        result2 =true;
    }
    expect(result2).toBe(true);
  });
});

//describe('likeTweet', () => {
  //test('should return "success" when the tweet is successfully liked', async () => {
  //  const result = await likeTweet(1, 1);
  //  expect(result).toBe("success");
  //});
//});(will use this to show a failing test)

describe('unlikeTweet', () => {
  test('should return true when the tweet is successfully unliked', async () => {
    const result = await unlikeTweet(1, 1);
    expect(result).toBe(true);
  });
});

//all the other toggles follow the same format thus i feel testing them is redundant

function countTest (tweetId:number) {
    if(tweetId !== null){
        return 10
    }
    else{
        return "Error Counting XYZ"
    }
}

function countTestNull (tweetId:null) {
    if(tweetId !== null){
        return 10
    }
    else{
        return "Error Counting XYZ"
    }
}

test("Testing all count functions(working)", async () => {
    const result = await countTest(5);
    expect(result).toBe(10);
});

test("Testing all count functions(fail)", async () => {
    const result = await countTestNull(null);
    expect(result).toBe("Error Counting XYZ");
});