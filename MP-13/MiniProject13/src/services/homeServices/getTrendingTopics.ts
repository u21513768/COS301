import {supabase} from '@config/supabase';
import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from '@supabase/supabase-js'

const getTrendingTopics = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('getTrendingTopics', {
      body: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (error) {
      throw error;
    }
    return data;

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
/**Here's the structure of getTrending JSON data:

The JSON data is an array of objects.
Each object represents a tag and contains the following key-value pairs:
 "Tag_Id": The ID of the tag.
 "Tag_Name": The name of the tag.
 "Tweet_Tags": An array of objects representing tweet tags associated with this tag. Each tweet tag object contains:
    "Tweets": An object representing one tweet associated with this tweet tag. The tweet object contains:
          "Content": The content of the tweet.
          "Img_Url": The URL of the image attached to the tweet (if any).
          "User_Id": The ID of the user who posted the tweet.
          "Tweet_Id": The ID of the tweet.
          "Created_at": The timestamp when the tweet was created.
  "created_at": The timestamp when the tweet tag was created.
"tweet_count": The count of tweets associated with this tag. */

 export {getTrendingTopics};
  
