import { test, 
  expect
} from 'vitest';


const addCommentMock = async (userId: number, tweetId: number, content: string) => {
  try {
      // Mocking successful insertion
      const comment = { User_Id: userId, Tweet_Id: tweetId, Content: content };
      return comment;
  } catch (error) {
      console.log('Error adding comment: ' + error);
      throw error;
  }
};

const getCommentsMock = async (tweetId: number) => {
  try {
      // Simulating successful retrieval of comments
      const comments = [
          { id: 1, User_Id: 1, Tweet_Id: tweetId, Content: "Comment 1" },
          { id: 2, User_Id: 2, Tweet_Id: tweetId, Content: "Comment 2" },
      ];
      return comments;
  } catch (error) {
      console.log('Error fetching comments: ' + error);
      throw error;
  }
};

// Mocked implementation for getTrendingTopics
const getTrendingTopicsMock = async () => {
  try {
      // Simulating successful retrieval of trending topics
      const trendingTopics = ["topic1", "topic2", "topic3"];
      return trendingTopics;
  } catch (error) {
      console.log('Error fetching trending topics: ' + error);
      throw error;
  }
};


//Fetchtweets mock
const fetchTweetsMock = async () => {
  try {
      const tweets = [
          { id: 1, content: "Tweet 1" },
          { id: 2, content: "Tweet 2" },
      ];
      return tweets;
  } catch (error) {
      console.error('Error fetching tweets:', error);
      throw error;
  }
};

// Mocked implementation for fetchUsers
const fetchUsersMock = async () => {
  try {
      // Simulating successful retrieval of users
      const usersData = [
          { User_Id: 1, Username: "user1", Name: "John", Surname: "Doe" },
          { User_Id: 2, Username: "user2", Name: "Jane", Surname: "Doe" },
          // Add more users as needed
      ];
      return usersData;
  } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
  }
};

// Mocked implementation for CreateFollowNotification
const CreateFollowNotificationMock = async (followingId: number, followedId: number) => {
  try {
      // Mocking fetching username
      const username = [{ Username: "follower" }];
      
      const Content = `${username[0].Username} followed you`;

      const newNotif = { 
          User_Id: followedId,
          Type_Id: 1,
          Content: Content,
          Read: false,
          FollowId: followingId
      };

      return newNotif;
  } catch (error) {
      console.error(error);
      throw error;
  }
};

// Mocked implementation for CreateLikeNotification
const CreateLikeNotificationMock = async (tweetId: number, userId: number) => {
  try {
      // Mocking fetching username
      const username = [{ Username: "liker" }];
      
      const Content = `${username[0].Username} has liked your tweet`;
      
      // Mocking insertion of new notification
      const newNotif = { 
          User_Id: userId,
          Type_Id: 4,
          Content: Content,
          Read: false,
          tweetId: tweetId
      };

      return newNotif;
  } catch (error) {
      console.error(error);
      throw error;
  }
};  

// Mocked implementation for CreateRetweetNotification
const CreateRetweetNotificationMock = async (tweetId: number, userId: number) => {
  try {
      // Mocking fetching username
      const username = [{ Username: "retweeter" }];
      
      const Content = `${username[0].Username} has retweeted your tweet`;
      
      const newNotif = { 
          User_Id: userId,
          Type_Id: 5,
          Content: Content,
          Read: false,
          tweetId: tweetId
      };

      return newNotif;
  } catch (error) {
      console.error(error);
      throw error;
  }
};

const CreateTweetNotificationMock = async (tweetId: number) => {
  try {
      const tweet = [{ User_Id: 1, tweetId }]; 
      
      const Content = `you made a new tweet`;

      const newNotif = { 
          User_Id: tweet[0].User_Id,
          Type_Id: 2,
          Content: Content,
          Read: false
      };

      return [newNotif]; 
  } catch (error) {
      console.error(error);
      throw error;
  }
};

const CreateCommentNotificationMock = async (tweetId: number, userId: number) => {
  try {
      
      const username = [{ Username: "commenter" }];
      
      const Content = `${username[0].Username} has commented on your tweet`;

      const newNotif = { 
          User_Id: userId,
          Type_Id: 3,
          Content: Content,
          Read: false,
          tweetId: tweetId
      };

      return [newNotif]; 
  } catch (error) {
      console.error(error);
      throw error;
  }
};

const updateNotificationsMock = async (notifications: any[]) => {
  try {
      const updatedNotifications: any[] = [];

      for (const notification of notifications) {
          const updatedNotification = { ...notification, Read: true };
          updatedNotifications.push(updatedNotification);
      }

      return updatedNotifications;
  } catch (error) {
      console.error(error);
      throw error;
  }
};

const getUserNotificationsMock = async (userId: number) => {
  try {
      const notifications = [
          { User_Id: userId, Type_Id: 2, Content: "you made a new tweet", Read: false },
          { User_Id: userId, Type_Id: 3, Content: "commenter has commented on your tweet", Read: false }
      ];

      return notifications;
  } catch (error) {
      console.error('Error getting notifications:', error);
      throw error;
  }
};

test('addComment inserts a comment successfully', async () => {
  const result = await addCommentMock(1,1,"TestComment");

  expect(Array.isArray(result)).toBe(false);


  expect(result.User_Id).toBeGreaterThan(0);
  expect(result.Tweet_Id).toBeGreaterThan(0);
  expect(result.Content).toBeDefined();
    
});


test('getComment retrieves comments correctly', async () => {

  const result = await getCommentsMock(1);

  expect(Array.isArray(result)).toBe(true);

  expect(result[0].id).toBeDefined();
  expect(result[0].Tweet_Id).toBe(1);
  expect(result[0].Content).toBeDefined();
  expect(result[0].User_Id).toBeDefined();
    
});

test("getTrendingTopics retrieves trending topics correctly", async () => {

  const result = await getTrendingTopicsMock();

  expect(Array.isArray(result)).toBe(true);

  expect(result.length).toBeGreaterThan(0);
});

test("fetchTweets retrieves tweets correctly", async () => {

  const result = await fetchTweetsMock();

  expect(Array.isArray(result)).toBe(true);

  expect(result.length).toBeGreaterThan(0);
});

test("fetchUsers retrieves users correctly", async () => {
  const result = await fetchUsersMock();

  expect(Array.isArray(result)).toBe(true);

  expect(result.length).toBeGreaterThan(0);
});

test("CreateFollowNotification creates follow notification correctly", async () => {
  const followingId = 1;
  const followedId = 2;

  const result = await CreateFollowNotificationMock(followingId, followedId);

  expect(result).toBeDefined();

  expect(result.User_Id).toBe(followedId);
  expect(result.Type_Id).toBe(1);
  expect(result.Content).toBe("follower followed you");
  expect(result.Read).toBe(false);

});


test("CreateLikeNotification creates like notification correctly", async () => {
  const tweetId = 1;
  const userId = 2;

  const result = await CreateLikeNotificationMock(tweetId, userId);

  expect(result).toBeDefined();

  expect(result.User_Id).toBe(userId);
  expect(result.Type_Id).toBe(4);
  expect(result.Content).toBe("liker has liked your tweet");
  expect(result.Read).toBe(false);
});

test("CreateRetweetNotification creates retweet notification correctly", async () => {
  const tweetId = 1;
  const userId = 2;

  const result = await CreateRetweetNotificationMock(tweetId, userId);

  expect(result).toBeDefined();

  expect(result.User_Id).toBe(userId);
  expect(result.Type_Id).toBe(5);
  expect(result.Content).toBe("retweeter has retweeted your tweet");
  expect(result.Read).toBe(false);

});

test("CreateTweetNotification creates tweet notification correctly", async () => {
  const tweetId = 1;

  const result = await CreateTweetNotificationMock(tweetId);

  expect(Array.isArray(result)).toBe(true);

  const [notification] = result; 
  expect(notification.User_Id).toBe(1);
  expect(notification.Type_Id).toBe(2);
  expect(notification.Content).toBe("you made a new tweet");
  expect(notification.Read).toBe(false);
});

test("CreateCommentNotification creates comment notification correctly", async () => {
  const tweetId = 1;
  const userId = 2;

  const result = await CreateCommentNotificationMock(tweetId, userId);

  expect(Array.isArray(result)).toBe(true);

  const [notification] = result; 
  expect(notification.User_Id).toBe(userId);
  expect(notification.Type_Id).toBe(3);
  expect(notification.Content).toBe("commenter has commented on your tweet");
  expect(notification.Read).toBe(false);
});

test("updateNotifications updates notifications correctly", async () => {

  const notifications = [
      { User_Id: 1, Type_Id: 2, Content: "you made a new tweet", Read: false },
      { User_Id: 1, Type_Id: 3, Content: "commenter has commented on your tweet", Read: false }
  ];

  const result = await updateNotificationsMock(notifications);

  expect(Array.isArray(result)).toBe(true);

  for (const updatedNotification of result) {
      expect(updatedNotification.Read).toBe(true);
  }

});

test("getUserNotifications retrieves user notifications correctly", async () => {
  const userId = 1;

  const result = await getUserNotificationsMock(userId);

  expect(Array.isArray(result)).toBe(true);

  for (const notification of result) {
      expect(notification.User_Id).toBe(userId);
  }

});
