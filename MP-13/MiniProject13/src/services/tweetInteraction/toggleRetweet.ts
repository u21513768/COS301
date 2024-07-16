import { supabase } from '@config/supabase';
import { CreateRetweetNotification } from '..';

/*export async function toggleRetweet(tweetId: number, userId: number): Promise<"retweeted" | "unretweeted" | "error"> {
    try {
        // Check for existing retweet
        const { data: existingRetweet, error: existingRetweetError } = await supabase
            .from('Retweets')
            .select('*')
            .eq('Tweet_Id', tweetId)
            .eq('Tweeter_Id', userId)
            .single();


        if (existingRetweetError) {
            await supabase.from('Retweets').insert([{ Tweet_Id: tweetId, User_Id: userId }]);
            return "retweeted";
        } else {
            const { error: unretweetError } = await supabase.from('Retweets').delete().eq('Retweet_Id', existingRetweet.Retweet_Id);
            if (unretweetError) {
                return "error";
            }
            return "unretweeted";
        }
    } catch (error: any) {
        console.error('Error toggling retweet for the tweet:', error.message);
    }

}*/

export async function checkIfRetweeted(tweetId: number, userId: number) {
    try {
        // Check for existing like
        const { error } = await supabase
            .from('Retweets')
            .select('*')
            .eq('Tweet_Id', tweetId)
            .eq('Tweeter_Id', userId)
            .single();

        if (error) {
            console.error('Error checking whether the tweet has been retweeted:', error.message);
            return false;
        }
        return true; // Return true if existingLike is not null or undefined

    } catch (error: any) {
        console.error('Error checking whether the tweet has been retweeted:', error.message);
    }
}

export async function retweet(tweetId: number, userId: number): Promise<string> {
    try {
        const { error } = await supabase.from('Retweets').insert({ Tweet_Id: tweetId, Tweeter_Id: userId });
        
        if(!error)
        {
            const success = await CreateRetweetNotification(tweetId,userId);
            if(success === error) throw success;
        }
        return error ? error.message : "success";
    } catch (error: any) {
        console.error('Error retweeting the tweet:', error.message);
        return error.message;
    }
}

export async function unReweet(tweetId: number, userId: number) {
    try {
        // Unlike the tweet
        const { error } = await supabase
            .from('Retweets')
            .delete()
            .eq('Tweet_Id', tweetId)
            .eq('Tweeter_Id', userId);

        if (error) {
            console.error('Error unRetweeting the tweet:', error.message);
            return false;
        }

        return true;
    } catch (error: any) {
        console.error('Error unRetweeting the tweet:', error.message);
    }
}
