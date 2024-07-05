'use client';

import { FC } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { IconMessage, IconThumbUp, IconThumbUpFilled } from '@tabler/icons-react';

import useIdenticon from '@/hooks/useIdenticons';
import { getRelativeTime } from '@/lib/helpers';

import Hashtag from './Hashtag';

interface PostCardProps {
  postData: {
    id: number;
    body: string;
    likes: number;
    isLiked: boolean;
    comments: number;
    createdAt: string;
    imageUrl?: string;
    username: string;
    hashtags: string[];
  };
}

const PostCard: FC<PostCardProps> = ({ postData }) => {
  const router = useRouter();
  const imageData = useIdenticon(40);
  return (
    <div
      className="flex h-fit cursor-pointer flex-row justify-between rounded-common-xl border-common-minimal bg-common-cardBackground p-4 shadow-common"
      onClick={() => {
        router.push(`/post/${postData?.id}`);
      }}
    >
      <section className="h-full w-fit pr-4">
        <Image
          src={`data:image/png;base64,${imageData}`}
          width={40}
          height={40}
          alt="user"
          className="rounded-full border border-common-minimal"
        />
      </section>
      <div className="grid w-full grid-cols-[1fr_100px] justify-between md:grid-cols-[1fr_160px]">
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-center text-base font-bold text-text-primary hover:underline">
                {postData?.username}
              </span>
              <span className="text-text-tertiary">&nbsp;•&nbsp;</span>
              <span className="mt-0.5 text-center text-xs text-text-secondary">
                {getRelativeTime(postData?.createdAt)}
              </span>
            </div>
            <span className="mt-1 h-fit w-full pr-4 text-justify text-base text-text-primary">
              {postData?.body}
            </span>
          </div>
          <div className="flex w-full flex-col">
            <div className="flex max-w-full flex-wrap">
              {postData?.hashtags.map((hashtag, index) => {
                return <Hashtag key={index} hashtag={hashtag} className="text-base" />;
              })}
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center whitespace-nowrap">
                {postData?.isLiked ? (
                  <IconThumbUpFilled className="size-5 text-berry-base" />
                ) : (
                  <IconThumbUp className="size-5 text-berry-base" />
                )}
                <span className="ml-1 text-sm font-semibold text-functional-blue">
                  {postData?.likes}
                </span>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <IconMessage className="size-5 text-text-secondary" />
                <span className="ml-1 text-sm font-semibold text-text-secondary">
                  {postData?.comments}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* {postData?.imageUrl && ( */}
        {/* <div className="flex h-full w-full items-center justify-center">
          <Image
            // src={postData?.imageUrl}
            src={'https://source.unsplash.com/random/400x401'}
            alt="Article Image"
            width={140}
            height={140}
            className="rounded-lg"
          />
        </div> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default PostCard;
