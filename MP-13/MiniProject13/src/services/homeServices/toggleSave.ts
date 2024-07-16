import { supabase } from '@config/supabase';

export async function toggleSave(tweetId: number, userId: number): Promise<"saved" | "unsaved" | "error"> {
    try {
        // Check for existing save
        const { data: existingSave, error: existingSaveError } = await supabase
            .from('Save')
            .select('*')
            .eq('Tweet_Id', tweetId)
            .eq('User_Id', userId)
            .single();

        if (existingSaveError) {
            return "error";
        }

        if (existingSave) {
            const { error: unsaveError } = await supabase.from('Save').delete().eq('Save_Id', existingSave.Save_Id);
            if (unsaveError) {
                return "error";
            }
            return "unsaved";
        } else {
            const { error: saveError } = await supabase.from('Save').insert([{ Tweet_Id: tweetId, User_Id: userId }]);
            if (saveError) {
                return "error";
            }
            return "saved";
        }

    } catch (error: any) {
        console.error('Error toggling save for the tweet:', error.message);
        return error;
    }
}