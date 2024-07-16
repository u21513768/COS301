import {supabase} from '@config/supabase';

export const fetchUserByUsername = async (username: string) => {
  try {
    // Query the users table to fetch user data
    const { data: userData, error } = await supabase.from('User').select('User_Id, Username, Name, Surname, Created_at, auth_id').eq('Username', username).single();

    if (error) {
      console.log('Error fetching user data based on username:');
      return null;
    }

    return userData;

  } catch (error) {
    console.error('Error fetching user data based on username:', error);
  }
};