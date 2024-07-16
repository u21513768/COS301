import React from "react";
import { Avatar } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { FaRegComment } from "react-icons/fa"; // comment icon
import { PiHeartBold } from "react-icons/pi";
import { LuRepeat2 } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa6";
interface MentionProp {
  id: number;
  name: string;
  username: string;
  text: string;
  imageUrl?: string;
  timeDisplay: string;
  likes?: number | string;
  retweets?: number | string;
  comments?: number | string;
  saves?: number | string;
  replyToUsername?: number | string;
}

const Mention: React.FC<MentionProp> = ({
  name,
  username,
  text,
  imageUrl,
  timeDisplay,
  likes,
  retweets,
  comments,
  saves,
  replyToUsername,
}) => {
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
      <div className="avatar">
        <Avatar
          // src={imageUrl} // profile image url to be replaced
          alt="User Avatar"
          className="user-avatar min-w-12 min-h-12"
          // style={{ minWidth: '48px', minHeight: '48px' }}
        />
      </div>
      <div className="post flex-col w-auto pl-2">
        <div className="user-info flex dark:text-white">
          <p className="font-semibold p-0 m-0">{name}&nbsp;</p>
          <p className="text-slate-700 p-0 m-0 dark:text-neutral-600">
            @{username} · {timeDisplay}
          </p>
        </div>
        <div>
          <p className="p-0 m-0 text-blue-500 dark:text-white">Replying to<span className="dark:text-blue-500 cursor-pointer"> @{replyToUsername}</span></p>
        </div>
        <div>
          <p className="p-0 m-0 dark:text-white">{text}</p>
          {imageUrl && (
            <Image
              isZoomed
              src={imageUrl}
              alt="Tweet Image"
              className="tweet-image w-auto h-full"
              style={{ borderRadius: "10px" }}
            />
          )}
        </div>
        <div className="tweet-actions flex flex-row justify-around col dark:text-white text-slate-700">
          <span className="action flex items-center cursor-pointer hover:text-blue-500 ">
            <FaRegComment className="w-4 h-4" /> &nbsp;{comments}{" "}
          </span>
          <span className="action flex items-center cursor-pointer hover:text-green-500">
            <LuRepeat2 className="w-4 h-4" /> &nbsp;{retweets}{" "}
          </span>
          <span className="action flex items-center cursor-pointer hover:text-red-500">
            <PiHeartBold className="w-4 h-4" />
            &nbsp;{likes}{" "}
          </span>
          <span className="action flex items-center cursor-pointer hover:text-blue-500">
            <FaRegBookmark className="w-4 h-4" /> &nbsp;{saves}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Mention;
