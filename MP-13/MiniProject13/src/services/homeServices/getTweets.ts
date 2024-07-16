import {supabase} from '@config/supabase';
// FETCHING TWEETS AND THEIR RESPECTIVE STATS
const fetchTweets = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('getTweets', {
        //this is part of the body of the http request that is passed into the function, I put it here
        // for post requests of making tweets and so forth
        body: {},
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      if (error) {
        throw error;
      }
      return data;

    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

   export {fetchTweets};
