import React from 'react';
import { Button, Link } from "@nextui-org/react";
import { FaTwitter } from 'react-icons/fa';

interface GameResultProps {
  correctCount: number;
}

interface EmojiData {
  name: string;
  emoji: string;
}

const emojiData: EmojiData[] = [
  { name: 'Stalker', emoji: 'images/busts_in_silhouette.png' },
  { name: 'Day One', emoji: 'images/handshake.png' },
  { name: 'Classic Old Pal', emoji: 'images/slightly_smiling_face.png' },
  { name: 'Bad Friend', emoji: 'images/skull.png' },
  { name: 'Removed Acquaintance', emoji: 'images/bust_in_silhouette.png' },
  { name: 'Stranger', emoji: 'images/question.png' },
];

function getSkillLevel(score: number) {
  if (score >= 100) {
    return { level: 'Stalker', text: 'There\'s grass that needs touching' };
  } else if (score >= 80) {
    return { level: 'Day One', text: 'You give good birthday gifts.' };
  } else if (score >= 60) {
    return { level: 'Classic Old Pal', text: 'A dependable side character in your friends\' lives.' };
  } else if (score >= 40) {
    return { level: 'Bad Friend', text: 'Your friends told us to tell you that they\'re disappointed.' };
  } else if (score >= 20) {
    return { level: 'Removed Acquaintance', text: 'We recommend that you actually get to know your friends.' };
  } else {
    return { level: 'Stranger', text: 'Do you even know any of these people... Do they know YOU?!' };
  }
}

const getColor = (percentage: number) => {
  if (percentage >= 100) return 'green';
  if (percentage >= 80) return 'lightgreen';
  if (percentage >= 60) return 'yellowgreen';
  if (percentage >= 40) return 'yellow';
  if (percentage >= 20) return 'orange';
  return 'red';
};

const GameResult: React.FC<GameResultProps> = ({ correctCount }) => {
  const percentage = Math.round((correctCount / 5) * 100); //just manually made this 5 because somewhere totalquestions is not correctly updating
  const { level, text } = getSkillLevel(percentage);
  const emoji = emojiData.find(e => e.name === level);

  return (
    <div className="w-full h-screen flex flex-col px-8">
      <div className='flex justify-center'>
        <h2 className="py-6 text-3xl font-bold dark:text-white">
          Twivia
        </h2>
      </div>
      <div className="flex items-center justify-center">
        <FaTwitter style={{ fontSize: '2rem', color: '#1DA1F2', marginBottom: '1rem' }} />
      </div>
      <h2 className="text-xl font-bold dark:text-white">
        Your result:
      </h2>
      <h1 className="text-8xl font-bold mb-2" style={{ color: getColor(percentage) }}>
        {percentage}%
      </h1>
      <div className="font-bold text-xl flex items-center justify-center py-3">
        <h2 className="mb-2 dark:text-white">
          Your skill level is:
        </h2>
      </div>
        <h2 className="text-center text-2xl font-bold tracking-widest" style={{ color: '#1DA1F2' }}>
          {level.toUpperCase()}
        </h2>
      <div className="flex items-center justify-center py-4">
        {emoji && <img src={emoji.emoji} alt={emoji.name} style={{ width: '60px', height: '60px' }} />}
      </div>
      <div className="flex flex-col items-center space-y-2 mt-1">
        <p className="dark:text-white">
          {text}
        </p>
      </div>
      <div className='flex justify-center'>
        <Link href="/twivia" className="mt-6">
        <Button className={`flex items-center space-x-2 border border-gray-300 rounded-full p-2 mt-2`}>
            Play Again
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GameResult;