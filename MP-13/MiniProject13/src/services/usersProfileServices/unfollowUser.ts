import { supabase } from "@config/supabase";

export const unfollowUser = async (loggedInUserId: number, userToUnfollowId: number) => {
    try {
        // Check if the logged-in user is following the userToUnfollow
        const { data: existingFollowData} = await supabase.from('Followers').select('id').eq('Following_Id', loggedInUserId).eq('Followed_Id', userToUnfollowId).single();

        if (!existingFollowData) {
            return { error: "User is not following this user." };
        }

        // If following, delete the entry from the Followers table
        const { error: deleteError } = await supabase.from('Followers').delete().eq('Following_Id', loggedInUserId).eq('Followed_Id', userToUnfollowId);

        if (deleteError) {
            return { error: "Error unfollowing user." };
        }
        return { success: true };


    } catch (error) {
        console.error('Error unfollowing user:', error);
    }
};