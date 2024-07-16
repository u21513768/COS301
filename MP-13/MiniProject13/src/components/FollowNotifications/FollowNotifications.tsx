import React from "react";
import { Avatar } from "@nextui-org/react";
import { FaUser } from "react-icons/fa6";
interface FollowNotificationProp {
  id: number;
  description: string;
  avatarUrl: string;
}

const FollowNotifications: React.FC<FollowNotificationProp> = ({
  description,
  avatarUrl,
}) => {
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
      <div className="flex-col w-auto dark:text-white">
        <FaUser color="#1DA1F2" style={{ marginRight: "10px" }}/>{" "}
      </div>
      <div>
        <div className="avatar">
          <Avatar
            src={avatarUrl} // profile image url to be replaced
            alt="User Avatar"
            className="user-avatar min-w-10 min-h-10"
          />
        </div>
      </div>
        {/* Display description */}
        <p className="font-bold my-1 mx-2">{description}</p>
    </div>
  );
};

export default FollowNotifications;
