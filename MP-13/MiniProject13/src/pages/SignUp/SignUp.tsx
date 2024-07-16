import { useEffect, useState} from "react";
import { isUserLoggedIn, signUpNewUser, updateUsername, uploadProfile } from "@services/index";
import { useNavigate} from "react-router-dom"; // Import useNavigate hook
import {Button, Input, Card} from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from '@nextui-org/react';
import { twitterLogo, chevron, defaultavater, profile1, profile2, profile3} from "@assets/index";
import { createDateObject } from '@utils/index';
import { RecommendedUsers } from "@components/index";


//The Name, Email and Date Capture
const Flow1 = ({ formData, setFormData, setFlowPage }: any) => {
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedDay, setSelectedDay] = useState("Day");
  const [selectedYear, setSelectedYear] = useState("Year");
  const [error, setError] = useState<string>("");

  const handleNextPressed = (e: any) => {
    e.preventDefault();
    if (formData.name === ""){ 
      setError("Name is required");
      return;
    }
    if (formData.email === ""){
      setError("Email is required");
      return;
    }
    if (selectedDay === "Day"){ 
      setError("Day of birth is required");
      return;
    }
    if (selectedMonth === "Month"){
      setError("Month of birth is required");
      return;
    }
    if (selectedYear === "Year"){
      setError("Year of birth is required");
      return;
    }
    setFormData({ ...formData, dob: createDateObject(selectedDay, selectedMonth, selectedYear) });
    setFlowPage(3); // Skip capturing the code for now
  };

  const yearItems = [];
  for (let year = 1904; year <= 2024; year++) {
    yearItems.push(
      <DropdownItem
        key={year.toString()}
        onClick={() => setSelectedYear(year.toString())}
      >
        {year.toString()}
      </DropdownItem>
    );
  }

  const [monthItems] = useState([
    { key: "January", label: "January", days: 31 },
    { key: "February", label: "February", days: 28 }, // Default days for February
    { key: "March", label: "March", days: 31 },
    { key: "April", label: "April", days: 30 },
    { key: "May", label: "May", days: 31 },
    { key: "June", label: "June", days: 30 },
    { key: "July", label: "July", days: 31 },
    { key: "August", label: "August", days: 31 },
    { key: "September", label: "September", days: 30 },
    { key: "October", label: "October", days: 31 },
    { key: "November", label: "November", days: 30 },
    { key: "December", label: "December", days: 31 },
  ]);
  

  const dayItems = [];
  

  const daysInMonth = (() => {
    const selectedMonthItem = monthItems.find(item => item.key === selectedMonth);
    if (selectedMonthItem) {
      if (selectedMonthItem.key === "February") {
        // Check if it's a leap year
        const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        const yearNumber = parseInt(selectedYear, 10)
        return isLeapYear(yearNumber) ? 29 : 28;
      } else {
        return selectedMonthItem.days;
      }
    }
    return 31; // Default to 31 days if month not found (this should never happen ideally)
  })();
  for (let day = 1; day <= daysInMonth; day++) {
    dayItems.push(
      <DropdownItem
        key={day.toString().padStart(2, '0')}
        onClick={() => setSelectedDay(day.toString().padStart(2, '0'))}
      >
        {day.toString().padStart(2, '0')}
      </DropdownItem>
    );
  }

  return (
    <Card shadow="sm" className="w-[400px] p-10">
        <div className="text-center">
          <img src={twitterLogo} alt="logo" className="w-14 mx-auto mb-2" />
          <h2 className="text-xl font-bold mb-6">Create an account</h2>
        </div>
        <form className="w-full flex flex-col gap-4 pt-2">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input 
              variant="underlined"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"> 
            <Input variant="underlined"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className=" mt-8">
            <div className="block text-black font-semibold">Date of birth</div>
          </div>
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="bordered"
                  className="capitalize border border-gray-300"
                  style={{ borderRadius: '5px', minWidth: '120px'}}
                >
                  <span>{selectedMonth}</span> 
                  <img src={chevron} alt="chevron" className="w-4 h-4 ml-8" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Month"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedMonth}
                onSelectionChange={(key) => setSelectedMonth(key.toString())}
                className="max-h-40 overflow-y-auto"
              >
                {monthItems.map(month => (
                <DropdownItem 
                  key={month.key}
                  onClick={() => setSelectedMonth(month.label)}>
                    {month.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="capitalize border border-gray-300"
                  style={{ borderRadius: '5px', minWidth: '70px'}}
                >
                  <span>{selectedDay}</span>
                  <img src={chevron} alt="chevron" className="w-4 h-4 ml-2" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Day"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedDay}
                onSelectionChange={(key) => setSelectedDay(key.toString())}
                className="max-h-40 overflow-y-auto"
              >
                {dayItems}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="capitalize border border-gray-300"
                  style={{ borderRadius: '5px', minWidth: '110px'}}
                >
                  <span>{selectedYear}</span>
                  <img src={chevron} alt="chevron" className="w-4 h-4 ml-9" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Year"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedYear}
                onSelectionChange={(key) => setSelectedYear(key.toString())}
                className="max-h-40 overflow-y-auto"
              >
                {yearItems}
              </DropdownMenu>
            </Dropdown>
          </div>
          {
            error !== "" && <p className="text-red-500 text-xs mt-2">{error}</p>
          }
          <Button onClick={handleNextPressed} radius="full" type="submit" className='bg-blue-500 hover:bg-blue-600 text-white'>Next</Button>
        </form>
      </Card>
  )
}

//the capture of the code sent to the email//but skip for now
const Flow2 = ({formData, setFormData, setFlowPage}:any) => {

  const handleNextPressed = (e: any) => {
    e.preventDefault();
    setFlowPage(3);
  }

  return (
    <Card shadow="sm" className="w-[400px] p-10">
        <div className="text-center">
          <img src={twitterLogo} alt="logo" className="w-14 mx-auto mb-2" />
          <h2 className="text-xl font-bold mb-4">We sent you a code</h2>
        </div>
        <p className="text-xs text-gray-600 mb-4">Enter it below to verify</p>
        <form className="w-full flex flex-col pt-2">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0">
            <Input 
              variant="underlined"
              type="text"
              placeholder="Enter code"
              value={formData.code}
              onChange={e => setFormData({ ...formData, code: e.target.value })}
              required
            />
          </div>
          <p className="text-xs text-blue-500 hover:underline mb-1">Didn't receive email?</p>
          <Button 
            variant="bordered"
            size="sm"
            style={{
              width: '100px',
              height: '50px',
              borderRadius: '10px',
              minWidth: '70px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',  
            }}
            className="capitalize border border-gray-300 mb-12"
          >
            <p className="text-gray-600 font-bold">Resend email</p>
          </Button>
          <Button onClick={handleNextPressed} radius="full" type="submit" className='bg-blue-500 hover:bg-blue-600 text-white'>Next</Button>
        </form>
      </Card>
  )
}

const Flow3 = ({formData, setFormData, setFlowPage}:any) => {

  const [isLoading, setIsLoading] = useState(false);

  const handleNextPressed = async(e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if(formData.password === "") return;
    const status = await signUpNewUser(formData);
    if(status === "error"){ 
      setIsLoading(false);
      console.log("Error signing up user");
      return;
    }
    setIsLoading(false);
    setFlowPage(4);
  }

  return (
    <Card shadow="sm" className="w-[400px] p-10">
        <div className="text-center">
          <img src={twitterLogo} alt="logo" className="w-14 mx-auto mb-2" />
          <h2 className="text-xl font-bold mb-6">You'll need a password</h2>
        </div>
        <form className="w-full flex flex-col gap-10 pt-2">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input 
              variant="underlined"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div >
          <p className="text-xs text-center mt-12">
            <span>
              By signing up you agree to the{' '}
              <a href="https://twitter.com/en/tos" className="text-blue-500 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="https://twitter.com/en/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              , including{' '}
              <a href="https://help.twitter.com/en/rules-and-policies/x-cookies" className="text-blue-500 hover:underline">
                Cookie Use
              </a>
            </span>
          </p>
          {
            isLoading ? (
              <Button onClick={handleNextPressed} radius="full" type="submit" className='bg-blue-500 hover:bg-blue-600 text-white' isLoading>
                Next
              </Button>
            )
            :
            <Button onClick={handleNextPressed} radius="full" type="submit" className='bg-blue-500 hover:bg-blue-600 text-white'>
              Next
            </Button>
          }
        </form>
      </Card>
  )
}

const Flow4 = ({formData, setFormData, setFlowPage}:any) => {

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function captureImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) return;
    setIsLoading(true);
    const selectedFile = e.target.files[0];
    setAvatar(selectedFile);

    // Display the uploaded image preview
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarURL(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);

    setFormData({ ...formData, avatar: selectedFile});
    setIsLoading(false);
  }

  const handleNextPressed = async(e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if(avatar !== null){
      await uploadProfile(avatar);
    }
    setIsLoading(false);
    setFlowPage(5);
  }

  return (
    <Card shadow="sm" className="w-[400px] p-10">
      <div className="text-center">
        <img src={twitterLogo} alt="logo" className="w-14 mx-auto mb-2" />
        <h2 className="text-xl font-bold mb-6">Pick a profile picture</h2>
        <p className="text-xs text-gray-600 mb-4">
          Have a favorite selfie? Upload it now.
        </p>
      </div>
      <form className="w-full flex flex-col gap-10 pt-2">
        {/* Circular container for image preview or placeholder */}
        <label htmlFor="avatar" className="cursor-pointer">
          <div className="flex justify-center items-center">
            <div className="w-36 h-36 rounded-full overflow-hidden border border-gray-300 flex justify-center items-center">
              {avatarURL ? (
                <img
                  src={avatarURL}
                  alt="uploaded-avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={defaultavater}
                  alt="default-avatar"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
          {/* Input for image upload */}
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={captureImage}
            className="hidden"
          />
        </label>
        {
          isLoading ? (
            <Button
              onClick={handleNextPressed}
              radius="full"
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              isLoading
            >
              Next
            </Button>
          )
          :
          <Button
            onClick={handleNextPressed}
            radius="full"
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Next
          </Button>

        }
      </form>
    </Card>
  )
}

const Flow5 = ({formData, setFormData, setFlowPage}:any) => {

  const [isLoading, setIsLoading] = useState(false);
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const generateUsernameSuggestions = () => {
    // Use userData to generate suggestions (Example: combining name and email)
    const suggestions: string[] = [
      formData.name.toLowerCase().replace(/\s+/g, '_') + Math.floor(Math.random() * 1000).toString(),
      formData.email.split('@')[0].toLowerCase() + Math.floor(Math.random() * 1000).toString(),
    ];
    setUsernameSuggestions(suggestions);
  };

  const handleNextPressed = async() => {
    if(formData.username === "") return;
    setIsLoading(true);
    const res = await updateUsername(formData.username);
    if(res === "Username updated successfully"){
      setIsLoading(false);
      setFlowPage(6);
    }
    else{
      setIsLoading(false);
      setError(res);
    }
  }

  return (
    <Card shadow="sm" className="w-[400px] p-10">
      <div className="text-center">
        <img src={twitterLogo} alt="logo" className="w-14 mx-auto mb-2" />
        <h2 className="text-xl font-bold mb-6">What should we call you?</h2>
      </div>
      <p className="text-xs text-gray-600 mb-4">
        Your @username is unique. You can always change it later.
      </p>
      <form className="w-full flex flex-col gap-10 pt-2">
        <div className="relative">
          <Input
            variant="underlined"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={e => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <div className="flex mt-2 flex-wrap">
            <a className="text-blue-500 cursor-pointer" onClick={() => setFormData({ ...formData, username: formData.name.toLowerCase().replace(/\s+/g, '_') })}>
              @{formData.name.toLowerCase().replace(/\s+/g, '_')},
            </a>
            &nbsp;
            <a className="text-blue-500 cursor-pointer" onClick={() => setFormData({ ...formData, username: formData.email.split('@')[0].toLowerCase() })}>
              @{formData.email.split('@')[0].toLowerCase()},
            </a>
            {
              usernameSuggestions.map((suggestion, index) => (
                <a key={index} className="text-blue-500 cursor-pointer" onClick={() => setFormData({ ...formData, username: suggestion })}>
                  &nbsp;@{suggestion},
                </a>
              ))
            }
          </div>
          {usernameSuggestions.length === 0 && 
            <a className="text-blue-500 cursor-pointer" onClick={generateUsernameSuggestions}>show more</a>}
          {
            error !== "" && <p className="text-red-500 text-xs mt-2">{error}</p>
          }
        </div>
        {
          isLoading ? (
            <Button
              onClick={handleNextPressed}
              radius="full"
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white mt-12"
              isLoading
            >
              Next
            </Button>
          )
          :
          <Button
              onClick={handleNextPressed}
              radius="full"
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white mt-12"
            >Next
          </Button>
        }
      </form>
    </Card>
  )
}

const Flow6 = () => {

  const navigate = useNavigate(); // Initialize useNavigate hook

  const suggestedUsers = [
    { name: "Tessa Engelbrecht", username: "@mp13ceo", bio: "Happy to be here!", profilePic: profile1 },
    { name: "Kyle Marshall", username: "@dreamerandrager", bio: "What even is a design?", profilePic: profile2 },
    { name: "Kumbirai Shonhiwa", username: "@ArisNeiman", bio: "Send me your bios please...", profilePic: profile3 }
  ];

  const handleNextPressed = () => {
    navigate("/home");
  }

  return (
    <Card shadow="sm" className="w-[400px] p-10">
      <div className="text-center">
        <img src={twitterLogo} alt="logo" className="w-14 mx-auto mb-2" />
        <h2 className="text-xl font-bold mb-4">Don't miss out</h2>
        <p className="text-xs text-gray-600 mb-4">
          When you follow someone, you'll see their Tweets in your Timeline. 
          You'll also get more relevant recommendations.
        </p>
        <h2 className="text-xl font-bold mb-8">Follow one or more accounts</h2>
      </div>
      <div className="flex flex-col gap-6">
        <RecommendedUsers users={[]}/>
      </div>
      <form className="w-full flex flex-col gap-10 pt-2">
        <Button
          onClick={handleNextPressed}
          radius="full"
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white mt-12"
        >
          Next
        </Button>
      </form>
    </Card>
  )
}

const SignUp = () => {
  const [formData, setFormData] = useState({ 
    name: "",
    email: "",
    password: "",
    dob: new Date(),
  });

  const [flowPage, setFlowPage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // this is neccessary for checking if the user is signed in
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      if (result) {
        navigate("/home"); // Redirect to home page if user is logged in
      }
    }
    
    // Call the async function
    checkUser();
  }, [navigate]);

  const DisplayPage = () => {
    if (flowPage === 1){
      return <Flow1 formData={formData} setFormData={setFormData} setFlowPage={setFlowPage}></Flow1>;
    }else if (flowPage === 2){
      return <Flow2 formData={formData} setFormData={setFormData} setFlowPage={setFlowPage}></Flow2>;
    } else if (flowPage === 3){
      return <Flow3 formData={formData} setFormData={setFormData} setFlowPage={setFlowPage}></Flow3>;
    }else if (flowPage === 4){
      return <Flow4 formData={formData} setFormData={setFormData} setFlowPage={setFlowPage}></Flow4>;
    }else if (flowPage === 5){
      return <Flow5 formData={formData} setFormData={setFormData} setFlowPage={setFlowPage}></Flow5>;
    }else if (flowPage === 6){
      return <Flow6/>;
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-white"> 
      {DisplayPage()}
    </div>
  );
};

export default SignUp;
