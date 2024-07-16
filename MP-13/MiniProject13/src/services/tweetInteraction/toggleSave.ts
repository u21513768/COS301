import { supabase } from '@config/supabase';

/*export async function toggleSave(tweetId: number, userId: number): Promise<"saved" | "unsaved" | "error"> {
    try {
        // Check for existing save
        const { data: existingSave, error: existingSaveError } = await supabase
            .from('Saves')
            .select('*')
            .eq('Tweet_Id', tweetId)
            .eq('User_Id', userId)
            .single();

        if (existingSaveError) {
            await supabase.from('Saves').insert([{ Tweet_Id: tweetId, User_Id: userId }]);
            return "saved";
        } else {
            const { error: unsaveError } = await supabase.from('Saves').delete().eq('Save_Id', existingSave.Save_Id);
            if (unsaveError) {
                return "error";
            }
            return "unsaved";
        }

    } catch (error: any) {
        console.error('Error toggling save for the tweet:', error.message);
    }

}*/

export async function checkIfSaved(tweetId: number, userId: number){
    try {
        // Check for existing like
        const { error } = await supabase
            .from('Saves')
            .select('*')
            .eq('Tweet_Id', tweetId)
            .eq('User_Id', userId)
            .single();

        if (error) {
            console.error('Error checking whether the tweet has been saved:', error.message);
            return false;
        }
        return true; // Return true if existingLike is not null or undefined
        
    } catch (error: any) {
        console.error('Error checking whether the tweet has been saved:', error.message);
    }
}

export async function save(tweetId: number, userId: number): Promise<string> {
    try {
        const { error } = await supabase.from('Saves').insert({ Tweet_Id: tweetId, User_Id: userId });
        
        return error ? error.message : "success";
    } catch (error: any) {
        console.error('Error saving the tweet:', error.message);
        return error.message;
    }
}

export async function unSave(tweetId: number, userId: number) {
    try {
        // Unlike the tweet
        const { error } = await supabase
            .from('Saves')
            .delete()
            .eq('Tweet_Id', tweetId)
            .eq('User_Id', userId);

        if (error) {
            console.error('Error unSaving the tweet:', error.message);
            return false;
        }

        return true;
    } catch (error: any) {
        console.error('Error unSaving the tweet:', error.message);
    }

}