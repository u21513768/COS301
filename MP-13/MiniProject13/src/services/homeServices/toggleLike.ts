import { supabase } from '@config/supabase';

export async function toggleLike(tweetId: number, userId: number): Promise<"liked" | "unliked" | "error"> {
    try {
        // Check for existing like
        const { data: existingLike, error: existingLikeError } = await supabase
            .from('Likes').select('*')
            .eq('Tweet_Id', tweetId)
            .eq('User_Id', userId)
            .single();

        if (existingLikeError) {
            console.error('Error checking whether there is an existing like:', existingLikeError.message);
            return "error";
        }

        if (existingLike) {
            // Unlike the tweet
            const { error: unlikeError } = await supabase
                .from('Likes')
                .delete()
                .eq('Like_Id', existingLike.Like_Id);

            if (unlikeError) {
                console.error('Error unliking tweet:', unlikeError.message);
                return "error";
            }
            return "unliked";

        } else {
            // Like the tweet
            const { error: likeError } = await supabase
                .from('Likes')
                .insert([{ Tweet_Id: tweetId, User_Id: userId }]);

            if (likeError) {
                console.error('Error liking tweet:', likeError.message);
                return "error";
            }
            return "liked";
        }
    } catch (error: any) {
        console.error('Error toggling like for the tweet:', error.message);
        return "error";
    }
}
