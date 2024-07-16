import {Skeleton} from "@nextui-org/react";

const TweetSkeleton = () => {
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12"/>
      </div>  
      <div className="flex-col w-full pl-2">
        <div className="user-info flex-col pt-2">
            <Skeleton className="h-3 w-3/5 rounded-lg p-0 m-0"/>
            <Skeleton className="h-3 w-4/5 rounded-lg mt-2"/>
        </div>
      </div>
    </div>
    
  )
}

export default TweetSkeleton