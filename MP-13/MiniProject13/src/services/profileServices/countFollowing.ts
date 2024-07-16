import { supabase } from "@config/supabase";

//following --> I am the fan --> i.e. my ID should be the following id

export const countFollowing = async (userId: string) => {
    try {
      const {count} = await supabase.from('Followers')
      .select('Followed_Id', {count: 'exact'}).eq('Following_Id', userId);
      return count ?? 0;

    } catch (error) {
      console.error('Error counting following:', error);
    }
};