import React, { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

import {
  getLoggedUserId,
} from "@services/index";

interface TweetProps {
  tweet_id: number;
  name: string;
  username: string;
  text: string;
  imageUrl?: string;
  profileimageurl?: string;
  timeDisplay: string;
  likes?: number | string;
  retweets?: number | string;
  comments?: number | string;
  saves?: number | string;
  bookmarked?: boolean;
  author?: string;
}
const TweetModal: React.FC<TweetProps> = ({ name, username, text, imageUrl, profileimageurl, timeDisplay, author}) => {
  
  const [loggedUserId, setLoggedUserId] = useState<any>();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const userData = await getLoggedUserId();
      setLoggedUserId(userData);
    };
    fetchLoggedInUser();
  }, []);

  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
      <div className="avatar">
        <Avatar
          src={profileimageurl}
          alt="User Avatar"
          className="user-avatar min-w-12 min-h-12"
        />
      </div>
      <div className="post flex-col w-full pl-2">
        <div className="user-info flex">
          <NavLink
            to={{
              
            }}
            className="font-semibold p-0 m-0 dark:text-white"
          >
            {name}
          </NavLink>
          <NavLink
            to={{
              pathname: `/profile/${username.substring(1)}`,
              //state: { username: username.substring(1) } -> is this valid, please verify
            }}
            className="text-slate-700 p-0 m-0 dark:text-gray-400"
          >
            @{username.substring(1)} &nbsp;· {timeDisplay}
          </NavLink>
        </div>
        {author && (
          <div>
            <NavLink
              to={{
                pathname: `/profile/${author.substring(0)}`,
              }}
              className="text-slate-700 p-0 m-0 block text-left"
            >
              replying to @{author.substring(1)} &nbsp;
            </NavLink>
          </div>
        )}
        <div>
          <p className="p-0 m-0 dark:text-white">{text}</p>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Tweet Image"
              className="tweet-image w-auto h-full"
              style={{ borderRadius: "10px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetModal;
