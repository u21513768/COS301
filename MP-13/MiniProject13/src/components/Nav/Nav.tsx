import { FaTwitter } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { PiBellBold } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { Button } from '@nextui-org/button';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import { NavLink, useLocation } from 'react-router-dom';
import { CreateTweet } from "..";
import { useState, useEffect } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import { signOut } from "@services/index";
import { getLoggedUserId, fetchUsers } from "@services/index";
import { isUserLoggedIn } from "@services/index";
import { CiLogin } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { IoGameControllerOutline } from 'react-icons/io5';
import { fetchProfileDetails } from "@services/index";

const Nav = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1265);
  const [userAuthStatus, setUserAuthStatus] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState('');
  const [userUsername, setUserUsername] = useState('');
  const [profileDetails, setProfileDetails] = useState<any>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = await getLoggedUserId();
        if (!userId) return;
        const profileData = await fetchProfileDetails(userId);
        setProfileDetails(profileData);
        // console.log('Profile Data:', profileData); // Log the profile data
      } catch (error) {
        console.error('Error fetching profile details:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    console.log('Logout clicked');
    signOut().then(result => {
      if (result === "success") {
        console.log("User logged out successfully.");
        window.location.href = '/';
      } else {
        console.error("Error logging out user.");
      }
    }).catch(error => {
      console.error("Error logging out user:", error);
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1265);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {

      //option 2
      // console.log('Fetching ID');
      const userId = await getLoggedUserId();
      // console.log('ID: ', userId);
      if (userId) {
        try {
          // Fetch user data
          const userData = await fetchUsers();
          if(!userData){
            throw "userData array is undefined";
          }
          // Find the user object with the matching User_Id
          const user = userData.find(user => user.User_Id === userId);

          if (user) {
            setUserName(`${user.Name} ${user.Surname}`);
            setUserUsername(`@${user.Username}`);
          } else {
            console.error('User data not found for user ID:', userId);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [userAuthStatus]);

  useEffect(() => {
    // this is necessary for checking if the user is signed in
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      setUserAuthStatus(result);
    }

    // Call the async function
    checkUser();
  }, []);

  return (
    <div className="sidebar h-full bg-inherit dark:bg-black py-12 dark:text-white fixed">
      {/* Logo */}
      <NavLink
        to="/home"
        className={`sidebar-item-logo w-16 h-16 flex items-center mb-2 cursor-pointer rounded-full p-3 ${location.pathname === '/home' ? '' : ''
          }`}
      >
        <FaTwitter size={35} />
      </NavLink>
      {isLargeScreen && (
        <>
          {/* Home */}
          <NavLink
            to="/home"
            className={`sidebar-item cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 dark:hover:bg-neutral-900 hover:bg-gray-200 ${location.pathname === '/home' ? 'font-bold active-tab' : ''
              }`}
          >
            <GoHomeFill size={28} className="mr-5" />
            Home
          </NavLink>

          {/* Explore */}
          <NavLink
            to="/explore"
            className={`sidebar-item cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 dark:hover:bg-neutral-900 hover:bg-gray-200 ${location.pathname === '/explore' ? 'font-bold active-tab' : ''
              }`}
          >
            <IoSearch size={28} className="mr-5" />
            Explore
          </NavLink>

          {/* Notifications */}
          {userAuthStatus &&
            <NavLink
              to="/notifications"
              className={`sidebar-item cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 dark:hover:bg-neutral-900 hover:bg-gray-200 ${location.pathname === '/notifications' ? 'font-bold active-tab' : ''
                }`}
            >
              <PiBellBold size={28} className="mr-5" />
              Notifications
            </NavLink>
          }

          {/* Bookmarks */}
          {userAuthStatus &&
            <NavLink
              to="/bookmarks"
              className={`sidebar-item cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 dark:hover:bg-neutral-900 hover:bg-gray-200 ${location.pathname === '/bookmarks' ? 'font-bold active-tab' : ''
                }`}
            >
              <FaRegBookmark size={28} className="mr-5" />
              Bookmarks
            </NavLink>
          }
          {/* Twivia */}
          {userAuthStatus &&
            <NavLink
              to="/twivia"
              className={`sidebar-item cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 dark:hover:bg-neutral-900 hover:bg-gray-200 ${location.pathname === '/twivia' ? 'font-bold active-tab' : ''
                }`}
            >
              <IoGameControllerOutline size={28} className="mr-5" />
              Twivia
            </NavLink>
          }

          {/* Profile */}
          {userAuthStatus &&
            <NavLink
              to="/profile"
              className={`sidebar-item cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 dark:hover:bg-neutral-900 hover:bg-gray-200 ${location.pathname === '/profile' ? 'font-bold active-tab' : ''
                }`}
            >
              <FaRegUserCircle size={28} className="mr-5" />
              Profile
            </NavLink>
          }

          {/* Settings */}
          {userAuthStatus &&
            <NavLink
              to="/settings"
              className={`sidebar-item cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 dark:hover:bg-neutral-900 hover:bg-gray-200 ${location.pathname === '/settings' ? 'font-bold active-tab' : ''
                }`}
            >
              <FiSettings size={28} className="mr-5" />
              Settings
            </NavLink>
          }

          {/* Post Button - will route to create tweet component */}
          {
            userAuthStatus ?
              <div>
                {/* Button to open the modal */}
                <Button size="lg" className="post-button bg-sky-500 w-52 p-3 cursor-pointer rounded-full text-center font-semibold text-white text-lg my-4" onClick={handleOpenModal}>
                  Post
                </Button>

                {/* Modal */}
                <Modal size="xl" isOpen={isModalOpen} onOpenChange={handleCloseModal}>
                  <ModalContent>
                    <ModalHeader>
                    </ModalHeader>
                    <ModalBody>
                      <CreateTweet />
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </div>
              :
              <div className="my-7">
                <NavLink to="/" className={`post-button bg-sky-500 w-36 p-3 cursor-pointer rounded-full text-center font-semibold text-white text-lg my-4`}>
                  SignIn/Signup
                </NavLink>
              </div>
          }

          {
            userAuthStatus &&
            <div
              className="active-user-tab flex items-center justify-center w-full h-16 border-t border-gray-200 mt-auto relative cursor-pointer"
              onClick={() => setShowPopup(!showPopup)}
            >
              <div className="user-icon w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                {profileDetails?.Img_Url ? (
                  <img src={profileDetails.Img_Url} alt="Profile" className="rounded-full object-cover object-center" style={{ width: "100%", height: "100%" }} />
                ) : (
                  <FaUser size={20} color="#FFFFFF" />
                )}
              </div>

              <div className="user-info">
                <p className="text-sm font-semibold mb-1">{userName}</p>
                <p className="text-xs">{userUsername}</p>
              </div>
            </div>
          }

          {showPopup && (
            <div className="speech-bubble absolute bg-white border border-gray-300 rounded-lg p-2 mt-2">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm">Are you sure you want to log out?</p>
                <FaTimes className="cursor-pointer" onClick={() => setShowPopup(false)} />
              </div>
              <button className="logout-button bg-white text-black px-3 py-1 rounded-md font-bold" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </>
      )}

      {/* Post Button --> second POST button after merge with dev? */}
      {/*<Button size="lg" className="post-button bg-sky-500 w-36 p-3 cursor-pointer rounded-full text-center font-semibold text-white text-lg my-4" onPress={onOpen}>
        Post
    </Button>*/}


      {!isLargeScreen && (
        <>
          {/* Home */}
          <NavLink
            to="/home"
            className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 ${location.pathname === '/home' ? 'bg-gray-200 active-tab' : ''
              }`}
          >
            <GoHomeFill size={28} />
          </NavLink>

          {/* Explore */}
          <NavLink
            to="/explore"
            className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 ${location.pathname === '/explore' ? 'bg-gray-200 active-tab' : ''
              }`}
          >
            <IoSearch size={28} />
          </NavLink>

          {/* Notifications */}
          {userAuthStatus &&
            <NavLink
              to="/notifications"
              className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 ${location.pathname === '/notifications' ? 'bg-gray-200 active-tab' : ''
                }`}
            >
              <PiBellBold size={28} />
            </NavLink>
          }

          {/* Bookmarks */}
          {userAuthStatus &&
            <NavLink
              to="/bookmarks"
              className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 ${location.pathname === '/bookmarks' ? 'bg-gray-200 active-tab' : ''
                }`}
            >
              <FaRegBookmark size={28} />
            </NavLink>
          }
          {/* Twivia */}
          {userAuthStatus &&
            <NavLink
              to="/twivia"
              className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 ${location.pathname === '/twivia' ? 'bg-gray-200 active-tab' : ''
                }`}
            >
              <IoGameControllerOutline size={28}/>
            </NavLink>
          }

          {/* Profile */}
          {userAuthStatus &&
            <NavLink
              to="/profile"
              className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 ${location.pathname === '/profile' ? 'bg-gray-200 active-tab' : ''
                }`}
            >
              <FaRegUserCircle size={28} />
            </NavLink>
          }

          {/* Settings */}
          {userAuthStatus &&
            <NavLink
              to="/settings"
              className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 ${location.pathname === '/settings' ? 'bg-gray-200 active-tab' : ''
                }`}
            >
              <FiSettings size={28} />
            </NavLink>
          }

          {/* Post */}
          {
            userAuthStatus ?
              <div>
                <NavLink
                  to="/home" //will route to create a tweet component
                  className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 bg-sky-500`}
                  onClick={handleOpenModal}
                >
                  <BiPlusCircle size={28} color="#FFFFFF" />
                </NavLink>
                <Modal isOpen={isModalOpen} onOpenChange={handleCloseModal}>
                  <ModalContent>
                    <CreateTweet />
                  </ModalContent>
                </Modal>
              </div>
              :
              <NavLink
                to="/home" //will route to create a tweet component
                className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 bg-sky-500`}
              >
                <CiLogin size={28} color="#FFFFFF" />
              </NavLink>
          }

          {
            userAuthStatus &&
            <div
              className="active-user-tab flex items-center justify-center w-full h-16 border-t border-gray-200 mt-auto relative cursor-pointer"
              onClick={() => setShowPopup(!showPopup)}
            >
              <div className="user-icon w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">

                {profileDetails?.Img_Url ? (
                  <img src={profileDetails.Img_Url} alt="Profile" className="rounded-full object-cover object-center" style={{ width: "100%", height: "100%" }} />
                ) : (
                  <FaUser size={20} color="#FFFFFF" />
                )}
              </div>


              {showPopup && (
                <div className="speech-bubble absolute bg-white border border-gray-300 rounded-lg p-2 mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm">Are you sure you want to log out?</p>
                    <FaTimes className="cursor-pointer" onClick={() => setShowPopup(false)} />
                  </div>
                  <button className="logout-button bg-white text-black px-3 py-1 rounded-md font-bold" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          }
        </>
      )}
    </div>
  );
};


export default Nav;

