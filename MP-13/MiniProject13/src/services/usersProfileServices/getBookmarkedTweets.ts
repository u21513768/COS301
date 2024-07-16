import { supabase } from '@config/supabase';

export async function getBookmarkedTweets(userId: number){
    try {
        // Fetch all tweets (ids) bookmarked by the user
        const { data: bookmarkedTweets, error } = await supabase
            .from('Saves')
            .select('Tweet_Id')
            .eq('User_Id', userId);

        if (error) {
            // console.error('Error fetching bookmarked tweets.');
            return [];
        }
        // console.log("ts file bookmarkedtweets:");
        // console.log(bookmarkedTweets);

        // Extract tweet IDs from the bookmarked tweets data
        const tweetIds = bookmarkedTweets.map((bookmark: any) => bookmark.Tweet_Id);

        //could not find any bookmarked tweets made by this user
        if (tweetIds.length === 0) {
            return [];
        }

        // Fetch details of the bookmarked tweets from the Tweets table
        const { data: tweetsData, error: tweetsError } = await supabase
            .from('Tweets')
            .select(`
            *,
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
            .in('Tweet_Id', tweetIds)
            .order('Created_at', { ascending: false });

        if (tweetsError) {
            //console.error('Error fetching details of bookmarked tweets.');
            return [];
        }

        //no tweets with the id could be found in the Tweets table
        if (!tweetsData || tweetsData.length === 0) {
            return [];
        }

        return tweetsData;

    } catch (error: any) {
        console.error('Error fetching bookmarked tweets:', error.message);
    }
}
