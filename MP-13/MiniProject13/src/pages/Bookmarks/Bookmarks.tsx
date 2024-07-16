import { isUserLoggedIn, getLoggedUserId, 
  getBookmarkedTweets, 
  fetchUsers } from '@services/index';
import { fetchAllProfiles } from "@services/profileServices/getProfile";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tweet } from '@components/index';
// import { mockTweets, mockUsers,mockSavesCount,mockCommentsCount,mockRetweetsCount,mockLikesCount } from '../../mockData/mockData';
import {useState} from "react";
import BeatLoader from "react-spinners/BeatLoader";
  
const Bookmarks = () => {

  // const [tweets] = useState<any[]>(mockTweets);
  const [tweets, setTweets] = useState<any[]>([]);//setTweets
  const [users, setUsers] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  // const [savesCount] = useState<any>(mockSavesCount);
  // const [commentsCount] = useState<any>(mockCommentsCount);
  // const [retweetsCount] = useState<any>(mockRetweetsCount);
  // const [likesCount] = useState<any>(mockLikesCount);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [isLoading, setIsLoading] = useState(true);
  const getTimeDisplay = (timestamp: string) => {
    const currentTime = new Date();
    const parsedTimestamp = new Date(timestamp);

    const timeDiff = currentTime.getTime() - parsedTimestamp.getTime(); // Get time difference in milliseconds
    const minutesDiff = Math.floor(timeDiff / 60000); // Convert milliseconds to minutes

    let timeDisplay;
    if (minutesDiff < 60) {
      timeDisplay = `${minutesDiff}m`;
    } else {
      const hoursDiff = Math.floor(minutesDiff / 60); // Convert minutes to hours
      if (hoursDiff < 24) timeDisplay = `${hoursDiff}h`;
      else {
        const month = parsedTimestamp.toLocaleString("en-us", {
          month: "short",
        });
        const day = parsedTimestamp.getDate();
        timeDisplay = `${month} ${day}`;
      }
    }

    return timeDisplay;
  };

  const formatCount = (count: number): string | number => {
    if (count < 1000) {
      return count; // Return as it is if less than 1000
    } else if (count < 1000000) {
      // Convert to K format
      return (count / 1000).toFixed(1) + "K";
    } else {
      // Convert to M format
      return (count / 1000000).toFixed(1) + "M";
    }
  };
  
  useEffect(() => {
    const checkUser = async () => {
      const result = await isUserLoggedIn();
      if (!result) {
        navigate("/home");
      }
    }
  
    const fetchData = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData as any[]);
    };
  
    const getAllProfiles = async () => {
      const profilesData = await fetchAllProfiles();
      setProfiles(profilesData as any);
    };
  
    const fetchTweets = async () => {
      const id = await getLoggedUserId();
      if (id) {
        const tweetData = await getBookmarkedTweets(id);
        setTweets(tweetData);
      }
      else{
        throw "could not fetch tweet data"
      }
    };
  
    checkUser();
    Promise.all([fetchData(), getAllProfiles(), fetchTweets()])
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [navigate]);
  
  return (
    <div className="flex flex-col m-0 p-0 h-full">
      <h1 className="text-2xl font-bold p-4 dark:text-white">Bookmarks</h1>
      {/* <p className="p-4">This is the Bookmarks page content.</p>  */}
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <BeatLoader color="#1DA1F2" />
        </div>
      ) : tweets?.length > 0 ? (
        tweets.map(tweet => {
          const user = users.find(u => u.User_Id === tweet.User_Id);
          const saves = tweet.Saves[0].count || 0; //savesCount[tweet.Tweet_Id] || 0 ;
          const comments = tweet.Comments[0].count || 0; //commentsCount[tweet.Tweet_Id] || 0;
          const likes = tweet.Likes[0].count || 0; //likesCount[tweet.Tweet_Id] || 0;
          const retweets = tweet.Retweets[0].count || 0; //retweetsCount[tweet.Tweet_Id] || 0;
          const image_url = profiles.find(p => p.User_Id === tweet.User_Id)?.Img_Url;
          return (
            <Tweet
              key={tweet.Tweet_Id}
              tweet_id={tweet.Tweet_Id}
              name={user ? user.Name : "Unknown User"}
              username={user ? `@${user.Username}` : ""}
              text={tweet.Content}
              imageUrl={tweet.Img_Url}
              timeDisplay={getTimeDisplay(tweet.Created_at)}
              likes={formatCount(likes)}
              retweets={formatCount(retweets)}
              saves={formatCount(saves)}
              comments={formatCount(comments)}
              bookmarked={true}
              profileimageurl={image_url}
            />
          );
        })
      ) : (
        <p>You have no bookmarked Tweets.</p>
      )}
    </div>
  );
};

export default Bookmarks;
