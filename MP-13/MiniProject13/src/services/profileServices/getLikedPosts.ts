import { supabase } from "@config/supabase";

//please note the User_id should be passed and not the auth_id!
export const fetchLikedPosts = async (userId: number): Promise<any> =>{
    try {
        // Fetch liked posts for the given user id that was passed into the function
        const { data, error } = await supabase
            .from('Likes')
            .select('Tweet_Id')
            .eq('User_Id', userId);

        if (error) {
            throw error;
        }

        // Extracting the Tweet_Id to fetch the posts that have been likes by the user
        const likedPostIds = data.map(item => item.Tweet_Id);

        // Fetch details of the liked posts
        const { data: likedPostsData, error: likedPostsError } = await supabase
            .from('Tweets')
            .select('*')
            .in('Tweet_Id', likedPostIds);

        if (likedPostsError) {
            console.error('Error fetching details of liked posts:', likedPostsError.message);
            return null;
        }

        return likedPostsData;
    } catch (error: any) {
        console.error('Error fetching liked posts:', error.message);
    }
}