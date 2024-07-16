import { supabase } from "@config/supabase";

// Function to upload an image to the storage and get its public URL
export const uploadImageAndGetURL = async (image: File, folder: string) => {
    try {
      const { data, error } = await supabase.storage.from("media").upload(`${folder}/${image.name}`, image, {cacheControl: "3600",upsert: false,});
  
      if (error) {
        throw error;
      }
  
      if (data) {
        const { data: publicURL } = supabase.storage.from('media').getPublicUrl(data.path);
        return publicURL?.publicUrl || null;
      }
  
      return null;
    } catch (error: any) {
      console.error(`Error uploading ${folder === 'profile_images' ? 'image' : 'banner'}:`, error.message);
    }
  };