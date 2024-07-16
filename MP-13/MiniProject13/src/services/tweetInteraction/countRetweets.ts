import { supabase } from '@config/supabase';

export async function countRetweets(tweetId: number){
    try {
        const { count} = await supabase
            .from('Retweets')
            .select('Tweet_Id',{count: 'exact'})
            .eq('Tweet_Id', tweetId);

        return count ?? 0;
    } catch (error: any) {
        console.error('Error counting retweets:', error.message);
    }
}