import { useState, useEffect } from 'react';
// import { mockTrending } from '../../mockData/mockData';
import { MdOutlineMoreHoriz } from "react-icons/md";
import { getTrendingTopics } from '@services/index';
// import { useNavigate } from 'react-router-dom'; 


interface Topic {
  Tag_Id: string;
  Tag_Name: string;
  tweet_count: number;
  onNavigate: any;
}

const formatCount = (count: number): string | number => {
  if (count < 1000) {
  return count; // Return as it is if less than 1000
  } else if (count < 1000000) {
  // Convert to K format
  return (count / 1000).toFixed(1) + "K";
  } else {
  // Convert to M format
  return (count / 1000000).toFixed(1) + "M";
  }
};


    
const TrendingList: React.FC<Topic> = ({ onNavigate }) => {
  const [topics, setTopics] = useState<any[]>([]);
  // const navigate = useNavigate();
  const handleTopicClick = (topicName: string) => {
    onNavigate(`/explore/${topicName}`); // Call the passed navigation function
  };

  useEffect(() => {
    const fetchTagsData = async () => {
      try {
        const tagsData = await getTrendingTopics();
        setTopics(tagsData);
        // console.log(tagsData);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    }
    fetchTagsData();
  }, []);

  // const handleTopicClick = (topicName: string) => {
  //   navigate(`/explore/${topicName}`);
  // };

  return (
    <div>
        {topics.slice(0, 5).map((topic: Topic) => (
        <div key={topic.Tag_Id} className="tagItem items-center cursor-pointer justify-between p-3 hover:bg-gray-100 dark:hover:bg-neutral-900" onClick={() => handleTopicClick(topic.Tag_Name)}>
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] font-medium">#{topic.Tag_Name}</h3>
            <div className="h-10 w-10 flex justify-center rounded-full align-middle items-center hover:text-sky-600p-0 m-0 cursor-pointer">
                {/* <MdOutlineMoreHoriz size={20}/> */}
            </div>
          </div>
        <p className="text-[13.5px] text-gray-500 -mt-1">{formatCount(topic.tweet_count)} posts</p>
        </div>
      ))} 
    </div>  
  )
};

export default TrendingList;