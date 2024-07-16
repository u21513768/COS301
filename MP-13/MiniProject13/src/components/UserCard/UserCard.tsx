import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@nextui-org/react";
import {
  isUserLoggedIn,
  checkIfFollowing,
  followUser,
  unfollowUser,
} from "@services/index";
import { NavLink } from "react-router-dom";
import { getCurrentUser } from "@services/auth/auth";
interface User {
  logged_in_user_id: number;
  user_id: number;
  name: string;
  surname: string;
  username: string;
  avatarUrl: string;
}

const UserCard: React.FC<User> = ({
  logged_in_user_id,
  user_id,
  name,
  surname,
  username,
  avatarUrl,
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Follow");
  const [userAuthStatus, setUserAuthStatus] = useState<boolean>(false);

  const FollowUser = async () => {
    console.log("Followed", username);
    const currentUser = await getCurrentUser();
    if (currentUser !== undefined) {
      const user: number = Number(currentUser.auth_id ?? 0);
      const following = await checkIfFollowing(user, user_id);      
    console.log(logged_in_user_id);
    console.log(user_id);
    if (!following) {
      const result = await followUser(logged_in_user_id, user_id);
      console.log(result);
    }
    setButtonText("Following");
    setIsFollowing(true);
  }
  else
  {
    console.log("User not found");
  }
  };

  const UnFollowUser = async () => {
    console.log("Unfollowed", username);
    const following = await checkIfFollowing(logged_in_user_id, user_id);
    if (following) {
      const result = await unfollowUser(logged_in_user_id, user_id);
      console.log(result);
    }
    setButtonText("Follow");
    setIsFollowing(false);
  };

  const handleMouseEnter = () => {
    if (isFollowing) {
      setButtonText("Unfollow");
    }
  };

  const handleMouseLeave = () => {
    if (isFollowing) {
      setButtonText("Following");
    }
  };

  useEffect(() => {
    // this is necessary for checking if the user is signed in
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      setUserAuthStatus(result);
    };

    // Call the async function
    checkUser();
  }, []);

  //   useEffect(() => {
  //     const checkUser = async () => {
  //       //fetch the user data based on the username
  //       const result = await fetchUserByUsername(username);
  //       setUser(result);
  //     };
  //     //call the async function
  //     checkUser();
  //   }, []);

  //   useEffect(() => {
  //     const checkIfFollowing = async () => {
  //       // Check if the user is following the current user
  //       // const result = await checkIfFollowing(logged_in_user_id, user_id);
  //       // setIsFollowing(result);
  //     };
  //     // Call the async function
  //     checkIfFollowing();
  //   }, []);

  //   useEffect(() => {
  //     const followUser = async () => {
  //       // const result = await followUser(logged_in_user_id, user_id);
  //       // console.log(result);
  //     };
  //   });

  return (
    <div key={user_id} className="flex items-center hover:bg-slate-200 dark:hover:bg-neutral-900 p-3">
      <Avatar src={avatarUrl} alt={name} size="md" className="p-0 m-0" />
      <div className="ml-4">
        <NavLink to={`/profile/${username}`}>
          <h3 className="text-base font-medium p-0 m-0">
            {name} {surname}
          </h3>
          <p className="text-gray-500 p-0 m-0">@{username}</p>
        </NavLink>
      </div>
      {userAuthStatus ? (
        <Button
          className="ml-auto font-bold text-white bg-black h-7 dark:bg-white dark:text-black"
          radius="full"
          onClick={isFollowing ? () => UnFollowUser() : () => FollowUser()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {buttonText}
        </Button>
      ) : (
        <Button
          className="ml-auto font-bold text-white bg-black h-7 dark:bg-white dark:text-black"
          radius="full"
          isDisabled
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default UserCard;
