import { supabase } from "@config/supabase";

export async function searchTweet(query: string){
    // return ["the search tweet function is currently not functional", query];
    try {
        const { data: tweetsData, error: tweetsError } = await supabase
            .from('Tweets')
            .select(`User_Id, Content, Img_Url, Created_at,
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
            .ilike('Content', `%${query}%`);

        if (tweetsError) {
            console.error('Error searching for tweets.');
            return [];
        }

        const tweets: string[] = [];

        for (const tweet of tweetsData) {
            // console.log(tweet.saves);

            const{data: userData, error: userError} = await supabase
                .from('User')
                .select('User_Id, Username, Name, Surname')
                .eq('User_Id', tweet.User_Id)
                .single();

            if (userError) {
                console.error('Error fetching user data for the tweet.');
            }

            const tweetInfo = {
                User_Id : userData?.User_Id,
                username : userData?.Username,
                name : userData?.Name,
                surname : userData?.Surname,
                content : tweet.Content,
                image : tweet.Img_Url || '',
                created : tweet.Created_at,
                Retweets : tweet.Retweets || 0,
                Likes : tweet.Likes || 0,
                Saves : tweet.Saves || 0,
                Comments : tweet.Comments || 0,
            };
            tweets.push(tweetInfo);
        }
        // console.log(tweets);
        return tweets;

    } catch (error: any) {
        console.error('Error searching for tweets:', error.message);
        return [];
    }
}
