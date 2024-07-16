import { supabase } from '@config/supabase';

export const setTheme = async (theme: boolean) => {
    const logged_user = await supabase.auth.getUser();
    if (!logged_user.data.user) return "error";

    const { error } = await supabase.from("User").update({
        Darkmode: theme,
    }).eq('auth_id', logged_user.data.user.id);

    if (error) {
        return "Error updating theme";
    } else {
        return "Username updated theme";
    }
};