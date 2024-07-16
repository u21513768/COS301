import { supabase } from '@config/supabase';

export async function toggleRetweet(tweetId: number, userId: number): Promise<"retweeted" | "unretweeted" | "error"> {
    try {
        // Check for existing retweet
        const { data: existingRetweet, error: existingRetweetError } = await supabase
            .from('Retweet')
            .select('*')
            .eq('Tweet_Id', tweetId)
            .eq('User_Id', userId)
            .single();

        if (existingRetweetError) {
            return "error";
        }

        if (existingRetweet) {
            const { error: unretweetError } = await supabase.from('Retweet').delete().eq('Retweet_Id', existingRetweet.Retweet_Id);
            if (unretweetError) {
                return "error";
            }
            return "unretweeted";
        } else {
            const { error: retweetError } = await supabase.from('Retweet').insert([{ Tweet_Id: tweetId, User_Id: userId }]);
            if (retweetError) {
                return "error";
            }
            return "retweeted";
        }
    } catch (error: any) {
        console.error('Error toggling retweet for the tweet:', error.message);
        return "error";
    }
}