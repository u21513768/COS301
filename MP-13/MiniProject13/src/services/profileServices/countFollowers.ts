import { supabase } from "@config/supabase";

//followers --> checkking for my fans --> i.e. my ID should be the followed id

export const countFollowers = async (userId: string) => {
    try {
      const { count} = await supabase.from('Followers')
      .select('Following_Id', {count: 'exact'})
      .eq('Followed_Id', userId);
  
      return count ?? 0;
      
    } catch (error) {
      console.error('Error counting followers:', error);
    }
    //return undefined;
};