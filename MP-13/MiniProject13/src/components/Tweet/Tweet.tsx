import React, { useEffect, useState } from "react";
import { FaRegComment, FaComment } from "react-icons/fa";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import { LuRepeat2 } from "react-icons/lu";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { Image } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { NavLink, Link } from "react-router-dom";
import CreateComment from "../CreateComment/CreateComment";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

import {
  getLoggedUserId,
  likeTweet,
  unlikeTweet,
  checkIfLiked,
  retweet,
  checkIfRetweeted,
  save,
  unSave,
  checkIfSaved,
  unReweet
} from "@services/index";

interface TweetProps {
  tweet_id: number;
  //userid: number;
  name: string;
  username: string;
  text: string;
  imageUrl?: string;
  profileimageurl?: string;
  timeDisplay: string;
  likes?: number | string;
  retweets?: number | string;
  comments?: number | string;
  saves?: number | string;
  bookmarked?: boolean;
  author?: string;
  currentuserimg?: string;
}
const Tweet: React.FC<TweetProps> = ({ tweet_id, name, username, text, imageUrl, profileimageurl, timeDisplay, likes, retweets, comments, saves, bookmarked, author, currentuserimg}) => {
  

  const [commentColor] = useState(false);
  const [retweetColor, setRetweetColor] = useState(false);
  const [likeColor, setLikeColor] = useState(false);
  const [bookmarkColor, setBookmarkColor] = useState(bookmarked || false);
  const [loggedUserId, setLoggedUserId] = useState<any>();
  const [commentCount] = useState(Number(comments) || 0);
  const [retweetCount, setRetweetCount] = useState(Number(retweets) || 0);
  const [likeCount, setLikeCount] = useState(Number(likes) || 0);
  const [saveCount, setSaveCount] = useState(Number(saves) || 0);
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const handleCommentClick = () => {
    /*setCommentColor((prevState) => !prevState);
    setCommentCount((prevCount) =>
      commentColor ? prevCount - 1 : prevCount + 1
    );*/
    onOpen();
  };

  const handleRetweetClick = () => {
    setRetweetColor((prevState) => !prevState);
    setRetweetCount((prevCount) =>
      retweetColor ? prevCount - 1 : prevCount + 1
    );

    check_retweet().then((result) => {
      if (result===false) {
        add_retweet();
      } else {
        un_retweet();
      }
    });
    // Call the toggleRetweet function with tweetid and username
  };

  const handleLikeClick = () => {
    setLikeColor((prevState) => !prevState);
    setLikeCount((prevCount) => (likeColor ? prevCount - 1 : prevCount + 1));

    // Call the toggleLike function with tweetid and username
    check_like().then((result) => {
      if (result===false) {
        add_like();
      } else {
        un_like();
      }
    });
  };

  const handleBookmarkClick = () => {
    setBookmarkColor((prevState) => !prevState);
    setSaveCount((prevCount) =>
      bookmarkColor ? prevCount - 1 : prevCount + 1
    );

    // Call the toggleSave function with tweetid and username
    check_save().then((result) => {
      if (result===false) {
        add_save();
      } else {
        un_save();
      }
    });
  };

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const id = await getLoggedUserId();
        setLoggedUserId(id);
      } catch (error) {
        console.error('Error fetching userid:', error);
      }
    };

    fetchLoggedInUser();
  }, []);


  const add_like = async () => {
    const result = await likeTweet(tweet_id, loggedUserId);
    console.log(result);
  };
  const check_like = async () => {
    const result = await checkIfLiked(tweet_id, loggedUserId);
    console.log(result);
    return result;
  };
  const un_like = async () => {
    const result = await unlikeTweet(tweet_id, loggedUserId);
    console.log(result);
  };

  const add_retweet = async () => {
    const result = await retweet(tweet_id, loggedUserId);
    console.log(result);
  };

  const check_retweet = async () => {
    const result = await checkIfRetweeted(tweet_id, loggedUserId);
    console.log(result);
    console.log(tweet_id, loggedUserId);
    return result;
  };

  const un_retweet = async () => {
    const result = await unReweet(tweet_id, loggedUserId);
    console.log(result);
  };

  const add_save = async () => {
    const result = await save(tweet_id, loggedUserId);
    console.log(result);
  };

  const check_save = async () => {
    const result = await checkIfSaved(tweet_id, loggedUserId);
    console.log(result);
    return result;
  };

  const un_save = async () => {
    const result = await unSave(tweet_id, loggedUserId);
    console.log(result);
  };


  // const add_comment = async()=>{
  //   const result = await toggleComment(tweetid, loggedUserId);
  //   console.log(result);
  // }
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
      <div className="avatar">
        <Avatar
          src={profileimageurl}
          alt="User Avatar"
          className="user-avatar min-w-12 min-h-12"
        />
      </div>
      <div className="post flex-col w-full pl-2">
        <div className="user-info flex">
          <NavLink
            to={{
              // pathname: `/profile/${username.substring(1)}`, //sets the url path
              // state: { username: username.substring(1) } //passes the state -> is this valid, please verify
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
            {name}
          </NavLink>
          <NavLink
            to={{
              pathname: `/profile/${username.substring(1)}`,
              //state: { username: username.substring(1) } -> is this valid, please verify
            }}
            className="text-slate-700 p-0 m-0 dark:text-gray-400"
          >
            @{username.substring(1)} &nbsp;· {timeDisplay}
          </NavLink>
        </div>
        {author && (
          <div>
            <NavLink
              to={{
                pathname: `/profile/${author.substring(1)}`,
              }}
              className="text-slate-700 p-0 m-0 block text-left"
            >
              replying to @{author.substring(1)} &nbsp;
            </NavLink>
          </div>
        )}
        <Link to={`/tweet/${tweet_id}`} key={tweet_id} className="tweet-link">
          <div>
            <p className="p-0 m-0 dark:text-white">{text}</p>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Tweet Image"
                className="tweet-image w-auto h-full"
                style={{ borderRadius: "10px" }}
              />
            )}
          </div>
        </Link>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {() => (
              <ModalBody>
                <CreateComment
                  tweet_id={tweet_id}
                  user_id={loggedUserId}
                  name={name}
                  username={username}
                  text={text}
                  imageUrl={imageUrl}
                  profileimageurl={profileimageurl}
                  timeDisplay={timeDisplay}
                  userimg={currentuserimg || ''}
                ></CreateComment>
              </ModalBody>
            )}
          </ModalContent>
        </Modal>
        <div className="tweet-actions flex flex-row justify-around col text-slate-700">

          <span
            className={`action flex items-center cursor-pointer z-3 ${
              commentColor ? "text-blue-500" : "hover:text-blue-500"
            }`}
            onClick={handleCommentClick}
          >
            {commentColor ? (
              <FaComment className="w-4 h-4" />
            ) : (
              <FaRegComment className="w-4 h-4" />
            )}{" "}
            &nbsp;{commentCount}{" "}
          </span>
          <span
            className={`action flex items-center cursor-pointer ${
              retweetColor ? "text-green-500" : "hover:text-green-500"
            }`}
            onClick={handleRetweetClick}
          >
            {retweetColor ? (
              <LuRepeat2 className="w-4 h-4" />
            ) : (
              <LuRepeat2 className="w-4 h-4" />
            )}{" "}
            &nbsp;{retweetCount}{" "}
          </span>
          <span
            className={`action flex items-center cursor-pointer ${
              likeColor ? "text-red-500" : "hover:text-red-500"
            }`}
            onClick={handleLikeClick}
          >
            {likeColor ? (
              <PiHeartFill className="w-4 h-4" />
            ) : (
              <PiHeartBold className="w-4 h-4" />
            )}{" "}
            &nbsp;{likeCount}{" "}
          </span>
          <span
            className={`action flex items-center cursor-pointer ${
              bookmarkColor ? "text-orange-500" : "hover:text-orange-500"
            }`}
            onClick={handleBookmarkClick}
          >
            {bookmarkColor ? (
              <FaBookmark className="w-4 h-4" />
            ) : (
              <FaRegBookmark className="w-4 h-4" />
            )}{" "}
            &nbsp;{saveCount}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;

