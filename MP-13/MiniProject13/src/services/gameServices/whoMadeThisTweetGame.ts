import {supabase} from '@config/supabase';
import { getUserData, getUserProfiles, pickRandomIdsFromFollowingList } from '@services/index';

export const whoMadeThisTweetGame = async () => {
    const randtweet = await getRandomTweet();
    //check errors
    if(typeof randtweet === "string"){
        return randtweet;
    }

    
    const list = await getListOfFiveUsersTweets(randtweet.User_Id);
    randtweet.Content = '"'+randtweet.Content+'"';
    if(list.length === 0){
        return "No users found";
    }
    console.log(list);
    console.log(randtweet);
    return {
        candidate_question: {
            question: "Who made a tweet with the following text?",
            randObj: randtweet
        },
        list_options: list,
        answer_user_id: randtweet.User_Id
    }
}

export const getRandomTweet = async () => {
    const User = await getUserData();
    if(User === null){
        return "User not found or user is not logged in";
    }
    // console.log(User);
    const { data, error } = await supabase
    .from('Tweets')
    .select('User_Id');
    if (error) {
        return error.message;
    }
    // console.log(data);
    //randomly choose a user
    const randomIndex = Math.floor(Math.random() * data.length);
    // console.log(randomIndex);
    //check if followed is null
    const id = data[randomIndex].User_Id;
    // console.log(id);
    if(id === null || id === undefined){
        return "No users found";
    }

    const { data: tweet, error: err } = await supabase
    .from('Tweets')
    .select('User_Id,Content,Img_Url')
    .eq('User_Id', id.toString())
    .limit(1);
    if (err) {
        return err.message;
    }
    console.log(tweet[0]);
    return tweet[0];

    //the two tables of tweets and followers should be joined so that we only select users who have made tweets that the user is following
    //please refactor @michael
}

export const getListOfFiveUsersTweets = async (chosen_answer_id: number) => {
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