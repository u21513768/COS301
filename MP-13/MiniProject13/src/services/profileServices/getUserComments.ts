import { supabase } from '@config/supabase';

export async function getUserComments(userId: number){
    try {
        // Fetch comments made by the user with the provided user ID
        const { data: userComments, error } = await supabase
            .from('Comments')
            .select('*')
            .eq('User_Id', userId);

        if (error) {
            console.error('Error fetching user comments:');
            return [];
        }

        if (!userComments || userComments.length === 0) {
            return [];
        }

        return userComments;
    } catch (error: any) {
        console.error('Error fetching user comments:', error.message);
    }
}
