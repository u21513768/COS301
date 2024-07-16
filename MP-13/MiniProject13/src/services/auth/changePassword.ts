import { supabase } from "@config/supabase";
//https://github.com/orgs/supabase/discussions/3360
export async function changePassword(oldPassword: string, newPassword: string): Promise<"success" | "error" | "same password"> {
    try {
        if (oldPassword === newPassword) {
            console.log('It as the same password as before.');
            return "same password";
        }

        /*const { data} = await supabase.auth.getSession();
        if (data.session !== null) {
            console.log('There was an error in retrieving the session.');
            return "error";
        }*/

        const { error } = await supabase.auth.updateUser({password: newPassword,});

        if (error) {
            //console.log('Error in changing the password');
            return "error";
        }
        return "success";


    } catch (error: any) {
        console.error('Error changing password:', error.message);
        return "error";
    }
}
