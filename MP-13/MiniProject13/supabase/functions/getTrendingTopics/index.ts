// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"
import { corsHeaders } from '../_shared/cors.ts'

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") as string;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") as string;

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {});
/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/getTrendingTopics' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
Deno.serve(async (req) => {
  // This is needed because we are planning to invoke this function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: tags, error: tagsError } = await supabase
      .from('Stored_Tags')
      .select(`
        *,
        Tweet_Tags (
          created_at,
          Tweets (*)
        )
      `)
      // .count('Tweet_Tags(Tweet_Id)', { alias: 'tweet_count' })
      .gte('Tweet_Tags.created_at', thirtyDaysAgo.toISOString()) // Filter tweets within the last 30 days
      // .order('tweet_count', { ascending: false }); // Order by tweet count in descending order

    if (tagsError) {
      throw tagsError;
    }

    // Count the number of tweets for each tag
    const tagsWithTweetCounts = tags.map(tag => {
      const tweetCount = tag.Tweet_Tags.length;
      return {
        ...tag,
        tweet_count: tweetCount
      };
    });
    // Sort the tags by tweet count in descending order
  tagsWithTweetCounts.sort((a, b) => b.tweet_count - a.tweet_count);

    console.log(JSON.stringify(tagsWithTweetCounts));
    return new Response(JSON.stringify(tagsWithTweetCounts), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
