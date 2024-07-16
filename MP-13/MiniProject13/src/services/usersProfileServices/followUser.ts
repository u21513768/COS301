import { supabase } from "@config/supabase";
import { CreateFollowNotification } from "..";

export const followUser = async (loggedInUserId: number, userToFollowId: number) => {
    try {
        // Check if the logged-in user is already following the userToFollow
        const { data: existingFollowData} = await supabase.from('Followers').select('id').eq('Following_Id', loggedInUserId).eq('Followed_Id', userToFollowId).single();

        if (existingFollowData) {
            return { error: "User is following this user." };
        }

        await supabase.from('Followers').insert([{ Following_Id: loggedInUserId, Followed_Id: userToFollowId }]);
        CreateFollowNotification(loggedInUserId,userToFollowId);
        return { success: true };

    } catch (error) {
        console.error('Error following user:', error);
    }
};