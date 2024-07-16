import { supabase } from "@config/supabase";

//This function is potentially being replaced.

export async function getLoggedUserId() {
    try {
        const { data } = await supabase.auth.getSession();

        if (data.session !== null) {
            const userId = data.session.user.id;

            if (userId) {
                const { data: userData, error } = await supabase.from('User')
                    .select('User_Id')
                    .eq('auth_id', userId)
                    .single();

                if (error) {
                    console.error('Error fetching user data:', error.message);
                    return null;
                }

                return userData?.User_Id || null;
            }
        }

        return null;
    } catch (error: any) {
        console.error('Error fetching session:', error.message);
    }
}