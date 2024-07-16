import { useState, useEffect } from 'react';
import { Button, Link } from "@nextui-org/react";
import { FaTwitter } from 'react-icons/fa';
import GameResult from '@components/GameResults/GameResults';
import Confetti from 'react-confetti';
import './shake.css';
import {
  whoMadeThisTweetGame,
  getOldestFollowing,
  getNewestFollowing,
  countFollowing,
  matchAvatarGame
} from '@services/index';
import { getLoggedUserId } from '@services/index';
import { BeatLoader } from 'react-spinners';

const GamePlay = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [questionData, setQuestionData] = useState<any>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [shakeScreen, setShakeScreen] = useState<boolean>(false);
  const [followingCount, setFollowingCount] = useState<number>(0); 
  const [type, setType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchFollowingCount();
    };
    fetchData();
  }, []);
  
  const fetchFollowingCount = async () => {
    setIsLoading(true);
    try {
      const userId = await getLoggedUserId();
      console.log('game ID: ', userId);
      const count = await countFollowing(userId as unknown as string);
      console.log('game count: ', count);
      if (count !== undefined) {
        setFollowingCount(count);
        console.log('game following count: ', followingCount);
        startGame(count);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching following count:', error);
    }
  };
  
  const startGame = async (count: number) => {
    if (count >= 5) {
      await fetchQuestionData(); // Await here to ensure the question data is fetched before proceeding
    } else {
      alert('You need to follow at least 5 users to play the game.' + 'You are currently following ' + count + ' users.');
    }
  };
  

  const fetchQuestionData = async () => {
    try {
      setIsLoading(true);
      let questionFunction;
      let typeName; // Variable to store the type name
      switch (questionNumber) {
        case 0:
          questionFunction = whoMadeThisTweetGame;
          typeName = 'whoMadeThisTweetGame'; // Set the type name
          break;
        case 1:
          questionFunction = matchAvatarGame;
          typeName = 'matchAvatarGame'; // Set the type name
          break;
       /* case 2:
          questionFunction = whoMadeThisTweetonDateGame;
          typeName = 'whoMadeThisTweetonDateGame'; // Set the type name
          break;
         */ 
        case 2: //these two questions dont actually work correctly because it doesnt recognize the Followed_date in the Followers table.
          questionFunction = getOldestFollowing;
          typeName = 'getOldestFollowing'; // Set the type name
          break;
        case 3:
          questionFunction = getNewestFollowing;
          typeName = 'getNewestFollowing'; // Set the type name
          break;
        default:
          questionFunction = null;
          typeName = ''; // Set the type name to empty string for default case
      }
      if (questionFunction) {
        setType(typeName); // Set the type state
        const questionData = await questionFunction();
        console.log('game question data: ', questionData);
        setQuestionData(questionData);
      } else {
        setShowResult(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching question data:', error);
    }
  };
  

  const handleOptionChange = (option: string) => {
    if (!submitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      alert('Please select an answer.');
    } else {
      setSubmitted(true);
      setShowNext(true);
      const isCorrect = selectedOption === questionData.answer_user_id;
      setFeedback(isCorrect ? 'correct' : 'incorrect');
      if (isCorrect) {
        setCorrectCount(correctCount + 1);
      } else {
        setShakeScreen(true);
      }
    }
  };

  const handleNext = () => {
    console.log('game question number: ', questionNumber);
    if (questionNumber < 4) {
      setQuestionNumber(questionNumber + 1);
      setSelectedOption('');
      setShowNext(false);
      setFeedback(null);
      setSubmitted(false);
      setShakeScreen(false);
      fetchQuestionData();
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className={shakeScreen ? 'shake-screen w-full h-screen flex flex-col px-8' : 'w-full h-screen flex flex-col px-8'}>
      {isLoading ? (
      <div className="flex justify-center items-center h-full">
        <BeatLoader color="#1DA1F2" /> 
      </div>
    ) : (
      <> 
      {feedback === 'correct' && <Confetti width={window.outerWidth} height={window.outerHeight}/>}
      {!showResult && questionData && (
        <>
          <div className='flex justify-center'>
            <h2 className="py-6 text-3xl font-bold dark:text-white">
              Twivia
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <FaTwitter style={{ fontSize: '2rem', color: '#1DA1F2', marginBottom: '1rem' }} />
          </div>
          <div className="flex items-center justify-center font-bold dark:text-white">
            {questionData?.candidate_question?.question}<br/>
          </div>
          <div className="flex items-center justify-center pt-4 dark:text-white">
          {type === "matchAvatarGame" && questionData?.candidate_question?.randObj?.Img_Url && <img src={questionData?.candidate_question?.randObj?.Img_Url} className="w-8 h-8 rounded-full mr-2" />}
            </div>
          <div className="flex items-center justify-center dark:text-white">
          {questionData?.candidate_question?.randObj?.Content}
          </div>
          <div className="flex items-center justify-center">

          </div>

          <div className="mt-4 flex flex-col dark:text-white">
          {questionData?.list_options.map((option: any) => (
  <div
    key={option.User_Id}
    className={`flex items-center space-x-2 border rounded-full p-2 mt-2 mb-4 transition-transform transform-gpu ${selectedOption === option.User_Id && !submitted
      ? 'hover:scale-105 cursor-pointer border-sky-500'
      : submitted && option.User_Id === questionData.answer_user_id
        ? 'bg-white text-green-500 border-green-500'
        : submitted && selectedOption === option.User_Id
          ? 'bg-red-500 text-white border-white'
          : selectedOption !== option.User_Id && !submitted
            ? 'hover:scale-105 cursor-pointer border-gray-300'
            : ''
    }`}
    onClick={() => handleOptionChange(option.User_Id)}
  >
    <input
      type="radio"
      id={option.User_Id}
      value={option.User_Id}
      checked={selectedOption === option.User_Id}
      onChange={() => handleOptionChange(option.User_Id)}
      className="mr-2"
      disabled={submitted}
    />
    {type !== "matchAvatarGame" && option.Img_Url && <img src={option.Img_Url} alt={option.Username} className="w-8 h-8 rounded-full mr-2" />}
    <span className="text-base font-medium">{option.Username}</span>
  </div>
))}
          </div>
          {feedback !== null && (
            <div className='flex justify-center font-bold '>
              <p className={`text-lg ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                {feedback === 'correct' ? 'Correct!' : 'Incorrect!'}
                {feedback === 'correct' && <Confetti numberOfPieces={100} />}
              </p>
            </div>
          )}
          <div className="flex justify-center space-x-20 mb-4">
            <Link href="/twivia" className="mt-6">
              <Button className={`flex items-center space-x-2 border border-gray-300 rounded-full p-2 mt-2`}>
                Quit
              </Button>
            </Link>
            {showNext ? (
              <Link href="#" className="mt-6">
                <Button className={`flex items-center space-x-2 border border-gray-300 rounded-full p-2 mt-2`} onClick={handleNext}>
                  Next
                </Button>
              </Link>
            ) : (
              <Link href="#" className="mt-6">
                <Button className={`flex items-center space-x-2 border border-gray-300 rounded-full p-2 mt-2`} onClick={handleSubmit}>
                  Submit
                </Button>
              </Link>
            )}
          </div>
        </>
      )}
      {showResult && (
        <GameResult correctCount={correctCount} />
      )}
      </>
    )}
    </div>
  );  
};

export default GamePlay;
