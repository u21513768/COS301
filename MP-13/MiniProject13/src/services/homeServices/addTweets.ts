import {supabase} from '@config/supabase';
import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from '@supabase/supabase-js'
import { CreateTweetNotification } from './notifications';

const addTweet = async (tweetData: any) => {
  try {
    if(tweetData.Img_file)
    {
      //add img first then invoke the egde function
      //console.log("From add tweet: "+tweetData.Img_file);
      const { data: uploadedImage, error: imageError } = await supabase.storage
      .from('media')
      .upload(`tweet_images/${tweetData.Img_filename}`, tweetData.Img_file, { upsert: false});

    if (imageError) {
      throw imageError;
    }

    
    console.log("uploaded in media");
    console.log(uploadedImage);

    const {data:image_url} = supabase.storage.from("media").getPublicUrl(uploadedImage.path);
    console.log(image_url);

    tweetData.Img_file = image_url.publicUrl;


    const { data, error } = await supabase.functions.invoke('addTweet', {
      body: {tweetData}
    });
    if(error) throw error;
    console.log(data[0].Tweet_Id);
    // Create a notification for the tweet
    const success = CreateTweetNotification(data[0].Tweet_Id);
    if(success !== error)
    return success;
    else {
        throw success
    }
    
    return data;
    }
    else{
    const { data, error } = await supabase.functions.invoke('addTweet', {
      body: {tweetData}
    });
    if(error) throw error;
    console.log(data[0].Tweet_Id);
    // Create a notification for the tweet
    //CreateTweetNotification(data[0].Tweet_Id);
    // Create comment notification 
    const success = CreateTweetNotification(data[0].Tweet_Id);
    if(success !== error)
    return success;
    else {
        throw success
    }
    
    //return data;
  }

  } catch (error) {
    if (error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json()
      console.log('Function returned an error', errorMessage)
    } else if (error instanceof FunctionsRelayError) {
      console.log('Relay error:', error.message)
    } else if (error instanceof FunctionsFetchError) {
      console.log('Fetch error:', error.message)
    }
    throw error; // Re-throw the error to handle it in the calling code if needed
  }
};
  
  export { addTweet };
