import React, { useState, useEffect, useCallback } from 'react';
import { Tweet} from '@components/index';
import TrendingListFull from '@components/TrendingListFull/TrendingListFull';
import { FiSettings } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { Avatar } from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { IoSearch } from 'react-icons/io5';
import { Tab, Tabs } from '@nextui-org/react';
import { searchUsers, fetchUsers } from '@services/index';
import { fetchAllProfiles } from "@services/profileServices/getProfile";
import { searchTweet } from '@services/index';
import {CircularProgress} from "@nextui-org/react";

interface ExplorePageProps { }

interface handle {
  bio: string;
  img_url: string;
  name: string;
  surname: string;
  username: string;
}

const Explore: React.FC<ExplorePageProps> = () => {
  const navigate = useNavigate();
  const {searchVal = ''} = useParams();
  const [searchResultshandles, setSearchResultshandles] = useState<any[]>([]); // State to store search results
  const [searchResultstweets, setSearchResultstweets] = useState<any[]>([]); // State to store search results
  const [profiles, setProfiles] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showTabs, setShowTabs] = useState(false); // State to track if tabs should be shown


  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
  }; 

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

  const handleSearchFocus = () => {
    setIsFocused(true);
  };

  const handleSearchBlur = () => {
    setIsFocused(false);
  };

  const removetabs = () => {
    
    setSearchValue('');
    handleSearchKeyPress(event)
    setShowTabs(false);
    setIsFocused(false);
    navigate("/explore");
  };

  const handleSearchKeyPress = (event: any) => {
    if (event.key === 'Enter' && searchValue.trim() !== '') { 
      navigate("/explore"); 
      getResultsHandles(searchValue);
      getResultsTweets(searchValue);
      setShowTabs(true);
    }
    // console.log(searchResultshandles);
  };


  const getResultsHandles = async (searchValue: any) => {
    try {
      const results = await searchUsers(searchValue);
      console.log('Results:', results); // Check the results in the console
      setSearchResultshandles(results);
    } catch (error) {
      console.error('Error fetching handles:', error);
    }
  }

  const getResultsTweets = async (searchValue: any) => {
    try {
      const results = await searchTweet(searchValue);
      console.log('Results:', results); // Check the results in the console
      setSearchResultstweets(results);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  }

  const Loader = () => {
    return (
      <div className="top-0 left-0 w-full h-full flex justify-center bg-white">
        <CircularProgress aria-label="Loading..." />
      </div>
    );
  };

  const handleTopicClick = useCallback(async (topicName: any) => {
    setSearchValue(topicName);
    setShowTabs(false);
    setLoading(true);
    setIsFocused(false);
    try {
      // Call both functions asynchronously
      await Promise.all([
        getResultsHandles(topicName),
        getResultsTweets(topicName)
      ]);
  
      // Both functions have been executed fully
      setShowTabs(true);
  
      // This will now log the updated searchValue
      console.log("Topic Clicked: " + topicName);
    } catch (error) {
      // Handle errors if any
      console.error("Error:", error);
    } finally {
      // Hide loader regardless of success or failure
      setLoading(false);
    }
  }, []); // Empty dependency array for useCallback
  

  useEffect(() => {
    const getAllProfiles = async () => {
      try {
        const profilesData = await fetchAllProfiles();
        // console.log("Profiles Data:");
        // console.log(profilesData);
        setProfiles(profilesData as any); // Update the type of the state variable
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    const fetchData = async () => {
      try {
        const usersData = await fetchUsers();
        // console.log("Users Data:");
        // console.log(usersData);
        setUsers(usersData as any[]); // Add type assertion here

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    const checkSearch = async () => {
      try {
        if (searchVal === '') {
          console.log("emptyyy");
        }
        else {
          handleTopicClick("#"+searchVal);
        }
      } catch (error) {
        console.error('Error geting search results', error)
      }
      
    };
    fetchData();
    getAllProfiles();
    checkSearch();
  },[handleTopicClick, searchVal]);

  return (
      <>
        <div className='searchbar px-4 py-1 flex items-center justify-between w-full dark:bg-black'>
          <div className="flex justify-between items-center w-11/12">
            {isFocused || searchValue ? (
              <div onChange={handleSearchChange} onClick={removetabs} className='hover:bg-slate-200 dark:text-white dark:hover:bg-neutral-900 p-3 mr-5 rounded-full cursor-pointer hover-t'>
                <FaArrowLeft size={18} onClick={removetabs} />
              </div>
            ) : null}
            <div className={`flex bg-gray-100 dark:bg-neutral-900 py-2 focus:ring-2 rounded-full items-center pl-4 w-full ${isFocused || searchValue ? 'border border-sky-500' : 'border-gray-200'}`}>
              <IoSearch size={20} color={`${isFocused || searchValue ? 'rgb(14 165 233)' : 'gray'}`}/>&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                onKeyPress={handleSearchKeyPress}
                placeholder="Search..."
                className="w-full bg-transparent outline-0 border-none text-lg"
              />
            </div>
          </div>
          <div>
            <FiSettings size={18} />
          </div>
        </div>
        {loading && <Loader />}
        {!showTabs && !loading && (
          <>
            <p className='pl-3 mt-1 text-[21px] font-bold dark:text-white'>Trends for you</p>
            <div className="flex flex-col m-0 p-0 justify-center dark:text-white">
              <TrendingListFull onTopicClick={handleTopicClick}/>
            </div>
          </>
        )}
        {showTabs && !loading && (
          <>
            <div className="flex flex-col m-0 p-0 justify-center">
              <Tabs variant="underlined" aria-label="Tabs variants"  classNames={{
                tabList: "w-full relative rounded-none p-0 border-b border-divider flex",
                cursor: "w-14 bg-sky-500 h-1 rounded-full",
                tab: "px-0 m-0 h-12 font-semibold hover:bg-gray-200 dark:hover:bg-neutral-900",
                tabContent: "group-data-[selected=true]:text-black text-gray-500 dark:group-data-[selected=true]:text-white",
              }}>
                <Tab key="Top" title="Top" className="p-0">
                  {searchResultshandles?.length > 0 && (
                    <div className="no-tweets pl-4 py-3 text-black">
                      <p className="font-bold text-2xl dark:text-white">People</p>
                    </div>
                  )}
                {searchResultshandles?.slice(0, 3).map((handle: handle) => (
                    <div className="tweet w-full flex hover:bg-neutral-200 cursor-pointer m-0 p-4 dark:border-neutral-800">
                    <div className="avatar">
                      <Avatar
                      // src={"https://gravatar.com/avatar/2b57c362077cd0cc478fbae93f08f2b1?s=400&d=robohash&r=x"}
                        src={handle.img_url} 
                        alt="User Avatar"
                        className="user-avatar min-w-12 min-h-12"
                      />
                    </div>
                    <div className="w-full flex flex-col align pl-2 align-middle">
                      <div className="p-0 m-0 h-5">
                        <NavLink
                          to={{
                            pathname: `/profile/${handle.username}`, //sets the url path
                            //state: { username: username.substring(1) } //passes the state -> is this valid, please verify
                            /*
                            To retrieve this data when navigating to the next page:
                            import { useLocation } from 'react-router-dom';
                            const ProfileComponent = () => {
                              const location = useLocation();
                              const username = location.state?.username;
                
                              // Use the username to render the profile
                            };
                            */
                          }}
                          className="font-semibold p-0 m-0 dark:text-white"
                        >
                          {handle.name}
                        </NavLink>
                      </div>
                      <div className="p-0 m-0 h-5">
                        <NavLink
                          to={{
                            pathname: `/profile/${handle.username}`,
                            //state: { username: username.substring(1) } -> is this valid, please verify
                          }}
                          className="text-slate-700 p-0 m-0 dark:text-gray-400"
                        >
                          @{handle.username}
                        </NavLink>
                      </div>     
                      <div>
                        <p className="p-0 m-0 dark:text-white"></p>{/*perhaps .bio was removed in a merge conflict -> handle.bio*/}
                      </div>             
                    </div>
                  </div>
                  ))}
                  {searchResultstweets?.map(tweet => {
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
                        text={tweet.content}
                        imageUrl={tweet.image}
                        timeDisplay={getTimeDisplay(tweet.created)}
                        likes={formatCount(likes)}
                        retweets={formatCount(retweets)}
                        saves={formatCount(saves)}
                        comments={formatCount(comments)}
                        profileimageurl={image_url}
                      />
                    );
                  })}
                  {/* {searchResultstweets?.length === 0 && (
                    <div className="no-tweets text-center p-8 text-black">
                      <p className="font-bold text-4xl dark:text-white">No results for"{searchValue}"</p>
                    </div>
                  )} */}
                </Tab>
                <Tab key="Latest" title="Latest" className="p-0">
                  {searchResultstweets?.map(tweet => {
                    const user = users.find(u => u.User_Id === tweet.User_Id); // Assuming there's a user_id in tweets data
                    const saves = tweet.Saves && tweet.Saves.length > 0 ? tweet.Saves[0]?.count || 0 : 0;
                    const comments = tweet.Comments && tweet.Comments.length > 0 ? tweet.Comments[0]?.count || 0 : 0;
                    const likes = tweet.Likes && tweet.Likes.length > 0 ? tweet.Likes[0]?.count || 0 : 0;
                    const retweets = tweet.Retweets && tweet.Retweets.length > 0 ? tweet.Retweets[0]?.count || 0 : 0;
                    const image_url = profiles.find(p => p.User_Id === tweet.User_Id)?.Img_Url;
                    
                    return (
                      <Tweet
                        key={tweet.Tweet_Id}
                        tweet_id={tweet.Tweet_Id}
                        name={user ? user.Name : "Unknown User"}
                        username={user ? `@${user.Username}` : ""}
                        text={tweet.content}
                        imageUrl={tweet.image}
                        timeDisplay={getTimeDisplay(tweet.created)}
                        likes={formatCount(likes)}
                        retweets={formatCount(retweets)}
                        saves={formatCount(saves)}
                        comments={formatCount(comments)}
                        profileimageurl={image_url}
                      />
                    );
                  })}
                  {searchResultstweets?.length === 0 && (
                    <div className="no-tweets text-center p-8 text-black">
                      <p className="font-bold text-4xl dark:text-white">No results for"{searchValue}"</p>
                    </div>
                  )}
                </Tab>
                <Tab key="People" title="People" className="p-0">
                  {searchResultshandles?.map((handle: handle) => (
                    <div className="tweet w-full flex border-b hover:bg-neutral-200 cursor-pointer m-0 p-4 dark:border-neutral-800">
                    <div className="avatar">
                      <Avatar
                        // src={"https://gravatar.com/avatar/2b57c362077cd0cc478fbae93f08f2b1?s=400&d=robohash&r=x"}
                        src={handle.img_url} //img_url does not exist on handle
                        alt="User Avatar"
                        className="user-avatar min-w-12 min-h-12"
                      />
                    </div>
                    <div className="w-full flex flex-col align pl-2 align-middle">
                      <div className="p-0 m-0 h-5">
                        <NavLink
                          to={{
                            pathname: `/profile/${handle.username}`, //sets the url path
                            //state: { username: username.substring(1) } //passes the state -> is this valid, please verify
                            /*
                            To retrieve this data when navigating to the next page:
                            import { useLocation } from 'react-router-dom';
                            const ProfileComponent = () => {
                              const location = useLocation();
                              const username = location.state?.username;
                
                              // Use the username to render the profile
                            };
                            */
                          }}
                          className="font-semibold p-0 m-0 dark:text-white"
                        >
                          {handle.name}
                        </NavLink>
                      </div>
                      <div className="p-0 m-0 h-5">
                        <NavLink
                          to={{
                            pathname: `/profile/${handle.username}`,
                            //state: { username: username.substring(1) } -> is this valid, please verify
                          }}
                          className="text-slate-700 p-0 m-0 dark:text-gray-400"
                        >
                          @{handle.username}
                        </NavLink>
                      </div>     
                      <div>
                        <p className="p-0 m-0 dark:text-white">{handle.bio}</p>{/*handle.bio bio does not exist on handle*/}
                      </div>             
                    </div>
                  </div>
                  ))}
                  {searchResultshandles?.length === 0 && (
                    <div className="no-tweets text-center p-8 text-black">
                      <p className="font-bold text-4xl dark:text-white">No results for"{searchValue}"</p>
                    </div>
                  )}
                </Tab>
                <Tab key="Media" title="Media" className="p-0 just">
                  <div className="flex justify-center w-full">
                  {searchResultstweets?.some(tweet => tweet.image) ? (
                    searchResultstweets.map(tweet => {

                      if (tweet.image) {
                        return (
                          <Image
                            src={tweet.image}
                            alt="Tweet Image"
                            className="tweet-image w-1/2"
                            style={{ borderRadius: "10px" }}
                          />
                        );
                      }
                      
                      return null; // Return null if tweet has no image
                    })
                  ) : (
                    <div className="no-tweets text-center p-8 text-black">
                      <p className="font-bold text-4xl dark:text-white">No results for"{searchValue}"</p>
                    </div>
                  )}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </>
        )}
      </>
  );
};

export default Explore;
