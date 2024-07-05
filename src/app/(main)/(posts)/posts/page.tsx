'use client';

import { Suspense, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { IconPlus } from '@tabler/icons-react';

import { fetchAllPosts } from '@/api/posts/posts';
import PostCard from '@/components/posts/PostCard';
import { Button, ButtonTitle } from '@/components/ui/Button';
import { Masonry } from '@/components/ui/Masonry';
import { useAuthStore } from '@/stores/authStore';

const PostsLoading = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-32 w-full animate-pulse rounded-common-xl bg-common-cardBackground"
        />
      ))}
    </div>
  );
};

const PostsContent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const hashtag = searchParams.get('hashtag');
  const accessToken = useAuthStore((state) => state.accessToken);
  const axiosConfig = { headers: { Authorization: `Bearer ${accessToken}` } };

  const getAllPosts = async () => {
    const res = await fetchAllPosts(hashtag, axiosConfig);
    setLoading(false);
    setPosts(res);
  };

  useEffect(() => {
    setLoading(true);
    getAllPosts();
  }, [hashtag]);

  if (loading) {
    return <PostsLoading />;
  }

  return posts.length > 0 ? (
    <>
      <div className="mt-10 grid w-full grid-cols-1 gap-4 md:hidden">
        {posts.map((post, index) => (
          <PostCard key={index} postData={post} />
        ))}
      </div>
      <div className="hidden w-full md:block">
        <Masonry columnsCount={2} gutter="gap-4">
          {posts.map((post, index) => (
            <PostCard key={index} postData={post} />
          ))}
        </Masonry>
      </div>
    </>
  ) : (
    <span className="absolute left-1/2 top-1/3 w-full -translate-x-1/2 -translate-y-1/2 text-center text-lg text-text-secondary">
      No posts found
    </span>
  );
};

const Posts = () => {
  const router = useRouter();

  return (
    <div className="container relative min-h-[calc(100vh-64px)] w-full space-y-4 bg-common-background px-4 py-8 md:px-16">
      <div className="flex w-full flex-row items-center justify-between pb-2">
        <span className="text-4xl font-bold text-text-primary">Posts</span>
        <Button
          className="rounded-common-lg bg-functional-green px-4 py-2"
          onClick={() => {
            router.push('/post/create');
          }}
        >
          <IconPlus className="mr-0.5 size-5 text-neutral-0" />
          <ButtonTitle className="text-base text-neutral-0">Post</ButtonTitle>
        </Button>
      </div>
      <Suspense fallback={<PostsLoading />}>
        <PostsContent />
      </Suspense>
    </div>
  );
};

export default Posts;
