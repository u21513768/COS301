import { supabase } from '@config/supabase';

export const updateUsername = async (username: string) => {
    const logged_user = await supabase.auth.getUser();
    if (!logged_user.data.user) return "error";

    // Check if username is already taken
    const { data: users } = await supabase.from("User").select("Username").eq('Username', username);
    if (users && users.length > 0) {
        return "Username already taken";
    }

    const { error } = await supabase.from("User").update({
        Username: username,
    }).eq('auth_id', logged_user.data.user.id);

    if (error) {
        return "Error updating username";
    } else {
        return "Username updated successfully";
    }
};

export const updateName = async (name: string) => {
    const logged_user = await supabase.auth.getUser();
    if (!logged_user.data.user) return "error";

    const { error } = await supabase.from("User").update({
        Name: name,
    }).eq('auth_id', logged_user.data.user.id);

    if (error) {
        return "Error updating name";
    } else {
        return "Name updated successfully";
    }
};

export const updateSurname = async (surname: string) => {
    const logged_user = await supabase.auth.getUser();
    if (!logged_user.data.user) return "error";

    const { error } = await supabase.from("User").update({
        Surname: surname,
    }).eq('auth_id', logged_user.data.user.id);

    if (error) {
        return "Error updating surname";
    } else {
        return "Surname updated successfully";
    }
};

export const updateEmail = async (email: string) => {
    const logged_user = await supabase.auth.getUser();
    if (!logged_user.data.user) return "error";

    const { error } = await supabase.from("User").update({
        Email: email,
    }).eq('auth_id', logged_user.data.user.id);

    if (error) {
        return "Error updating email";
    } else {
        return "Email updated successfully";
    }
};