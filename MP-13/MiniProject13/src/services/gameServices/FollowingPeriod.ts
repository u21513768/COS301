import {supabase} from '@config/supabase';
import { getUserData, getUserProfiles, pickRandomIdsFromFollowingList } from '@services/index';

export const getOldestFollowing = async () => {
    const User = await getUserData();
    if(User === null){
        return "User not found or user is not logged in";
    }

    const { data: oldest_following, error } = await supabase
    .from('Followers')
    .select('Followed_Id')
    .eq('Following_Id', User.user_metadata.user_id)
    .order('Follow_date', {ascending: true})
    .limit(1);

    if (error) {
        return error.message;
    }

    if(oldest_following.length === 0 || oldest_following[0].Followed_Id === null){
        return "No users found";
    }

    const ids_to_fetch = await pickRandomIdsFromFollowingList(oldest_following[0].Followed_Id);
    if(typeof ids_to_fetch === "string"){
        return ids_to_fetch;
    }

    const users = await getUserProfiles(ids_to_fetch);
    
    return {
        candidate_question: {
            question: "Who have you been following longest?",
        },
        list_options: users,
        answer_user_id: oldest_following[0].Followed_Id
    }
}

export const getNewestFollowing = async () => {
    const User = await getUserData();
    if(User === null){
        return "User not found or user is not logged in";
    }

    const { data: newest_following, error } = await supabase
    .from('Followers')
    .select('Followed_Id')
    .eq('Following_Id', User.user_metadata.user_id)
    .order('Follow_date', {ascending: false})
    .limit(1);

    if (error) {
        return error.message;
    }

    if(newest_following.length === 0 || newest_following[0].Followed_Id === null){
        return "No users found";
    }

    const ids_to_fetch = await pickRandomIdsFromFollowingList(newest_following[0].Followed_Id);
    if(typeof ids_to_fetch === "string"){
        return ids_to_fetch;
    }

    const users = await getUserProfiles(ids_to_fetch);
    
    return {
        candidate_question: {
            question: "Who is the person you most recently started following?",
        },
        list_options: users,
        answer_user_id: newest_following[0].Followed_Id
    }
}