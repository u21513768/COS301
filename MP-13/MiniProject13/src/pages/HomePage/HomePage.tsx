import { Tweet, CreateTweet, TweetSkeleton } from "@components/index";
import React, { useState, useEffect } from "react";
// import {Tabs, Tab} from "@nextui-org/react";
import { fetchTweets, fetchUsers, fetchProfileDetails, getLoggedUserId } from "@services/index";
import { isUserLoggedIn } from "@services/auth/auth";
import { fetchAllProfiles } from "@services/profileServices/getProfile";
// import { useNavigate } from 'react-router-dom';
//import { addTweet } from "@services/index";
//import { mockTweets, mockUsers,mockSavesCount,mockCommentsCount,mockRetweetsCount,mockLikesCount } from '../../mockData/mockData';

interface HomePageProps {}


const HomePage: React.FC<HomePageProps> = () => {
  const [tweets, setTweets] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(false);
  // const [userId, setUserId] = useState(0);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [userimg, setuserimg] = useState<any>(null);
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // const handleNavigation = (path : string) => {
  //   navigate(path);
  // };
  // const HomePage: React.FC<HomePageProps> = () => {
  // const [savesCount, setSavesCount] = useState<any>(0);
  // const [commentsCount, setCommentsCount] = useState<any>(0);
  // const [retweetsCount, setRetweetsCount] = useState<any>(0);
  // const [likesCount, setLikesCount] = useState<any>(0);
  // const [currentUser] = useState<any>(null); // State variable to store current user

  // FETCHING THE TWEETS FROM TWEETS AND USERS TABLE
  //uncomment the following with the two useStates (setTweets and setUsers) for db access, useeffect and supabase imports
  useEffect(() => {
    //FETCHING THE TWEETS FROM TWEETS TABLE
    // const fetchTweetData = async () => {
    //   try {
    //     const tweetData = await fetchTweets();
    //     // console.log("Tweet Data:");
    //     console.log(tweetData);
    //     setTweets(tweetData);
    //   } catch (error) {
    //     console.error('Error fetching tweets:', error);
    //   }
    // };

    // FETCHING THE USERS FROM THE USER TABLE
    const fetchData = async () => {
      setIsLoading(true); // Set isLoading to true before fetching data
      try {
        const usersData = await fetchUsers();
        setUsers(usersData as any[]); // Add type assertion here

        const tweetData = await fetchTweets();
        setTweets(tweetData);

        const user = await isUserLoggedIn();
        setCurrentUser(user);

        const profilesData = await fetchAllProfiles();
        setProfiles(profilesData as any);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set isLoading to false once all data has been fetched
      }
    };

    const getCurrentUser = async () => {
      try {
        const user = await isUserLoggedIn();
        //  console.log("Current User:");
        //  console.log(user);
         setCurrentUser(user);
         console.log(currentUser);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    // const getuser = async () => {
    //   try {
    //     const id = await getLoggedUserId();
    //     setUserId(id);
    //   } catch (error) {
    //     console.error('Error fetching userid:', error);
    //   }
    // }

    const getuserimg = async () => {
      try {
        const id = await getLoggedUserId();
        if (id !== undefined) { // Add a check to ensure id is not undefined
          const profimg = await fetchProfileDetails(id as number)
          console.log(id);
          setuserimg(profimg.Img_Url);
        }
      } catch (error) {
        console.error('Error fetching userimg:', error);
      }
    };

    // const getAllProfiles = async () => {
    //   try {
    //     const profilesData = await fetchAllProfiles();
    //     // console.log("Profiles Data:");
    //     // console.log(profilesData);
    //     setProfiles(profilesData as any); // Update the type of the state variable
    //   } catch (error) {
    //     console.error('Error fetching profiles:', error);
    //   }
    // };
    
    // // Call both fetch functions when the component mounts
    // fetchTweetData();
    fetchData();
    getCurrentUser();
    // getAllProfiles();
    // getuser();
    getuserimg();
  }, [setCurrentUser]);

  const Loader = () => {
      const skeletons = [];
      for(let i = 0; i < 10; i++) {
        skeletons.push(<TweetSkeleton key={i} />);
      }
      return skeletons;
  };

  //testing

  // HELPER FUNCTIONS
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

  // TWEET DISPLAY

  return (
    <>
      <div className="flex flex-col m-0 p-0 justify-center">
        {/* <Tabs 
        aria-label="Options" 
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider justify-center",
          cursor: "max-w-24 rounded-full h-1 bg-[#22d3ee]",
          tab: "max-w-full h-2 px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#000000] font-semibold"
        }}
      >
        <Tab
          title={
            <div className="flex items-center space-x-2">
              <span>For you</span>
            </div>
          }
          className="text-md p-0"
        > */}
        {/*This is unstyled which is why we are rendering create tweet which already has a button that is greyed out that tells the user to login if they wna to post*/}
          {/*currentUser ? <CreateTweet></CreateTweet> : <div>Please Log in to post Tweets</div>*/}
        <CreateTweet/>
        {isLoading && <Loader />}
      {tweets?.sort((a, b) => new Date(b.Created_at).getTime() - new Date(a.Created_at).getTime()).map(tweet => {
        // console.log("Tweet:", tweet);
        // console.log("Users:", users);
        const user = users.find(u => u.User_Id === tweet.User_Id); // Assuming there's a user_id in tweets data
        // console.log("User:", user);

        // Check if tweet.Saves is defined and not empty before accessing its properties
        const saves = tweet.Saves && tweet.Saves.length > 0 ? tweet.Saves[0]?.count || 0 : 0;
        // console.log("Saves Count:", saves);

        // Similar checks for Comments, Likes, and Retweets
        const comments = tweet.Comments && tweet.Comments.length > 0 ? tweet.Comments[0]?.count || 0 : 0;
        // console.log("Comments Count:", comments);

        const likes = tweet.Likes && tweet.Likes.length > 0 ? tweet.Likes[0]?.count || 0 : 0;
        // console.log("Likes Count:", likes);

        const retweets = tweet.Retweets && tweet.Retweets.length > 0 ? tweet.Retweets[0]?.count || 0 : 0;
        // console.log("Retweets Count:", retweets);

        const image_url = profiles.find(p => p.User_Id === tweet.User_Id)?.Img_Url;
        // console.log("Image URL:", image_url);

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
            profileimageurl={image_url}  
            currentuserimg={userimg}
                      />
        );
      })}


      {/* </Tab>
        <Tab
          title={
            <div className="flex items-center space-x-2">
              <span>Following</span>
            </div>
          }
          className="text-md"
        >
          <CreateTweet></CreateTweet>
        </Tab>
      </Tabs> */}
      </div>
    </>    
  );
};

export default HomePage;
/**
 * To get likes count: tweet.Likes[0].count same for retweets,saves and comments
 */
