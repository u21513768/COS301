import { supabase } from '@config/supabase';

export async function getTweet(tweetId: number): Promise<any> {
    try {
        // Fetch tweets made by the user with the provided user ID
        const { data: tweet, error } = await supabase
            .from('Tweets')
            .select(`Tweet_Id,
                User_Id,
                Content,
                Img_Url,
                Created_at,
                Retweets (
                  count()
                ),
                Likes(
                  count()
                ),
                Saves(
                  count()
                ),
                Comments(
                  count()
                )`)
            .eq('Tweet_Id', tweetId).single();

        if (error) {
            console.error('Error fetching user tweets.');
            return [];
        }

        if (!tweet || tweet.length === 0) {
            return [];
        }
        // console.log(tweet);

        const { data: profileData, error: profileError } = await supabase.from('Profile')
            .select('*')
            .eq('User_Id', tweet.User_Id).single();
  
        if (profileError) {
            throw profileError;
        }

        const { data: userData, error: usererror } = await supabase.from('User')
            .select('Username, Name, Surname')
            .eq('User_Id', tweet.User_Id).single();
            if (usererror) {
                throw new Error('Failed to fetch user data based on username');
              }
        

        // console.log(profileData);

        const tweetdetails = {
            tweetid: tweet.Tweet_Id,
            userid: tweet.User_Id,
            profile_img: profileData.Img_Url,
            name: userData.Name,
            surname: userData.Surname,
            username: userData.Username,
            comments: tweet.Comments[0].count,
            likes: tweet.Likes[0].count,
            retweets: tweet.Retweets[0].count,
            saves: tweet.Saves[0].count,
            content: tweet.Content,
            img_url: tweet.Img_Url,
            created_at: tweet.Created_at
        }
        // console.log(tweetdetails);
        return tweetdetails;
       
    } catch (error) {
        console.error('Error fetching user tweets:', error.message);
    }
}
