import {supabase} from '@config/supabase';

export const updateProfileDetails = async(user_data:  {
        Banner_Url?: string, 
        Bio?: string, 
        Img_Url?: string,
        Location?: string,
        Profile_Type?: string,
        Theme?: boolean, 
        Website?: string,
        Gender?: string
    }
) => 
{
    const logged_user = await supabase.auth.getUser();
    if (!logged_user.data.user) return "error";

    const id = await supabase.from('User').select('User_Id').eq('auth_id', logged_user.data.user.id);

    if(id.data === null)return "success";
    if(id.data.length === 0)return "success";

    const { error } = await supabase
        .from('Profile')
        .update({
            Banner_Url: user_data.Banner_Url,
            Bio: user_data.Bio,
            Img_Url: user_data.Img_Url,
            Location: user_data.Location,
            Profile_Type: user_data.Profile_Type,
            Theme: user_data.Theme,
            Website: user_data.Website,
            Gender: user_data.Gender,
        })
        .eq('User_Id', id.data[0].User_Id);

    if(error){
        const res = await insertProfileDetails(user_data);
        if(res === "error")return "error";
    }
    else{
        return "success";
    }
}

export const insertProfileDetails = async(user_data:  {
        Banner_Url?: string, 
        Bio?: string, 
        Img_Url?: string,
        Location?: string,
        Profile_Type?: string,
        Theme?: boolean, 
        Website?: string,
        Gender?: string
    }
) => 
{
    const logged_user = await supabase.auth.getUser();
    if (!logged_user.data.user) return "error";

    const id = await supabase.from('User').select('User_Id').eq('auth_id', logged_user.data.user.id);

    if(id.data === null)return "error";
    if(id.data.length === 0)return "error";

    const { error } = await supabase
        .from('Profile')
        .insert({
            Banner_Url: user_data.Banner_Url,
            Bio: user_data.Bio,
            Img_Url: user_data.Img_Url,
            Location: user_data.Location,
            Profile_Type: user_data.Profile_Type,
            Theme: user_data.Theme,
            User_Id: id.data[0].User_Id,
            Website: user_data.Website,
            Gender: user_data.Gender,
        });

    return error ? "error" : "success";
}