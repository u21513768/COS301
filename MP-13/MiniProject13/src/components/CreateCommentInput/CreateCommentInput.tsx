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
import { getCurrentUser } from "@services/auth/auth";
import { NavLink} from "react-router-dom";

// import { GrGallery } from "react-icons/gr";
import { MdOutlineGifBox } from "react-icons/md";
import { LiaPollHSolid } from "react-icons/lia";
import { FaRegFaceSmile } from "react-icons/fa6";
import { TbCalendarSearch } from "react-icons/tb";
import { useEffect} from "react";
import { isUserLoggedIn } from "@services/index";
import { addComment } from "@services/index";

interface TweetProps {
    username: string;
    tweet_id: number;
    user_id: number;
  }

const CreateCommentInput: React.FC<TweetProps> = ({username, tweet_id, user_id}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [commentText, setCommentText] = useState("");
  const [selectedImage, setSelectedImage] = useState<any>();
  const [userAuthStatus, setUserAuthStatus] = useState<boolean>(false);

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


  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    console.log(file);
  };


  const postComment = async () => {
    console.log("Post Tweet clicked");
    try {
      const currentUser = await getCurrentUser();
      // console.log("Current User:", currentUser);
      // console.log("Current User Auth ID:", currentUser?.auth_id);
      if (currentUser !== undefined) {
        //todo: add comment
        add_comment();
        window.location.reload();
      }else
      {
        console.log("User not found");
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const add_comment = async () => {
    const result = await addComment(user_id, tweet_id, commentText);
    if (result) {
      console.log("Comment added successfully");
    } else {
      console.log("Error adding comment");
    }
  };

  const removeImage = () => {
    const file = undefined;
    setSelectedImage(file);
  }

  return (
    <div className="py-2 px-4">
        <p className="text-slate-700 p-0 m-0 dark:text-gray-400 ml-2">
            Replying to 
            <NavLink
                to={{
                    pathname: `/profile/${username}`
                    }}
                    className="p-0 m-0 text-cyan-500 ml-1"
                    >
                    @{username}
            </NavLink>
        </p>
      <div className="flex items-center space-x-1">
        
        <Avatar
          // src={imageUrl} // profile image url to be replaced
          alt="User Avatar"
          className="user-avatar min-w-12 min-h-12"
        // style={{ minWidth: '48px', minHeight: '48px' }}
        />
        {/* decide what variant is better suited later on  */}
        <Textarea
          variant="underlined"
          placeholder="Post your reply"
          className="p-2"
          // style={{ width: "150px" }}
          value={commentText}
          onChange={(event: any) => setCommentText(event.target.value)}
        />
        {selectedImage && (
          <div className="mt-4 mx-auto">
            <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" className="max-w-full" />
            <Button onClick={removeImage}>X</Button>
          </div>
          
        )}
      </div>
      <div className="flex justify-between items-center mt-2  gap-1">
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
          <Modal size="full" isOpen={isOpen} onOpenChange={onOpenChange}>
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
            <Button size='lg' isIconOnly onClick={(e) => {e.preventDefault()}} variant="light" className="text-cyan-400">
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
            <Button size='lg' isIconOnly onClick={(e) => {e.preventDefault()}} variant="light" className="text-cyan-400">
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
            <Button size='lg' isIconOnly onClick={(e) => {e.preventDefault()}} variant="light" className="text-cyan-400">
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
            <Button size='lg' isIconOnly onClick={(e) => {e.preventDefault()}} variant="light" className="text-cyan-400">
              <TbCalendarSearch/>
            </Button>
          </Tooltip>
        </div>
        <div>
          {
            userAuthStatus ?
              <Button
                radius="full"
                className="rounded-full bg-sky-500 text-white border-none font-bold"
                onClick={postComment}
              >
                Reply
              </Button>
              :
              <Button
                radius="full"
                className="rounded-full bg-sky-500 text-white border-none font-bold"
                isDisabled
              >
                Login to Reply
              </Button>
          }
        </div>
      </div>
    </div>
  );
};

export default CreateCommentInput;
