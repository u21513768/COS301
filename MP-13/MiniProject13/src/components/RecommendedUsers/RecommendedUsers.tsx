import React, { useEffect, useState } from "react";
import { fetchUsers, getLoggedUserId } from "@services/index";
import { UserCard } from "@components/index";

interface User {
  user_id: number;
  name: string;
  username: string;
  avatarUrl: string;
}

interface RecommendedUsersProps {
  users: User[];
}

const RecommendedUsers: React.FC<RecommendedUsersProps> = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loggedUserId, setLoggedUserId] = useState<any>();
  const randomUsers = (users: any[]) => {
    const randomUsers = [];
    const repeatedIndexes: number[] = [];
    for (let i = 0; i < 3; i++) {
      if (repeatedIndexes.includes(Math.floor(Math.random() * users.length))) {
      }
      randomUsers.push(users[Math.floor(Math.random() * users.length)]);
      repeatedIndexes.push(Math.floor(Math.random() * users.length));
    }
    return randomUsers;
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersData = await fetchUsers();
        console.log("Users Data:");
        console.log(usersData);
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
      setLoggedUserId(userData);
    };
    fetchUserData();
  }, []);

  return (
    <div>
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
  );
};
export default RecommendedUsers;
