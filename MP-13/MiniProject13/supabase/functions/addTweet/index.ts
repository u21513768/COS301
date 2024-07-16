import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"
import { corsHeaders } from '../_shared/cors.ts'

//console.log("Hello from Functions!")

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") as string;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") as string;

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {});
Deno.serve(async (req) => {
  // This is needed because we are planning to invoke this function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const request = await req.json();
    //console.log(request);
    if(request.tweetData.Img_file)
      {
      const tweet = {
        User_Id:request.tweetData.User_Id,
        Content:request.tweetData.Content,
        Img_Url: request.tweetData.Img_file
      };
      // Insert tweet data into the database
      const { data: insertedTweet, error: tweetError } = await supabase
        .from('Tweets')
        .insert([tweet])
        .select()
        addTags(insertedTweet);
      if (tweetError) {
        throw tweetError;
      }
      return new Response(JSON.stringify(insertedTweet), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }
    else{
      const tweet = {
        User_Id:request.tweetData.User_Id,
        Content:request.tweetData.Content,
        Img_Url: null
      };
      // Insert tweet data into the database
      const { data: insertedTweet, error: tweetError } = await supabase
        .from('Tweets')
        .insert([tweet])
        .select()
        console.log("calling addTags");
        addTags(insertedTweet);
      if (tweetError) {
        throw tweetError;
      }
      
      // Return the inserted tweet as response
    return new Response(JSON.stringify(insertedTweet), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
    }
  } catch (error) {
    console.error('Error posting tweet:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
async function addTags(tweetData:any) {
  const regex = /#[^\s#]+/g; // Matches hashtags (#) followed by non-whitespace characters
  const matches = tweetData[0].Content.match(regex);
  if (matches && matches.length > 0) { // Found tags
      for (const match of matches) {
        //console.log(match);
        // Trim the tag to remove the '#' character
        const trimmedTag = match.substring(1);
        console.log(trimmedTag);
            const { data: storedTags, error } = await supabase
            .from('Stored_Tags')
            .select('Tag_Id, Tag_Name')
            .eq('Tag_Name', trimmedTag);
          if (error) {
            throw error
          } else {
            console.log('Stored tags:', storedTags);
          }

          if (storedTags && storedTags.length>0) { // Tag exists, insert into tweet tags directly
              const { data:tags,error } = await supabase
                  .from('Tweet_Tags')
                  .insert([
                      { Tweet_Id: tweetData[0].Tweet_Id, Tag_Id: storedTags[0].Tag_Id },
                  ])
                  .select();
                  console.log("Inserted tags:"+tags);
              if (error) throw error;
          } else { // Store new tag and then insert into tweet tags
              const { data: insertedTag, error: tagInsertError } = await supabase
                  .from('Stored_Tags')
                  .insert([{ Tag_Name: trimmedTag }])
                  .select();

              if (tagInsertError) throw tagInsertError;

              const {data:tags, error } = await supabase
                  .from('Tweet_Tags')
                  .insert([
                      { Tweet_Id: tweetData[0].Tweet_Id, Tag_Id: insertedTag[0].Tag_Id },
                  ])
                  .select();
                  console.log("Inserted new tag: "+tags);
              if (error) throw error;
          }
      }
  } else {
    console.log("Did not find tags");
      return; // No tags found
  }
}