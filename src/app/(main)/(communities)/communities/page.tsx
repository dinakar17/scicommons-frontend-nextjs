'use client';

import { useCommunitiesApiListCommunities } from '@/api/communities/communities';
import SearchBar from '@/components/SearchBar';
import EmptyState from '@/components/common/EmptyState';
import CommunityCard, { CommunityCardSkeleton } from '@/components/communities/CommunityCard';

const Communities = () => {
  const { data, isPending } = useCommunitiesApiListCommunities();
  return (
    <div className="container mx-auto min-h-screen space-y-4 p-4">
      <SearchBar />
      <div className="flex flex-col space-y-4">
        {isPending &&
          Array.from({ length: 5 }, (_, index) => <CommunityCardSkeleton key={index} />)}
        {data && data.data.items.length === 0 && (
          <EmptyState
            content="No Communities Found"
            subcontent="No communities found. Please try again later."
          />
        )}
        {data &&
          data.data.items.map((community, index) => (
            <CommunityCard
              key={index}
              imageUrl={community.profile_pic_url || '/auth/register.png'}
              title={community.name}
              description={community.description}
              membersCount={community.num_members}
              articlesCount={community.num_published_articles}
            />
          ))}
      </div>
    </div>
  );
};

export default Communities;
