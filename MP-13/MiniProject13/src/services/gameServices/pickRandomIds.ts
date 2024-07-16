import { supabase } from "@config/index";
import { getUserData } from "@services/index";

export const pickRandomIdsFromFollowingList = async(chosen_answer_id: number) => {
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

    const ids_to_fetch: number[] = [];
    let count = 0;
    const maxCount = 4;
    for(let i = 0; i < data.length; i++){
            //randomly decide if we should pick this user
        const deciding = Math.random();

        if((data.length - i <= data.length)){
            const id = data[i].Followed_Id;
            if(id !== null){
                ids_to_fetch.push(id);
                ++count;
            }
        }
        else if(deciding > 0.5){
            const id = data[i].Followed_Id;
            if(id !== null){
                ids_to_fetch.push(id);
                ++count;
            }
        }

        if(count === maxCount){ break; }
    }
    //check if chosen_answer_id is in the list
    if(!ids_to_fetch.includes(chosen_answer_id)){
        const randomIndex = Math.floor(Math.random() * ids_to_fetch.length);
        ids_to_fetch.splice(randomIndex, 0, chosen_answer_id);
    }

    return ids_to_fetch;
}