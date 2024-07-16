import React from "react";
// import { supabase } from "@config/supabase";
import {Card, CardHeader} from "@nextui-org/react";
import TrendingList from "@components/TrendingList/TrendingList";


const TrendingTopics = ({ onNavigate }) => {

  return (
    <div>
      <Card className="bg-inherit shadow-none w-11/12 border dark:border-neutral-800">
        <CardHeader className="flex gap-1 pb-0">
          <h2 className="text-lg font-bold mb-4">Trending Topics</h2>
        </CardHeader>
        <TrendingList onNavigate={onNavigate} />
      </Card>          
    </div>
  );
};

export default TrendingTopics;
