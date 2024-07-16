import {Skeleton} from "@nextui-org/react";

const TopicSkeleton = () => {
  return (
    <div className="topic w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
      <div className="flex-col w-full pl-2">
        <div className="user-info flex-col pt-2">
            <Skeleton className="h-3 w-3/5 rounded-lg p-0 m-0"/>
            <Skeleton className="h-3 w-4/5 rounded-lg mt-2"/>
        </div>
      </div>
    </div>
    
  )
}

export default TopicSkeleton