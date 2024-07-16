import React, { useState } from "react";
import { Button, Link } from "@nextui-org/react";
import { GamePlay } from "@components/index";
import { FaTwitter } from 'react-icons/fa';


interface TwiviaProps { }

const Twivia: React.FC<TwiviaProps> = () => {
  

  const [showGamePlay, setShowGamePlay] = useState(false);

  const handlePlay = () => {
    setShowGamePlay(true);
  };

  /* useEffect(() => { 
    // this is necessary for checking if the user is signed in
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      if (!result) {
        navigate("/home"); // Redirect to home page if user is not logged in
      }
    };
    checkUser();
  }, [navigate]); */

  return (
    <div className="w-full h-full flex justify-center align-middle bg-inherit">
          <div className="w-full flex flex-col items-center justify-center">
            {!showGamePlay ? (
              <>
                <h1 style={{ fontSize: '3vw', background: '#1DA1F2', WebkitBackgroundClip: 'text', marginBottom: '1rem', fontWeight: 650 }} className="dark:text-white">
                  Welcome to Twivia!
                </h1>
                <FaTwitter style={{ fontSize: '2rem', color: '#1DA1F2', marginBottom: '1rem' }} />
                <p style={{ fontSize: '1rem', marginBottom: '0rem', color: "GrayText" }}>Where Twitter meets Trivia! How well do you know your followers?</p>
                <p style={{ fontSize: '1rem', marginBottom: '1rem', color: "GrayText" }}>Press Play to find out...</p>
                <Button
                  size="lg"
                  className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 bg-sky-500`}
                  onClick={handlePlay}
                  style={{ fontWeight: 600, color: '#FFFFFF' }}
                >
                  Play
                </Button>
                <Link href="/home" className="mt-4 text-sm">
                  Back to Home
                </Link>
              </>
            ) : (
              <GamePlay />
            )}
          </div>
        </div>
  );
};

export default Twivia;
