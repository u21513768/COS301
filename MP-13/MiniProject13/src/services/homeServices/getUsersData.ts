import {supabase} from '@config/supabase';
// FETCHING THE USERS FROM THE USER TABLE
const fetchUsers = async () => {
    try {
        const { data: usersData, error } = await supabase.from('User').select('User_Id, Username, Name, Surname');
       if (error) {
         throw error;
       }
       //console.log(usersData);
       return usersData
    } catch (error) {
       console.error('Error fetching users:', error);
    }
   };

export {fetchUsers};