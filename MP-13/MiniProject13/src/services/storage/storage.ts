import { supabase } from '@config/supabase'
import { updateProfileDetails } from '@services/index';

export async function uploadProfile(file: File) {
    //get current users id
    const user = await supabase.auth.getUser();
    if (!user.data.user) return "error";

    const { error, data } = await supabase.storage.
        from("media").upload(`profile_images/${user.data.user.id}`, file, {
            upsert: true,
        });

    if (error) {
        return "error";
    } else {
        const { data: publicURL } = supabase.storage.from('media').getPublicUrl(data.path);

        const res = await updateProfileDetails({ 
            Img_Url: publicURL.publicUrl 
        });
        return res === "error" ? "error" : "success";
    }
}