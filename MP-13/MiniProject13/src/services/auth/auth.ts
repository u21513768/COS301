import { supabase } from "@config/supabase";
import { extractUsername } from "@utils/index";
import { insertProfileDetails } from "..";

export async function signInWithGoogle(): Promise<"success" | "error"> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    return "error";
  } else {
    //add user to database if not already there
    return "success";
  }
}

export async function getCurrentUser(): Promise<{ auth_id: number | null; } | undefined> {
  console.log("Getting current user");
  const logged_user = await supabase.auth.getSession();
  if (!logged_user.data) return undefined;
  const returnString = getUserByAuthId(logged_user.data?.session?.user?.id as string);
  return returnString;
}


async function getUserByAuthId(auth_id: string): Promise<{ auth_id: number | null; } | undefined> {
  try {
    const { data: userData, error } = await supabase.from('User').select('User_Id').eq('auth_id', auth_id).single();
    if (error) {
      throw error;
    }
    //console.log(userData);
    return { auth_id: userData?.User_Id || null };
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}


export async function signInWithGithub(): Promise<"success" | "error"> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })

  if (error) {
    return "error";
  } else {
    //add user to database if not already there
    return "success";
  }
}

export async function signOut(): Promise<"success" | "error"> {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return "error";
  } else {
    return "success";
  }
}

export async function signUpNewUser(user_data: {
  name: string,
  email: string,
  dob: Date
  password: string,
}): Promise<"success" | "error"> {
  const { error } = await supabase.auth.signUp({
    email: user_data.email,
    password: user_data.password,
    options: {
      data: {
        dob: user_data.dob,
        full_name: user_data.name,
        surname: "",
        user_name: extractUsername(user_data.email),
      }
    }
  })

  if (error) {
    return "error";
  } else {
    //add user to database if not already there
    const logged_user = await supabase.auth.getUser();
    if (!logged_user.data.user) return "error";

    //add user to database
    const user = {
      auth_id: logged_user.data.user.id,
      Created_at: new Date().toISOString(),
      Email: user_data.email,
      Name: user_data.name,
      Surname: "",
      User_Id: undefined,
      Username: "",
    };

    const result = await supabase.from('User').insert(user);
    if (result.error) {
      await signOut();
      return "error";
    }

    await insertProfileDetails({
      Img_Url: logged_user.data.user.user_metadata.avatar_url ? logged_user.data.user.user_metadata.avatar_url : "",
    });
    return "success";
  }
}

export async function signInUser(email: string, password: string): Promise<string> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return error.message;
  } else {
    //add user to database if not already there
    return "success";
  }
}

export async function isUserLoggedIn(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return data.session !== null;
}

export async function doesLoggedUserExistInDatabase(): Promise<boolean> {
  const logged_user = await supabase.auth.getUser();
  if (!logged_user.data.user) return false;

  //check if user is already in database by counting the number of users with the same auth_id
  const { count, error } = await supabase.from('User').select('*', { count: 'exact', head: true }).eq('auth_id', logged_user.data.user.id);
  if (error || count === null) return false;
  return count > 0;
}

export async function addUserToDatabase() {
  //add user to database if not already there
  const logged_user = await supabase.auth.getUser();
  if (!logged_user.data.user) return "not logged in";

  //check if user is already in database by counting the number of users with the same auth_id
  const existing_user = await doesLoggedUserExistInDatabase();
  if (existing_user) return "success";

  const user = {
    auth_id: logged_user.data.user.id,
    Created_at: new Date().toISOString(),
    Email: logged_user.data.user.email ? logged_user.data.user.email : "",
    Name: logged_user.data.user.user_metadata.full_name ? logged_user.data.user.user_metadata.full_name : "",
    Surname: logged_user.data.user.user_metadata.surname ? logged_user.data.user.user_metadata.surname : "",
    User_Id: undefined,
    Username: logged_user.data.user.user_metadata.user_name ?
      logged_user.data.user.user_metadata.user_name :
      extractUsername(logged_user.data.user.email),
  };

  const res = await supabase.from('User').insert(user);

  if (res.error) return "failed to insert into database";
  await insertProfileDetails({
    Img_Url: logged_user.data.user.user_metadata.avatar_url ? logged_user.data.user.user_metadata.avatar_url : "",
  });

  await addUserIdMetadata();

  return "success";
}

async function addUserIdMetadata(){
  const logged_user = await supabase.auth.getUser();
  if (!logged_user.data.user) return "error";

  //get User_Id from database
  const { data, error } = await supabase.from('User').select('User_Id').eq('auth_id', logged_user.data.user.id);

  if (error || !data) return "error";
  const user_id = data[0].User_Id;

  const updated_user = await supabase.auth.updateUser(
    {
      data: {
        user_id: user_id,
      },
    }
  )

  //check if updated user metadata hase user_id property
  if (updated_user.error || !updated_user.data.user.user_metadata.user_id) return "error";

  return "success";
}

export async function getUserData(){
  const logged_user = await supabase.auth.getUser();
  if (!logged_user.data.user) return null;

  if(!logged_user.data.user.user_metadata.user_id){
    await addUserIdMetadata();
  }

  const user = await supabase.auth.getUser();
  return !user.data.user ? null : user.data.user;
}

export async function getAuthIdFromSession(): Promise<number | null> {
  try {
      const { data: currUser, error } = await supabase.auth.getSession();

      if (error || !currUser.data) {
          console.error('Error getting auth id from session:', error?.message || 'Session data not found');
          return null;
      }
      return parseInt(currUser.data?.session?.user?.id);

  } catch (error) {
      console.error('Error getting auth id from session:', error.message);
      return null;
  }
}