import { supabase } from "@config/supabase";

export const checkIfFollowing = async (loggedInUserId: number, userToCheckId: number): Promise<boolean> => {
    try {
        const { data: existingFollowData } = await supabase.from('Followers')
        .select('id')
        .eq('Following_Id', loggedInUserId)
        .eq('Followed_Id', userToCheckId)
        .single();

        if (existingFollowData !== null) {
            return true; // Return true if the user is following
        } else {
            return false; // Return false if the user is not following
        }

    } catch (error) {
        console.error('Error checking if user is following:', error);
        return false;
    }
};
