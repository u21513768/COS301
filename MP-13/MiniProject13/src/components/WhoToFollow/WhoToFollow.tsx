import React, { useEffect, useState } from "react";
import {
  fetchUsers,
  getLoggedUserId,
} from "@services/index";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { UserCard } from "@components/index";

interface User {
  user_id: number;
  name: string;
  username: string;
  avatarUrl: string;
}

interface WhoToFollowProps {
  users: User[];
}
const WhoToFollow: React.FC<WhoToFollowProps> = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loggedUserId, setLoggedUserId] = useState<any>();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersData = await fetchUsers();
        // console.log("Users Data:");
        // console.log(usersData);
        setUsers(randomUsers(usersData as any[])); // Add type assertion here
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getLoggedUserId();
      // console.log("User Data:");
      // console.log(userData);
      setLoggedUserId(userData);
    };
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetchUserByUsername("tester1000");
  //     if (result) {
  //       console.log(result);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fecthData = async () => {
  //     const result = await followUser(13, 27);
  //     if (result) {
  //       console.log(result);
  //     }
  //   };
  //   fecthData();
  // }, []);

  const randomUsers = (users: any[]) => {
    const randomUsers = [];
    const repeatedIndexes: number[] = [];
    for (let i = 0; i < 3; i++) {
      /*
      if (repeatedIndexes.includes(Math.floor(Math.random() * users.length))) {
      }
      */
      randomUsers.push(users[Math.floor(Math.random() * users.length)]);
      repeatedIndexes.push(Math.floor(Math.random() * users.length));
    }
    return randomUsers;
  };

  return (
    <div>
      <Card className="bg-inherit shadow-none w-11/12 border dark:border-neutral-800">
        <CardHeader className="flex gap-1 pl-3 !pb-0">
          <h2 className="text-lg font-bold mb-4">Who to follow</h2>
        </CardHeader>
        <CardBody className="m-0 p-0">
          <div className="m-0 p-0">
            {" "}
            {users.map((user) => (
              <UserCard
                key={user.User_Id}
                logged_in_user_id={loggedUserId}
                user_id={user.User_Id}
                name={user.Name}
                surname={user.Surname}
                username={user.Username}
                avatarUrl={user.Img_Url}
              />
            ))}
          </div>
        </CardBody>
        {/* <CardFooter className="cursor-pointer text-sky-500 hover:bg-slate-200">
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default WhoToFollow;
