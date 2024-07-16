import { supabase } from "@config/supabase";

export const getTheme = async (): Promise<any> => {
    const logged_user = await supabase.auth.getUser();
    if (!logged_user.data.user) return "error";
    // console.log(logged_user.data.user.id);

    try {
      const { data: theme, error: themeError } = await supabase.from('User')
      .select('Darkmode')
      .eq('auth_id', logged_user.data.user.id).single();
  
      if (themeError) {
        throw themeError;
      }
  
      return theme;
      
    } catch (error) {
      return "Error fetching profile details.";
    }
}