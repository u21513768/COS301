import { supabase } from '@config/supabase';
//import { user } from '@nextui-org/react';

//tweet id:94 95 96 : userid: 27 - testing
const CreateFollowNotification = async (followingId:number,followedId:number) => {
      try{
            const { data:username,error:usernameError } = await supabase
          .from('User')
          .select("Username")
          .eq('User_Id', followingId)
          if (usernameError) throw usernameError;

          //console.log(username);
          const Content = `${username[0].Username} followed you`;

          const { data: existingNotifs,error} = await supabase
          .from("Notification")
          .select("*")
          .eq("User_Id", followedId)
          .eq("Type_Id", 1)
          .eq("Content", Content);

          if (error) {
              // Handle the error
              console.error("Error fetching existing notifications:", error);
              throw error;
          } else {
              if (existingNotifs && existingNotifs.length > 0) {
                  // Notification already exists, return it
                  return existingNotifs[0];
              } else {
                  // Notification doesn't exist, insert a new one
                  const { data: newNotif, error: insertError } = await supabase
                      .from("Notification")
                      .insert([
                          {
                              User_Id: followedId,
                              Type_Id: 1,
                              Content: Content,
                              Read: false,
                              Avatar_Url_Id: followingId
                          }
                      ]);

                  if (insertError) {
                      // Handle the insert error
                      console.error("Error inserting new notification:", insertError);
                      throw insertError;
                  } else {
                      // Return the newly inserted notification
                      return newNotif;
                  }
              }
          }

          } catch(error){ 
            console.log(error);
          }
};

export { CreateFollowNotification};

const CreateLikeNotification = async (tweetId:number,userId: number) => {

        try {
          //get owner of the tweet
          const { data: tweet, error: tweetError } = await supabase
            .from('Tweets')
            .select('User_Id')
            .eq('Tweet_Id', tweetId);

          if (tweetError) throw tweetError;

          const { data: username, error: userError } = await supabase
            .from('User')
            .select('Username')
            .eq('User_Id', userId);

          if (userError) throw userError;

          const Content = `${username[0].Username} has liked your tweet`;

          const { data: existingNotifs,error} = await supabase
          .from("Notification")
          .select("*")
          .eq("User_Id", tweet[0].User_Id)
          .eq("Type_Id", 4)
          .eq("Content", Content);

          if (error) {
              // Handle the error
              console.error("Error fetching existing notifications:", error);
              throw error;
          } else {
              if (existingNotifs && existingNotifs.length > 0) {
                  // Notification already exists, return it
                  return existingNotifs[0];
              } else {
                  // Notification doesn't exist, insert a new one
                  const { data: newNotif, error: insertError } = await supabase
                      .from("Notification")
                      .insert([
                          {
                              User_Id: tweet[0].User_Id,
                              Type_Id: 4,
                              Content: Content,
                              Read: false,
                              Tweet_Id: tweetId,
                              Avatar_Url_Id: userId
                          }
                      ]);

                  if (insertError) {
                      // Handle the insert error
                      console.error("Error inserting new notification:", insertError.message);
                  } else {
                      // Return the newly inserted notification
                      return newNotif;
                  }
              }
          }
        } catch (error) {
          console.error(error);
        }
};

export { CreateLikeNotification };

const CreateRetweetNotification = async (tweetId:number,userId: number) => {

  try {
    //get owner of the tweet
    const { data: tweet, error: tweetError } = await supabase
      .from('Tweets')
      .select('User_Id')
      .eq('Tweet_Id', tweetId);

    if (tweetError) throw tweetError;

    const { data: username, error: userError } = await supabase
      .from('User')
      .select('Username')
      .eq('User_Id', userId);

    if (userError) throw userError;

    const Content = `${username[0].Username} has retweeted your tweet`;

    const { data: existingNotifs,error} = await supabase
          .from("Notification")
          .select("*")
          .eq("User_Id", tweet[0].User_Id)
          .eq("Type_Id", 5)
          .eq("Content", Content);

          if (error) {
              // Handle the error
              console.error("Error fetching existing notifications:", error);
              throw error;
          } else {
              if (existingNotifs && existingNotifs.length > 0) {
                  // Notification already exists, return it
                  return existingNotifs[0];
              } else {
                  // Notification doesn't exist, insert a new one
                  const { data: newNotif, error: insertError } = await supabase
                      .from("Notification")
                      .insert([
                          {
                              User_Id: tweet[0].User_Id,
                              Type_Id: 5,
                              Content: Content,
                              Read: false,
                              Tweet_Id: tweetId,
                              Avatar_Url_Id: userId
                          }
                      ]);

                  if (insertError) {
                      // Handle the insert error
                      console.error("Error inserting new notification:", insertError.message);
                  } else {
                      // Return the newly inserted notification
                      return newNotif;
                  }
              }
          }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { CreateRetweetNotification };

// *********Update this********
// Need to get the user ID of the person who tweeted, then 
// create a notification for all followers of that user
// ***************************
const CreateTweetNotification = async (tweetId:number) => {
  try {
    // Get owner of the tweet
    const { data: tweet, error: tweetError } = await supabase
      .from('Tweets')
      .select('User_Id')
      .eq('Tweet_Id', tweetId);

    if (tweetError) throw tweetError;

    const { data: user, error: userError } = await supabase
      .from('User')
      .select('Username')
      .eq('User_Id', tweet[0].User_Id);
    
    if (userError) throw userError;
    console.log(user);
    const Content = `${user[0].Username} made a new tweet`; //${tweet[0].Username} made a new tweet`;

    // Get all followers of the user who made the tweet
    const { data: followersData, error: followersError } = await supabase
      .from('Followers')
      .select('Following_Id')
      .eq('Followed_Id', tweet[0].User_Id);

    if (followersError) throw followersError;

    // Create a notification for each follower
    const notifications = await Promise.all(
      followersData.map(async (follower) => {
        const { data: notif, error: notifError } = await supabase
          .from('Notification')
          .insert([
            {
              User_Id: follower.Following_Id,
              Type_Id: 2, // Assuming Type_Id 2 represents a new post notification
              Content: Content,
              Read: false,
              Tweet_Id: tweetId,
              Avatar_Url_Id: tweet[0].User_Id,
            },
          ])
          .select();

        if (notifError) throw notifError;
        return notif;
      })
    );

    return notifications;
  } catch (error) {
    console.error('Error in CreateTweetNotification:', error);
    throw error; // Re-throw the error to handle it at a higher level if needed
  }
};

export { CreateTweetNotification };

const CreateCommentNotification = async (tweetId:number,userId: number) => {
//there can be multiple notifcations of the same comment if a user comments the same comment
//hence why I dont check if it exsts
  try {
    //get owner of the tweet
    const { data: tweet, error: tweetError } = await supabase
      .from('Tweets')
      .select('User_Id')
      .eq('Tweet_Id', tweetId);

    if (tweetError) throw tweetError;

    const { data: username, error: userError } = await supabase
      .from('User')
      .select('Username')
      .eq('User_Id', userId);

    if (userError) throw userError;

    const Content = `${username[0].Username} has commented on your tweet`;

    const { data: notifs,error} = await supabase
      .from("Notification")
      .insert([{
        User_Id: tweet[0].User_Id,
        Type_Id: 3, // Assuming Type_Id 3 represents a comment notification
        Content: Content,
        Read: false,
        Tweet_Id: tweetId,
        Comment_Id: userId,
        Avatar_Url_Id: userId
      }])
      .select();
      
      if(error) throw error;
      return notifs;

    ///notif = notifs;
  } catch (error) {
    console.error(error);
  }
};

export { CreateCommentNotification };
interface Notification {
  User_Id: number;
  Type_Id: number;
  Content: string;
  Read: boolean;
}
const updateNotifications = async (notifications: Notification[]) => {
  try {
    const updatedNotifications:Notification[] = [];

    // Update each notification in the array
    for (const notification of notifications) {
      const { data:notif, error } = await supabase
        .from('Notification')
        .update({ Read: true })
        .eq('User_Id', notification.User_Id)
        .eq('Type_Id', notification.Type_Id)
        .eq('Content', notification.Content)
        .single();

      if (error) {
        console.error(error);
        continue; // Continue to the next notification if there's an error
      }

      updatedNotifications.push(notif); // Push the updated notification to the array
    }

    return updatedNotifications;
  } catch (error) {
    console.error(error);
    //throw error; // Return null or handle the error as needed
  }
};

export { updateNotifications };

const getUserNotifications = async (userId:number) => {
  try {
    
    const { data: Notifications, error } = await supabase
    .from('Notification')
    .select('*')
    .eq('User_Id',userId)

    if (error) {
      throw error;
    }
    return Notifications;

  } catch (error) {
    console.error('Error getting notifications:', error);
  }
};

 export {getUserNotifications};
