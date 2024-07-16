import { supabase } from '@config/supabase';

export async function countComments(tweetId: number){
    try {
        const { count } = await supabase
            .from('Comments')
            .select('Tweet_Id', {count: 'exact'})
            .eq('Tweet_Id', tweetId);

        return count ?? 0;
    } catch (error: any) {
        console.error('Error counting comments:', error.message);
    }
}