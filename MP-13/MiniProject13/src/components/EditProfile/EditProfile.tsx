import { Button, Input, Textarea } from "@nextui-org/react";
import { IoMdArrowBack } from "react-icons/io";
// import { supabase } from "@config/supabase";
import React,{ useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchUserData } from "@services/profileServices/getAuthUser";
import { fetchProfileDetails } from "@services/profileServices/getProfile";
import { updateProfileDetails } from "@services/profileServices/updateProfileDetails";
import { updateUsername, updateName } from "@services/index";
import { uploadImageAndGetURL, uploadProfile } from "@services/index";
import { useNavigate } from "react-router-dom";

const EditProfile: React.FC = () => {
  // const [userProfile, setUserProfile] = useState<any>(null);
  // const [isEditing, setIsEditing] = useState(false);.
  const navigate = useNavigate();
  const [profileDetails, setProfileDetails] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  const handleClick = async () => {
    const user_data: {
      Name?: string;
      Username?: string;
      Bio?: string;
      Location?: string;
      Website?: string;
    } = {};

    if (editedName !== '') user_data.Name = editedName;
    if (editedUsername !== '') user_data.Username = editedUsername;
    if (editedBio !== '') user_data.Bio = editedBio;
    if (editedLocation !== '') user_data.Location = editedLocation;
    if (editedWebsite !== '') user_data.Website = editedWebsite;
    const result = await updateProfileDetails(user_data);
    // console.log("XXXXX: " + user_data.Bio);
    if (result === 'success') {
      // The profile details were successfully updated
      //console.log('Profile details updated successfully');
    } else {
      // There was an error updating the profile details
      //console.log('Error updating profile details');
    }
    navigate("/profile");

  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log("here");
        const userDataX = await fetchUserData();
        //console.log(userDataX);
        setUserData(userDataX);
        const profileTemp = await fetchProfileDetails(userDataX.User_Id);
        // console.log(profileTemp);
        setProfileDetails(profileTemp);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [userData]);
  const [editedUsername, setEditedUsername] = useState("");
  const [userProfileImage, setUserProfileImage] = useState<string>("");
  const [editedName, setEditedName] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedWebsite, setEditedWebsite] = useState("");
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const [editedImageURL, setEditedImageURL] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  // const handleCancelClick = () => {
  //   // Reset Editing state to close the edit window
  //   setIsEditing(false);
  // };

  const update_Username = async (editedUsername: string) => {
    const result = await updateUsername(editedUsername);
    console.log(result);
  };

  const getProfileImage = async (): Promise<string> => {
    const result = await fetchProfileDetails(userData.User_Id);
    console.log(result);
    return result.Img_Url;
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      const result = await getProfileImage();
      setUserProfileImage(result);
    };
    fetchProfileImage();
  }, []);

  const updateUserData = async (userData: {
    Banner_Url?: string;
    Bio?: string;
    Img_Url?: string;
    Location?: string;
    Profile_Type?: string;
    Theme?: boolean;
    Website?: string;
    Gender?: string;
  }) => {
    const result = await updateProfileDetails(userData);
    console.log(result);
  };
  const history = useNavigate();
  const handleSaveClick = async () => {
    update_Username(editedUsername ? editedUsername : userData.Username);
    update_Name(editedName ? editedName : userData.Name);
    uploadImageAndGetURL(editedImage as File, "profile_images");
    updateUserData({
      Banner_Url: "src/assets/twitter_logo_banner_12.jpg",
      Bio: editedBio ? editedBio : profileDetails.Bio,
      Img_Url: editedImageURL ? editedImageURL : profileDetails.Img_Url,
      Profile_Type: userData.Profile_Type,
      Theme: userData.Theme,
      Location: editedLocation ? editedLocation : profileDetails.Location,
      Website: editedWebsite ? editedWebsite : profileDetails.Website,
      Gender: userData.Gender,
    });
    history("/profile");
  };
  const update_Name = async (editedName: string) => {
    const result = await updateName(editedName);
    console.log(result);
  };
  function captureImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) return;
    setIsLoading(true);
    const selectedFile = e.target.files[0];
    setEditedImage(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setEditedImageURL(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
    setIsLoading(false);
  }

  if (!userData) {
    return <p>Loading</p>;
  } else {
    if (!profileDetails) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container mx-auto py-8">
          <div className="flex items-center mb-4">
            <NavLink to={"/profile"}>
              <IoMdArrowBack className="text-2xl mr-2" />
            </NavLink>
            <h2 className="text-2xl font-bold">Edit Profile</h2>
          </div>
          <div className="bg-white p-4 shadow">
            <div></div>
            <label htmlFor="name" className="block mb-2 font-semibold">
              Name
            </label>
            <Input
              id="name"
              placeholder={userData.Name ? userData.Name : "Enter your name"}
              onChange={(e) => setEditedName(e.target.value)}
              className="mb-4"
            />
            <label htmlFor="username" className="block mb-2 font-semibold">
              Username
            </label>
            <Input
              id="username"
              placeholder={
                userData.Username ? userData.Username : "Enter your Username"
              }
              onChange={(e) => setEditedUsername(e.target.value)}
              className="mb-4"
            />
            <label htmlFor="bio" className="block mb-2 font-semibold">
              Bio
            </label>
            <Input
              id="bio"
              placeholder={
                profileDetails.Bio ? profileDetails.Bio : "Enter your bio"
              }
              className="mb-4"
              onChange={(e) => setEditedBio(e.target.value)}
            />
            <label htmlFor="location" className="block mb-2 font semibold">
              Location
            </label>
            <Input
              id="location"
              placeholder={
                profileDetails.Location
                  ? profileDetails.Location
                  : "Enter your location"
              }
              className="mb-4"
              onChange={(e) => setEditedLocation(e.target.value)}
            />
            <label htmlFor="website" className="block mb-2 font-semibold">
              Website
            </label>
            <Textarea
              id="website"
              placeholder={
                profileDetails.Website
                  ? profileDetails.Website
                  : "Enter your website"
              }
              className="mb-4"
              onChange={(e) => setEditedWebsite(e.target.value)}
            />
            <label htmlFor="profileImage" className="block mb-2 font-semibold">
              Profile Image
              <div className="flex justify-center items-center">
                <div className="w-36 h-36 rounded-full overflow-hidden border border-gray flex justify-center items-center">
                  {editedImageURL ? (
                    <img
                      src={editedImageURL}
                      alt="uploaded-avatar"
                      className="w-full h-full object cover"
                    />
                  ) : (
                    <img
                      src={userProfileImage}
                      alt="avatar"
                      className="w-full h-full object cover"
                    />
                  )}
                </div>
              </div>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={captureImage}
                className="hidden"
              />
            </label>
            {/* <NavLink to={"/profile"}> */}
            <Button size="lg" className="w-full" onClick={handleSaveClick}>
              Save
            </Button>
            {/* </NavLink> */}
          </div>
        </div>
      );
    }
  }
};
export default EditProfile;
