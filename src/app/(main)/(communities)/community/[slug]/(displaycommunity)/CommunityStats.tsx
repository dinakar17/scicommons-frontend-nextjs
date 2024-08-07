import { FileText, UserCheck, Users } from 'lucide-react';

import { CommunityOut } from '@/api/schemas';

interface CommunityStatsProps {
  community: CommunityOut;
}

const CommunityStats: React.FC<CommunityStatsProps> = ({ community }) => {
  return (
    <div className="rounded-md bg-white p-4 shadow-md dark:bg-gray-800 dark:shadow-gray-700/50">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
        Community Stats
      </h2>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <Users className="mr-2 h-5 w-5" />
          <span>{community.num_members} Members</span>
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <FileText className="mr-2 h-5 w-5" />
          <span>Published {community.num_published_articles} Articles so far</span>
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <UserCheck className="mr-2 h-5 w-5" />
          <span>
            {community.num_moderators} Moderators & {community.num_reviewers} Reviewers
          </span>
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <FileText className="mr-2 h-5 w-5" />
          <span>{community.num_articles} articles have been reviewed</span>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;

export const CommunityStatsSkeleton: React.FC = () => {
  return (
    <div className="rounded-md bg-white p-4 shadow-md dark:bg-gray-800 dark:shadow-gray-700/50">
      <h2 className="mb-4 h-6 w-1/2 animate-pulse bg-gray-300 dark:bg-gray-600"></h2>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <div className="mr-2 h-5 w-5 animate-pulse bg-gray-300 dark:bg-gray-600"></div>
          <span className="h-5 w-24 animate-pulse bg-gray-300 dark:bg-gray-600"></span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-5 w-5 animate-pulse bg-gray-300 dark:bg-gray-600"></div>
          <span className="h-5 w-36 animate-pulse bg-gray-300 dark:bg-gray-600"></span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-5 w-5 animate-pulse bg-gray-300 dark:bg-gray-600"></div>
          <span className="h-5 w-40 animate-pulse bg-gray-300 dark:bg-gray-600"></span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-5 w-5 animate-pulse bg-gray-300 dark:bg-gray-600"></div>
          <span className="h-5 w-32 animate-pulse bg-gray-300 dark:bg-gray-600"></span>
        </div>
      </div>
    </div>
  );
};
