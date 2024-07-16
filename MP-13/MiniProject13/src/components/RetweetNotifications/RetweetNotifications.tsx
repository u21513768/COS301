import React from "react";
import { Avatar } from "@nextui-org/react";
import { FaRetweet } from "react-icons/fa6";
interface RetweetNotificationProp {
  id: number;
  description: string;
  tweet: string;
  avatarUrl: string;
}

const RetweetNotifications: React.FC<RetweetNotificationProp> = ({
  description,
  tweet,
  avatarUrl,
}) => {
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
      <div className="flex-col w-auto dark:text-white ">
        <FaRetweet color="#53A47F" />{" "}
      </div>
      <div>
        <div className="avatar mb-2 mx-2">
          <Avatar
            src={avatarUrl} // profile image url to be replaced
            alt="User Avatar"
            className="user-avatar min-w-10 min-h-10"
          />
        </div>
        {/* Display the tweet */}
        <p className="text-slate-500 mx-2">{tweet}</p>
      </div>
        {/* Display description */}
        <p className="font-bold my-1 mx-1">{description}</p>
    </div>
  );
};

export default RetweetNotifications;
