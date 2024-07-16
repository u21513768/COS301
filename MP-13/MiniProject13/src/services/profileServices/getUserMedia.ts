import { supabase } from "@config/supabase";

export async function fetchUserMedia(userId: number): Promise<string[]> {
    try {
        // Fetch tweets of the user with the provided user ID
        const { data: tweetsData, error } = await supabase
            .from('Tweets')
            .select('Img_Url')
            .eq('User_Id', userId);

        if (error) {
            throw error;
        }

        //const mediaUrls: string[] = tweetsData.map((tweet) => tweet.Img_Url);

        const mediaUrls: string[] = tweetsData
        .filter((tweet: any) => tweet.Img_Url) // Filter out tweets with null or empty Img_Url
        .map((tweet: any) => tweet.Img_Url); // Extract Img_Url values from remaining tweets

        return mediaUrls;

    } catch (error: any) {
        console.error('Error fetching user media:', error.message);
        return [];
    }
}
