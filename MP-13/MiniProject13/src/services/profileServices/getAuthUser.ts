import { supabase } from "@config/supabase";

// Function to fetch user profile data that is authorised
export const fetchUserData = async (): Promise<any> => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        //console.log(user);
        if (!user) {
          return "User is not authenticated.";
        }
    
        const { data, error: error } = await supabase.from('User')
        .select('User_Id, Username, Name, Surname, Created_at, auth_id')
        .eq("auth_id", user.id).single();
    
        if (error) {
          throw error;
        }
        return data;
        
    } catch (error) {
        return "Error fetching authorised user.";
    }
};

export const fetchUserProfile = async (userId: string): Promise<any> => {
  const { data, error } = await supabase
    .from('User')
    .select('User_Id, Username, Name, Surname, Created_at, auth_id')
    .eq("auth_id", userId).single();

  if (error) {
    throw error;
  }

  return data;
};