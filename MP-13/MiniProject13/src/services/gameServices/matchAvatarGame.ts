import {supabase} from '@config/supabase';
import { getUserData, getUserProfiles, pickRandomIdsFromFollowingList } from '@services/index';

export const matchAvatarGame = async () => {
    const randavt = await getRandomAvatar();
    
    //check errors
    if(typeof randavt === "string"){
        return randavt;
    }
    const list = await getListOfFiveUsersAvatars(randavt.User_Id);

    return {
        candidate_question: {
            question: "Which user you follow has this profile picture?",
            randObj: randavt
        },
        list_options: list,
        answer_user_id: randavt.User_Id
    }
}

export const getRandomAvatar = async () => {
    const User = await getUserData();
    if(User === null){
        return "User not found or user is not logged in";
    }

    const { data, error } = await supabase
    .from('Followers')
    .select('Followed_Id')
    .eq('Following_Id', User.user_metadata.user_id);
    if (error) {
        return error.message;
    }

    //randomly choose a user
    const randomIndex = Math.floor(Math.random() * data.length);

    //check if followed is null
    const id = data[randomIndex].Followed_Id;
    if(id === null){
        return "No users found";
    }

    const { data: avatar_data, error: err } = await supabase
    .from('Profile')
    .select('User_Id,Img_Url')
    .eq('User_Id', id.toString())
    .limit(1);
    if (err) {
        return err.message;
    }
    if(avatar_data.length === 0){
        return "No users found";
    }
    return avatar_data[0];

    //the two tables of profile and followers should be joined so that we only select a user who have made profiles that the user is following
    //please refactor @michael
}

export const getListOfFiveUsersAvatars = async (chosen_answer_id: number) => {
    try {
        const ids_to_fetch = await pickRandomIdsFromFollowingList(chosen_answer_id);
        if(typeof ids_to_fetch === "string"){
            return ids_to_fetch;
        }

        const users = await getUserProfiles(ids_to_fetch);
        
        return users;
    } catch (error: any) {
        console.error(error);
        return [];
    }
}