import { supabase } from "@config/supabase";

export const getUserProfiles = async(ids_to_fetch: number[]) => {
    const users = [];

    const {data: res, error: err} = await supabase
    .from("Profile")
    .select("User_Id,Img_Url")
    .in("User_Id", ids_to_fetch);

    //get the username
    const {data: response, error: err2} = await supabase
    .from("User")
    .select("User_Id,Username")
    .in("User_Id", ids_to_fetch);

    if(err || err2){ return []; }

    for(let i = 0; i < ids_to_fetch.length; i++){
        const user_obj = {
            User_Id: ids_to_fetch[i],
            Img_Url: res.map((r) => r.User_Id === ids_to_fetch[i] ? r.Img_Url : null).filter((r) => r !== null)[0],
            Username: response.map((r) => r.User_Id === ids_to_fetch[i] ? r.Username : null).filter((r) => r !== null)[0]
        };
        users.push(user_obj);
    }

    return users;
}