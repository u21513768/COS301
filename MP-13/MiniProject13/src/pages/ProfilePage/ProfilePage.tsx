import { useState, Suspense, useEffect, useRef } from "react";
import { Tweet, TrendingTopics, WhoToFollow, Nav, TweetSkeleton } from "@components/index";
import { mockUserProfile, mockProfileDetails } from "@pages/ProfilePage/loadingData";
import { countFollowing, fetchProfileDetails } from "@services/index";
import { countFollowers } from "@services/index";
import { fetchUserData } from "@services/index";
import { fetchUserMedia } from "@services/index";
import { fetchLikedPosts } from "@services/index";
import { getUserTweets } from "@services/index";
import { getUserComments } from "@services/index";
import { IoMdSettings } from "react-icons/io";
import { Avatar, Button } from "@nextui-org/react";
import { BiCalendar } from "react-icons/bi";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import { Search } from "@components/index";
import { fetchTweets, fetchUsers } from "@services/index";
import { fetchAllProfiles } from "@services/profileServices/getProfile";
// import { getAuthIdFromSession } from "@services/index";
import { fetchUserByUsername } from "@services/index";
import { isUserLoggedIn, checkIfFollowing, followUser, unfollowUser } from "@services/index";
import { getCurrentUser } from "@services/auth/auth";
// interface Tweet {
//   key: number;.
//   name: string;
//   username: string;
//   text: string;
//   imageUrl: string;
//   likes: number;
//   retweets: number;
//   saves: number;
//   comments: number;
//   timeDisplay: string;
//   profileimageurl: string;
//   author?: string;
// }

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

const ProfilePage = () => {

  const [activeTab, setActiveTab] = useState("tweets");
  const [userProfile] = useState<any>(mockUserProfile);
  const [profileDetails, setProfileDetails] = useState<any>(mockProfileDetails);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(mockUserProfile);
  const [stash, setStash] = useState<any>(mockUserProfile);
  const [userFollowers, setUserFollowers] = useState<any>(null);
  const [userFollowing, setUserFollowing] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [tweetCollection, setTweetCollection] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createdAt, setCreated_At] = useState<any>(
    new Date(mockUserProfile.Created_at).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    })
  );
  //FALSE MEANS USER IS VIEWING HIS OWN PROFILE, TRUE MEANS USER IS VIEWING SOMEONE ELSE'S PROFILE
  //This is just a placeholder for now, we will implement the actual logic later where the context is retrieved dynamically and not manually set.
  const [external, setExternal] = useState<null | boolean>(null);
  const [userTweets, setUserTweets] = useState<any[]>([]);
  const [userMedia, setUserMedia] = useState<string[]>([]);
  const [userReplies, setUserReplies] = useState<any[]>([]);
  const [likedTweets, setLikedTweets] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("");
  

  // const location = useLocation(); 
  // const { pathname } = location;

  const { username } = useParams<{ username: string }>();
  const userDataRef = useRef(null);
  const userStash = useRef(null);
  const userExt = useRef(false);

  const handleNavigation = (path: any) => {
    navigate(path);
  };
  
  const followUserButton = async () => {
    const currentUser = await getCurrentUser();
    if (currentUser !== undefined) {
      const followingCheck = await checkIfFollowing(stash.User_Id, userData.User_Id);      
    if (!followingCheck) {
      const result = await followUser(stash.User_Id, userData.User_Id);
      console.log(result);
      setButtonText("Following");
      setIsFollowing(true);
    }
  }
  else
  {
    console.log("User not found");
  }
  };

  const unFollowUser = async () => {
    const followingCheck = await checkIfFollowing(stash.User_Id, userData.User_Id);
    if (followingCheck) {
      const result = await unfollowUser(stash.User_Id, userData.User_Id);
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

  const getUD = async () => {
    let userDataX;
    let userDataS;
    let ext;
    if (!username) {
      // userDataX = await fetchUserByUsername(username);
      userDataX = await fetchUserData();
      ext = false;
      setExternal(false);
    }
    else {
      userDataX = await fetchUserByUsername(username);
      userDataS = await fetchUserData();
      ext = null;
      setExternal(null);
      const following = await checkIfFollowing(userDataS.User_Id, userDataX.User_Id);
      setIsFollowing(following);
      console.log("Following - " +following)
      if (following) {
        //setFollowing(true);
        setButtonText("Following");
        // setIsFollowing(true);
      }
      else {
        //setFollowing(false);
        setButtonText("Follow");
        // setIsFollowing(false);
      }
      setExternal(true);
      ext = true;
    }
    userDataRef.current = userDataX;
    userStash.current = userDataS;
    userExt.current = ext;
    setStash(userDataS);
    setUserData(userDataX);
    setExternal(ext);
  }

  const profileSub = async () => {
    try {
      if (userDataRef.current) {
        const profileTemp = await fetchProfileDetails(userDataRef.current.User_Id);
        const followerTemp = await countFollowers(userDataRef.current.User_Id);
        const followingTemp = await countFollowing(userDataRef.current.User_Id);
        const imageURLs = await fetchUserMedia(userDataRef.current.User_Id);
        setUserFollowers(followerTemp);
        setUserFollowing(followingTemp);
        setUserData(userDataRef.current);
        setProfileDetails(profileTemp);
        setUserMedia(imageURLs);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  } 

  const getLikes = async () => {
    try {
      if (userDataRef.current && likedTweets.length === 0) {
        const likes = await fetchLikedPosts(userDataRef.current.User_Id);
        //console.log(likes);
        setLikedTweets(likes);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  const getCurrUserTweets = async () => {
    try {
      if (userDataRef.current && userTweets.length === 0) {
        const tempTweets = await getUserTweets(userDataRef.current.User_Id);
        setUserTweets(tempTweets);
      }
    }
    catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  
  const getUserReplies = async () => {
    try {
      if (userDataRef.current && userReplies.length === 0) {
        const replies = await getUserComments(userDataRef.current.User_Id);
        setUserReplies(replies);
      }
    }
    catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  const getUsers= async() => {
    try {
      const usersFetched = await fetchUsers();
      const profilesFetched = await fetchAllProfiles();
      setUsers(usersFetched as any[]);
      setProfiles(profilesFetched as any[]);
    }
    catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  const getTweets = async() => {
    try {
      const tweetsFetched = await fetchTweets();
      setTweetCollection(tweetsFetched as any[]);
      // console.log(tweetCollection);
    }
    catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false); // Set isLoading to false once all data has been fetched
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    //return date as "December 2013" form
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

  useEffect(() => {
    const checkUser = async () => {
      const result = await isUserLoggedIn();
      if (!result) {
        navigate("/home");
      }
      else {
        setIsLoading(true);
        //get user data
        await getUD(); 
        await profileSub(); 
        await getTweets();
        await getUsers();
        await getCurrUserTweets();
      }
    }

    checkUser();

  }, [])

  const handleTabClick = (tabName: string) => {
    if (tabName === "tweets") {
      getCurrUserTweets();
    }
    else if (tabName === "replies") {
      getUserReplies();
    }
    else if (tabName === "likes") {
      getLikes();
    }
    else if (tabName === "media") {
      // getUserMedia(); media was already fetched in profileSub
    }
    setActiveTab(tabName);
  };

  const Loader = () => {
    const skeletons = [];
    for(let i = 0; i < 12; i++) {
      skeletons.push(<TweetSkeleton key={i} />);
    }
    return skeletons;
  };

  return (
    <>
        <div className="flex flex-col w-full m-0 p-0 justify-center">
          <div className="banner m-0 border-b border-inherit dark:border-neutral-800">
            <img
              src={profileDetails.Banner_Url || mockProfileDetails.Banner_Url}
              alt="Banner"
              className="w-full h-48 m-0 "
            />
          </div>
          {/* Profile  Header} */}
          <div className="profile-header bg-gray min-w-full p-0 flex items-center">
            <div className="profile-info flex flex-col min-w-full m-0">
              <div className="m-0 p-4">
                <div className="profile flex min-w-full flex-1 justify-between items-center">
                  <Avatar
                    src={profileDetails.Img_Url}
                    alt={userData.Name}
                    size="lg"
                  />
                  {external === null ? <></>
                    : external === true ? (
                    <Button
                    className="ml-auto font-bold text-white bg-black h-7"
                    radius="full"
                    onClick={isFollowing ? () => unFollowUser() : () => followUserButton()}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {buttonText}
                  </Button>
                  ) : (
                    <NavLink to="/editProfile">
                      <Button className="ml-auto text-base font-semibold rounded-full border hover:bg-gray-200 bg-inherit dark:text-white dark:hover:bg-neutral-900 border-gray-300 h-9 items-center">
                        {/* <IoMdSettings className="mr-1 dark:text-black" /> */}
                        Edit profile
                      </Button>
                    </NavLink>
                  )}
                </div>
                <h2 className="font-bold text-xl dark:text-white">
                  {userData.Name}
                </h2>

                <p className="text-gray-500 mb-5">@{userData.Username}</p>
                <p className="mb-2 dark:text-white">{profileDetails.Bio}</p>
                <p className="text-gray-500 flex items-center">
                  <BiCalendar className="mr-1" />
                  Joined {formatDate(userData.Created_at)}
                </p>
              </div>
              {/* Profile Details */}
              <div>
                <div className="profile-details ">
                  <div className="flex gap-6 items-center px-4 mb-6">
                    {/* <div className="flex">
                      <h3 className="font-bold text-lg">Tweets</h3>
                      <p className="text-gray-500">0</p>
                    </div> */}
                    <div className="flex">
                      <p className="font-semibold dark:text-white">{userFollowing}&nbsp;</p>
                      <h3 className="text-base text-gray-500">Following</h3>
                    </div>
                    <div className="flex">
                      <p className="font-semibold dark:text-white">{userFollowers}&nbsp;</p>
                      <h3 className="text-base text-gray-500">Followers</h3>
                    </div>
                  </div>
                </div>
              </div>
                <div>
                  <div className="flex justify-around border-b border-gray-200 dark:border-neutral-800">
                    <button
                      className={`px-4 py-2 text-base font-semibold hover:bg-gray-200 dark:hover:bg-neutral-900 ${
                        activeTab === "tweets"
                          ? "text-black dark:text-white border-b-3 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleTabClick("tweets")}
                    >
                      Tweets
                    </button>

                    <button
                      className={`px-4 py-2 text-base font-semibold hover:bg-gray-200 dark:hover:bg-neutral-900 ${
                        activeTab === "replies"
                          ? "text-black dark:text-white border-b-3 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleTabClick("replies")}
                    >
                      Replies
                    </button>
                    <button
                      className={`px-4 py-2 text-base font-semibold hover:bg-gray-200 dark:hover:bg-neutral-900 ${
                        activeTab === "media"
                          ? "text-black dark:text-white border-b-3 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleTabClick("media")}
                    >
                      Media
                    </button>
                    <button
                      className={`px-4 py-2 text-base font-semibold hover:bg-gray-200 dark:hover:bg-neutral-900 ${
                        activeTab === "likes"
                          ? "text-blac dark:text-white border-b-3 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleTabClick("likes")}
                    >
                      Likes
                    </button>
                  </div>
                  
                  {activeTab === "tweets" && (
                  <>
                    {isLoading && <Loader />}
                    <div>
                      {userTweets.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '800px' }}>
                          <p className="text-center text-gray-500">
                            User hasn't tweeted yet
                          </p>
                        </div>
                      ) : (
                          userTweets.map((tweet, index) => {
                            const image_url = profileDetails.Img_Url;
                            const originalTweet = tweetCollection.find((u: { Tweet_Id: string }) => tweet.Tweet_Id === u.Tweet_Id);
                          
                            if (!originalTweet) {
                              console.log("original tweet not found");
                            } else {
                              const _likes = originalTweet.Likes[0].count || 0;
                              const _saves = originalTweet.Saves[0].count || 0;
                              const _comments = originalTweet.Comments[0].count || 0;
                              const _retweets = originalTweet.Retweets[0].count || 0;
                              return (
                                <Tweet
                                  tweet_id={tweet.Tweet_Id}
                                  //userid={userData.User_Id}
                                  key={index}
                                  name={userData.Name}
                                  username={`@${userData.Username}`}
                                  text={tweet.Content}
                                  imageUrl={tweet.Img_Url}
                                  timeDisplay={getTimeDisplay(tweet.Created_at)}
                                  likes={_likes}
                                  retweets={_retweets}
                                  saves={_saves}
                                  comments={_comments}
                                  profileimageurl={image_url}
                                />);
                            }
                          })
                      )}
                    </div>
                    <div style={{ height: '800px' }}></div>
                  </>
                )}
                  {activeTab === "media" && (
                    <>
                      <div className="grid grid-cols-3 gap-1">
                        {userMedia.filter((u) => u !== "")
                          .length === 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '800px' }}>
                            <p className="text-center text-gray-500">
                              No media to display
                            </p>
                          </div>
                          ) : (
                          userMedia
                            .filter((u) => u !== "")
                            .map((u, index) => (
                              <div key={index}>
                                <img
                                  src={u}
                                  alt="Tweet"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ))
                        )}
                      </div>
                      <div style={{ height: '800px' }}></div>
                    </>
                  )}
                  {activeTab === "replies" && (
                  <>
                    <div>
                    {userReplies.length === 0 ? (
                         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '800px' }}>
                         <p className="text-center text-gray-500">
                           No replies to display
                         </p>
                       </div>
                      ) : (
                          userReplies.map((reply, index) => {
                            const originalTweet = tweetCollection.find((u: { Tweet_Id: string }) => reply.Tweet_Id === u.Tweet_Id);
                            const iUser = users.find((u: any) => u.User_Id === originalTweet.User_Id); 
                            const _likes = originalTweet.Likes[0].count || 0;
                            const _comments = originalTweet.Comments[0].count || 0;
                            const _saves = originalTweet.Saves[0].count || 0;
                            const _retweets = originalTweet.Retweets[0].count || 0;
                            const image_url = profileDetails.Img_Url;
                            return (
                              <Tweet
                                tweet_id={reply.id}
                               // userid={userData.User_Id}
                                key={index}
                                name={userData.Name}
                                username={`@${userData.Username}`}
                                author={iUser ? `@${iUser.Username}` : ''} text={reply.Content}
                                imageUrl={reply.image_url}
                                likes={_likes}
                                retweets={_retweets}
                                saves={_saves}
                                comments={_comments}
                                timeDisplay={getTimeDisplay(reply.Created_at)}
                                profileimageurl={image_url}
                            />);
                            })
                          )}
                    </div>
                    <div style={{ height: '800px' }}></div>
                    </>
                  )}
              </div>
                {activeTab === "likes" && (
                <>
                  <div>
                    {likedTweets.length === 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '800px' }}>
                        <p className="text-center text-gray-500">
                          No liked Tweets to display
                        </p>
                      </div>
                    ) : (
                        likedTweets.map((tweet, index) => {
                          const iUser = users.find((u: any) => u.User_Id === tweet.User_Id); 
                          const image_url = profiles.find(p => p.User_Id === tweet.User_Id)?.Img_Url;
                          const originalTweet = tweetCollection.find((u: { Tweet_Id: string }) => tweet.Tweet_Id === u.Tweet_Id);
                          const _likes = originalTweet.Likes[0].count || 0;
                          const _comments = originalTweet.Comments[0].count || 0;
                          const _saves = originalTweet.Saves[0].count || 0;
                          const _retweets = originalTweet.Retweets[0].count || 0;
                        return(
                          <Tweet
                            tweet_id={tweet.id}
                           // userid={userData.User_Id}
                            key={index}
                            name={iUser ? iUser.Name : "Unknown User"}
                            username={iUser ? `@${iUser.Username}` : ""}
                            text={tweet.Content}
                            imageUrl={tweet.Img_Url}
                            timeDisplay={getTimeDisplay(tweet.Created_at)}
                            likes={_likes}
                            retweets={_retweets}
                            saves={_saves}
                            comments={_comments}
                            profileimageurl={image_url}
                          />);
                      })
                    )}
                  </div>
                  <div style={{ height: '800px' }}></div>
                </>
              )}
            </div>
          </div>
        </div>
    </>
  ); 
};

export default ProfilePage;
