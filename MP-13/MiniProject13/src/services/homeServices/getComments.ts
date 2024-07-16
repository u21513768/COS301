import { supabase } from "@config/supabase";

const getComments = async (tweetId: number) => {
  try {
    const { data: Comments, error } = await supabase
      .from('Comments')
      .select("*, User(Name, Username, Created_at , Profile(Img_Url))")
      .eq('Tweet_Id', tweetId)

    if (error) throw error;
    console.log(Comments);
    return Comments;

  } catch (error) {
    console.log('Error fetching comments: ' + error);
    throw error;
  }
}

export { getComments };

const getAllComments = async () => {
  try {
    const { data: Comments, error } = await supabase
      .from('Comments')
      .select("*, User(Name, Username, Created_at , Profile(Img_Url))")

    if (error) throw error;
    console.log(Comments);
    return Comments;

  } catch (error) {
    console.log('Error fetching comments: ' + error);
    throw error;
  }
}

export { getAllComments };
