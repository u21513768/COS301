import { supabase } from "@config/supabase";
import { CreateCommentNotification } from "./notifications";

const addComment= async (userId:number,tweetId:number,content:string)=>{
try {
    const { error } = await supabase
    .from('Comments')
    .insert([
    { User_Id: userId, Tweet_Id: tweetId, Content:content },
    ])
    .select()
    if(error) throw error;

    // Insert tweet data into the database
    const { error: tweetError } = await supabase
    .from('Tweets')
    .insert([{ User_Id: userId, Content:content, Img_Url: null, IsTweet:false },])
    .select()

    if (tweetError) {
    throw tweetError;
    }

    // Create comment notification 
    const success = CreateCommentNotification(tweetId, userId);
    if(success !== error)
    return success;
    else {
        throw success
    }

} catch (error) {
    console.log('Error adding comment: '+error);
    throw error;
}
   
}
export{addComment};
