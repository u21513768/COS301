import React from "react";
import { Avatar } from "@nextui-org/react";
// import { describe } from "vitest";
interface CommentNotificationProp {
  id: number;
  avatarUrl: string;
  description: string;
  comment: string;
}

const CommentNotification: React.FC<CommentNotificationProp> = ({
  avatarUrl, 
  description, 
  comment,
}) => {
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
        <div>
            <div className="avatar mb-2">
            <Avatar
                src={avatarUrl} // profile image url to be replaced
                alt="User Avatar"
                className="user-avatar min-w-10 min-h-10"
            />
            </div>
            {/* Display comment */}
            <p>{comment}</p>
        </div>
        {/* Display the name of the user of the post */}
        <p className="font-bold mx-2 my-1">{description}</p>
    </div>
  );
};

export default CommentNotification;
