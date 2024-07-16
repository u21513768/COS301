import React, { useEffect, useState } from "react";
import {
  fetchProfileDetails,
  fetchUserData,
  updateProfileDetails,
  updateUsername,
  updateName,
  updateEmail,
  updateSurname,
} from "@services/index";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";

const AccountInfo: React.FC = () => {
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedSurname, setEditedSurname] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedGender, setEditedGender] = useState("");

  const genders = [
    {
      key: "0",
      value: "Male",
    },
    {
      key: "1",
      value: "Female",
    },
    {
      key: "2",
      value: "Other",
    },
  ];

  const locations = [
    { key: "0", value: "Nigeria" },
    { key: "1", value: "United States" },
    { key: "2", value: "United Kingdom" },
    { key: "3", value: "Canada" },
    { key: "4", value: "Germany" },
    { key: "5", value: "France" },
    { key: "6", value: "Australia" },
    { key: "7", value: "South Africa" },
    { key: "8", value: "Brazil" },
    { key: "9", value: "India" },
    { key: "10", value: "China" },
  ];

  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, " "),
    [selectedKeys]
  );
  useEffect(() => {
    const fetchData = async () => {
      const userDataX = await fetchUserData();
      const profileDetails = await fetchProfileDetails(userDataX.User_Id);
      setAccountInfo(profileDetails);
      setUserData(userDataX);
      // console.log(profileDetails);
      // console.log(userDataX);
    };
    fetchData();
  }, [userData]);

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

  const convertDataToAge = (dateString: Date) => {
    if (!dateString) return null;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSaveClick = async () => {
    update_Username(editedUsername);
    update_Name(editedName);
    update_Surname(editedSurname);
    update_Email(editedEmail);
    updateUserData({
      Banner_Url: userData.Banner_Url,
      Bio: userData.Bio,
      Img_Url: userData.Img_Url,
      Profile_Type: userData.Profile_Type,
      Theme: userData.Theme,
      Location: editedLocation,
      Website: userData.Website,
      Gender: editedGender,
    });
    alert("Changes saved successfully");
  };

  const update_Username = async (editedUsername: string) => {
    const result = await updateUsername(editedUsername);
    console.log(result);
  };
  const update_Name = async (editedName: string) => {
    const result = await updateName(editedName);
    console.log(result);
  };

  const update_Surname = async (editedSurname: string) => {
    const result = await updateSurname(editedSurname);
    console.log(result);
  };

  const update_Email = async (editedEmail: string) => {
    const result = await updateEmail(editedEmail);
    console.log(result);
  };

  const updateUserData = async (userData: {
    Banner_Url?: string;
    Bio?: string;
    Img_Url?: string;
    Location?: string;
    Profile_Type?: string;
    Theme?: boolean;
    Website?: string;
    Gender?: string;
  }) => {
    const result = await updateProfileDetails(userData);
    console.log(result);
  };
  if (!userData) {
    return <div>Loading...</div>;
  } else {
    if (!accountInfo) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="bg-white text-gray-800 dark:bg-black dark:text-white">
          <div className="p-4 border-b border-gray-300">
            <h4 className="text-gray-600 font-semibold dark:text-white">Account information</h4>
          </div>
          <div className="p-4">
            <div className="p-2 rounded-md">
              <label className="font-semibold">Name</label>
              <Input
                id="surname"
                placeholder={
                  userData.Name ? userData.Name : "Enter your name"
                }
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div className="h-1" />
            <div className="p-2 rounded-md">
              <label className="font-semibold">Surname</label>
              <Input
                id="surname"
                placeholder={
                  userData.Surname ? userData.Surname : "Enter your surname"
                }
                onChange={(e) => setEditedSurname(e.target.value)}
              />
            </div>
            <div className="h-1" />
            <div className="p-2 rounded-md">
              <label className="font-semibold">Username</label>
              <Input
                id="username"
                placeholder={
                  userData.Username ? userData.Username : "Enter your username"
                }
                onChange={(e) => setEditedUsername(e.target.value)}
              />
            </div>
            <div className="h-1" />
            <div className="p-2 rounded-md">
              <label className="font-semibold">Email</label>
              <Input
                id="email"
                placeholder={
                  userData.Email ? userData.Email : "Enter your email"
                }
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            </div>
            <div className="h-1" />
            <div className="p-2 rounded-md">
              <p className="font-semibold">Account creation</p>
              <p className="text-gray-500">
                {getTimeDisplay(userData.Created_at)}
              </p>
            </div>
            <div className="h-1" />
            <div className="p-2 rounded-md">
              <label className="font-semibold">Location</label>
              <div>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="solid" color="primary">
                      {" "}
                      {accountInfo.Location
                        ? accountInfo.Location
                        : "Select your Location"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Dynamic Actions" items={locations}>
                    {(item) => (
                      <DropdownItem key={item.key}>
                        <Button onClick={() => setEditedLocation(item.value)}>
                          {item.value}
                        </Button>
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div className="h-1" />
            <div className="p-2 rounded-md">
              <p className="font-semibold">Languages</p>
              <p className="text-gray-500">English</p>
            </div>
            <div className="h-1" />
            <div className="p-2 rounded-md">
              <label className="font-semibold">Gender</label>
              <div>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="solid" color="primary">
                      {accountInfo.Gender ? accountInfo.Gender : "Select your gender"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Dynamic Actions"
                    items={genders}
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    //  onSelectionChange={setSelectedKeys}
                  >
                    {(item) => (
                      <DropdownItem key={item.key} color="primary">
                        <Button onClick={() => setEditedGender(item.value)}>
                          {item.value}
                        </Button>
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div className="h-1" />
            <div className="p-2 rounded-md">
              <p className="font-semibold">Birth date</p>
              <p className="text-gray-500">
                {userData.Data_Of_Birth?.toString() ??
                  "No Birth Date Available"}
              </p>
            </div>
            <div className="h-1" />
            <div className="p-2 rounded-md">
              <p className="font-semibold">Age</p>
              <p className="text-gray-500">
                {convertDataToAge(userData.Data_Of_Birth)
                  ? userData.Data_Of_Birth
                  : "No Age Available"}
              </p>
            </div>
          </div>
          <Button onClick={handleSaveClick}>Save Changes</Button>
        </div>
      );
    }
  }
};

export default AccountInfo;
