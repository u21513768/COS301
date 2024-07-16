import { Nav, AccountInfo, NotificationSettings,DisplaySettings,ChangePassword } from "@components/index";
import  { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { getUserData, isUserLoggedIn } from "@services/index";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [auth_method, setAuthMethod] = useState(""); //this should be set to the auth method of the user [email, google, github, etc.]
  const navigate = useNavigate(); // Initialize useNavigate hook
  const renderSettingsContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountInfo />;
      case "Notifications":
        return <NotificationSettings />;
      case "Display":
        return <DisplaySettings/>;
      case "ChangePassword": 
        return<ChangePassword/> //this page should not be available for people who did not auth with email
      default:
        return null;
    }
  };

  useEffect(() => {
    // this is necessary for checking if the user is signed in
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      if (!result) {
        navigate("/home"); // Redirect to home page if user is not logged in
      }

      const user = await getUserData();
      if (user) {
        console.log(user.app_metadata.provider);
        setAuthMethod(user.app_metadata.provider?? "");
      }
    }
    
    // Call the async function
    checkUser();
  }, [navigate]);

  return (
      <>
      <div className="main-content flex w-1/4 h-screen m-0 p-0 border dark:border-neutral-800">
        <div className="flex flex-col m-0 p-0 w-full">
          <div className="p-4 border-b border-gray-300 dark:border-neutral-800">
            <h2 className="text-gray-600 font-semibold dark:text-white">SETTINGS</h2>
          </div>
          <div className="mt-4 w-full">
          <div className={`hover:bg-gray-100 dark:hover:bg-neutral-900 p-2 h-12 w-full cursor-pointer flex justify-between items-center dark:text-white ${activeTab === "account" ? "border-r-2 border-sky-500" : ""}`} onClick={() => setActiveTab("account")}>
                <p className="font-semibold">Your account</p>
                <IoIosArrowForward className="dark:text-gray-500" />
            </div>
            {
              auth_method === "email" && (
                <div className={`hover:bg-gray-100 dark:hover:bg-neutral-900 p-2 h-12 w-full cursor-pointer flex justify-between items-center dark:text-white ${activeTab === "ChangePassword" ? "border-r-2 border-sky-500" : ""}`} onClick={() => setActiveTab("ChangePassword")} >
                    <p>Change Password</p>
                    <IoIosArrowForward className="dark:text-gray-500" />
                </div>
              )
            }
            <div className={`hover:bg-gray-100 dark:hover:bg-neutral-900 p-2 h-12 w-full cursor-pointer flex justify-between items-center dark:text-white ${activeTab === "Display" ? "border-r-2 border-sky-500" : ""}`} onClick={() => setActiveTab("Display")}>
                <p>Display</p>  
                <IoIosArrowForward className="dark:text-gray-500" />           
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-right w-2/5 ml-7 mt-2 pl-1 pr-2">
        {renderSettingsContent()}
      </div>
      </>
  );
};

export default Settings;
