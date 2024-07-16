import { useState } from "react";
import {
  Avatar,
  Button,
  Textarea,
  Tooltip
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";
import {
  GalleryIcon,
} from "@assets/index";
import { addTweet } from "@services/index";
import { getCurrentUser } from "@services/auth/auth";

// import { GrGallery } from "react-icons/gr";
import { MdOutlineGifBox } from "react-icons/md";
import { LiaPollHSolid } from "react-icons/lia";
import { FaRegFaceSmile } from "react-icons/fa6";
import { TbCalendarSearch } from "react-icons/tb";
import { useEffect} from "react";
import { isUserLoggedIn } from "@services/index";
import toast from 'react-hot-toast';
//import { CreateTweetNotification } from "@services/index";

const CreateTweet = () => {
  const [userAuthStatus, setUserAuthStatus] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<any>();
  const [tweetText, setTweetText] = useState("");
  const [isloading, setIsLoading] = useState(false);


  // const handleGalleryClick = (event: any) => {
  //   event.preventDefault();
  //   // Handle Gallery click
  //   console.log("Gallery clicked");
  // };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    console.log(file);
  };

  const handleGIFClick = (event: any) => {
    event.preventDefault();
    // Handle GIF click
  };

  const handlePollsClick = (event: any) => {
    event.preventDefault();
    // Handle Polls click
  };

  const handleStickersClick = (event: any) => {
    event.preventDefault();
    // Handle Stickers click
  };

  const handleScheduleClick = (event: any) => {
    event.preventDefault();
    // Handle Schedule click
  };

  // const handlePostTweet = (event: any) => {
  //   event.preventDefault();
  //   // Handle Post Tweet click
  //   console.log("Post Tweet clicked");
  //   console.log("Tweet text:", tweetText);
  //   console.log("Selected Image:", selectedImage);

  // };

  const postTweet = async () => {
    setIsLoading(true);
    try {
      const currentUser = await getCurrentUser();
      // console.log("Current User:", currentUser);
      // console.log("Current User Auth ID:", currentUser?.auth_id);
      if (currentUser !== undefined) {
      const user = currentUser.auth_id;
      const date = new Date();
      const tweetData = { User_Id: user, Content: tweetText, Img_filename: user?.toString() + date?.toISOString().replace(/Z$/, '') + (selectedImage?.name || ""),Img_file: selectedImage };
      // console.log("Tweet data:", tweetData);
      await addTweet(tweetData);//maybe this can be improved to account for errors occurring, however there is a try-catch block here
      setIsLoading(false);
      toast.success('Tweet posted successfully', { duration: 2000, position: 'top-center',});
      window.location.reload();
      }
      else
      {
        setIsLoading(false);
        toast.error('User not found', { duration: 2000, position: 'top-center',});
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Error fetching user', { duration: 2000, position: 'top-center',});
    }
  };

  const removeImage = () => {
    const file = undefined;
    setSelectedImage(file);
  }
  
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
    <div className="py-2 px-4">
      {/* Still need to figure out styling/alignmnet of Avatar and TextArea */}
      <div className="flex align-middle items-center space-x-1">
        <Avatar
          // src={imageUrl} // profile image url to be replaced
          alt="User Avatar"
          className="user-avatar min-w-12 min-h-12"
        // style={{ minWidth: '48px', minHeight: '48px' }}
        />
        {/* decide what variant is better suited later on  */}
        <Textarea
          variant="underlined"
          placeholder="What is happening?!"
          minRows={1}
          className="p-2 items-center align-middle"
          // style={{ width: "150px" }}
          value={tweetText}
          onChange={(event: any) => setTweetText(event.target.value)}
        />
        {selectedImage && (
          <div className="mt-4 mx-auto">
            <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" className="max-w-full" />
            <Button onClick={removeImage}>X</Button>
          </div>
          
        )}
      </div>
      <div className="flex justify-between items-center mt-2 mx-12 gap-1">
        <div className="flex gap-1">
          <Tooltip
            content="Media"
            placement="bottom"
            delay={500}
            motionProps={{
              variants: {
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                },
                enter: {
                  opacity: 1,
                  transition: {
                    duration: 0.15,
                    ease: "easeOut",
                  },
                },
              },
            }}
          >
            <Button isIconOnly onPress={onOpen} variant="light">{//onClick={handleGalleryClick}}
            }
              <img src={GalleryIcon} alt="Gallery" className="w-6 h-6" />
            </Button>
          </Tooltip>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose: any) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <Tooltip
            content="GIF"
            placement="bottom"
            delay={500}
            motionProps={{
              variants: {
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                },
                enter: {
                  opacity: 1,
                  transition: {
                    duration: 0.15,
                    ease: "easeOut",
                  },
                },
              },
            }}
          >
            <Button size='lg' isIconOnly onClick={handleGIFClick} variant="light" className="text-cyan-400">
              <MdOutlineGifBox/>
            </Button>
          </Tooltip>
          <Tooltip
            content="Poll"
            placement="bottom"
            delay={500}
            motionProps={{
              variants: {
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                },
                enter: {
                  opacity: 1,
                  transition: {
                    duration: 0.15,
                    ease: "easeOut",
                  },
                },
              },
            }}
          >
            <Button size='lg' isIconOnly onClick={handlePollsClick} variant="light" className="text-cyan-400">
              <LiaPollHSolid/>
            </Button>
          </Tooltip>
          <Tooltip
            content="Emoji"
            placement="bottom"
            delay={500}
            motionProps={{
              variants: {
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                },
                enter: {
                  opacity: 1,
                  transition: {
                    duration: 0.15,
                    ease: "easeOut",
                  },
                },
              },
            }}
          >
            <Button size='lg' isIconOnly onClick={handleStickersClick} variant="light" className="text-cyan-400">
              <FaRegFaceSmile/>
            </Button>
          </Tooltip>
          <Tooltip
            content="Schedule"
            placement="bottom"
            delay={500}
            motionProps={{
              variants: {
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                },
                enter: {
                  opacity: 1,
                  transition: {
                    duration: 0.15,
                    ease: "easeOut",
                  },
                },
              },
            }}
          >
            <Button size='lg' isIconOnly onClick={handleScheduleClick} variant="light" className="text-cyan-400">
              <TbCalendarSearch/>
            </Button>
          </Tooltip>
        </div>
        <div className="-mx-9">
          {
            userAuthStatus && isloading ?
              <Button
                radius="full"
                className="rounded-full bg-sky-500 text-white border-none font-bold"
                onClick={postTweet}
                isLoading
              >
                Post
              </Button>
            : userAuthStatus && isloading === false ?
              <Button
                radius="full"
                className="rounded-full bg-sky-500 text-white border-none font-bold"
                onClick={postTweet}
              >
                Post
              </Button>
              :
              <Button
                radius="full"
                className="rounded-full bg-sky-500 text-white border-none font-bold"
                isDisabled
              >
                Login to post
              </Button>
          }
        </div>
      </div>
    </div>
  );
};

export default CreateTweet;
