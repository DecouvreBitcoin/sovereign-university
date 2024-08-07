import { MdThumbDown, MdThumbUp } from 'react-icons/md';

import type { JoinedTutorialLight } from '@blms/types';
import { cn } from '@blms/ui';

export const TutorialLikes = ({
  tutorial,
}: {
  tutorial: JoinedTutorialLight;
}) => {
  return (
    <div className="flex gap-1 items-center">
      <span className="text-black label-large-20px">{tutorial.likeCount}</span>
      <div className="flex items-center">
        <MdThumbUp className="text-brightGreen-1 size-6 mx-1" />
        <div
          className={cn(
            'w-[70px] rounded-full h-2 mx-2',
            tutorial.likeCount === 0 &&
              tutorial.dislikeCount === 0 &&
              'bg-newGray-3',
          )}
          style={
            tutorial.likeCount > 0 || tutorial.dislikeCount > 0
              ? {
                  background: `linear-gradient(to right, #19c315 ${(tutorial.likeCount / (tutorial.likeCount + tutorial.dislikeCount)) * 100}%, #e00000 ${(tutorial.likeCount / (tutorial.likeCount + tutorial.dislikeCount)) * 100}%)`,
                }
              : {}
          }
        />
        <MdThumbDown className="text-red-1 size-6 mx-1" />
      </div>
      <span className="text-black label-large-20px">
        {tutorial.dislikeCount}
      </span>
    </div>
  );
};
