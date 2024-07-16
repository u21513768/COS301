import {supabase} from '@config/supabase';
import { getUserData, getUserProfiles, pickRandomIdsFromFollowingList } from '@services/index';

export const whoMadeThisTweetonDateGame = async () => {
    const randtweet = await getRandomTweetWithDate();
    
    //check errors
    if(typeof randtweet === "string"){
        return randtweet;
    }
    const list = await getListOfFiveUsersTweetedOn(randtweet.User_Id);

    if(list.length === 0){
        return "No users found";
    }

    return {
        candidate_question: {
            question: `Who made this tweet on ${randtweet.Created_at}?`,
            randObj: randtweet
        },
        list_options: list,
        answer_user_id: randtweet.User_Id
    }
}

export const getRandomTweetWithDate = async () => {
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

    const { data: tweet, error: err } = await supabase
    .from('Tweets')
    .select('User_Id,Content,Img_Url,Created_at')
    .eq('User_Id', id.toString())
    .limit(1);
    if (err) {
        return err.message;
    }
    if(tweet.length === 0){
        return "No users found";
    }
    return tweet[0];

    //the two tables of tweets and followers should be joined so that we only select users who have made tweets that the user is following
    //please refactor @michael
}

export const getListOfFiveUsersTweetedOn = async (chosen_answer_id: number) => {
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