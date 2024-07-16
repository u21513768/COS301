import { supabase } from '@config/supabase';

export async function getUserTweets(userId: number){
    try {
        // Fetch tweets made by the user with the provided user ID
        const { data: userTweets, error } = await supabase
            .from('Tweets')
            .select('*')
            .eq('User_Id', userId);

        if (error) {
            console.error('Error fetching user tweets.');
            return [];
        }

        if (!userTweets || userTweets.length === 0) {
            return [];
        }

        return userTweets;
    } catch (error: any) {
        console.error('Error fetching user tweets:', error.message);
    }
}
