// File path: /pages/PostPage.tsx
'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { IconMessage, IconThumbUp, IconThumbUpFilled } from '@tabler/icons-react';
import toast from 'react-hot-toast';

import { getPostById, getPostByUser, likePost, postComment, unlikePost } from '@/api/posts/posts';
import Comment from '@/components/posts/Comment';
import Hashtag from '@/components/posts/Hashtag';
import { Button, ButtonTitle } from '@/components/ui/Button';
import useIdenticon from '@/hooks/useIdenticons';
import { getRelativeTime } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';

// File path: /pages/PostPage.tsx

// File path: /pages/PostPage.tsx

// File path: /pages/PostPage.tsx

// File path: /pages/PostPage.tsx

interface CommentType {
  id: string;
  body: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies: CommentType[];
  [key: string]: any;
}

interface PostType {
  id: string;
  username: string;
  body: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  comments: CommentType[];
  hashtags: string[];
  [key: string]: any;
}

interface TopPostType {
  id: string;
  username: string;
  body: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  comments: number;
  hashtags: string[];
  [key: string]: any;
}

const Page: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [newComment, setNewComment] = useState('');
  const imageData = useIdenticon(40);
  const [loading, setLoading] = useState(true);
  const [topPostsByUser, setTopPostsByUser] = useState<TopPostType[]>([]);
  const accessToken = useAuthStore((state) => state.accessToken);
  const router = useRouter();
  const axiosConfig = { headers: { Authorization: `Bearer ${accessToken}` } };
  const [userRecentPostsLoading, setUserRecentPostsLoading] = useState(true);
  const [commentSubmitLoading, setCommentSubmitLoading] = useState(false);

  const handlePostLike = async () => {
    const res = await likePost(postId, axiosConfig);
    if (res.status === 200) {
      toast.success(res.message);
      setPost((prevState) => ({
        ...prevState!,
        likes: prevState!.likes + 1,
        isLiked: true,
      }));
    }
  };

  const handlePostUnlike = async () => {
    const res = await unlikePost(postId, axiosConfig);
    if (res.status === 200) {
      toast.success(res.message);
      setPost((prevState) => ({
        ...prevState!,
        likes: prevState!.likes - 1,
        isLiked: false,
      }));
    }
  };

  const addReply = async (parentId: string, reply: CommentType) => {
    const addNestedReply = (
      comments: CommentType[],
      parentId: string,
      newReply: CommentType
    ): CommentType[] => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: addNestedReply(comment.replies, parentId, newReply),
          };
        }
        return comment;
      });
    };

    setPost((prevState) => ({
      ...prevState!,
      comments: addNestedReply(prevState!.comments, parentId, reply),
    }));
  };

  const handleGetUserPosts = async (username: string) => {
    const res = await getPostByUser(username, axiosConfig);
    setTopPostsByUser(res);
    setUserRecentPostsLoading(false);
  };

  const getPostData = async () => {
    const res = await getPostById(postId, axiosConfig);
    setPost(res);
    setLoading(false);
    handleGetUserPosts(res?.username);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setCommentSubmitLoading(true);
    const commentData = {
      comment: newComment,
      parentComment: null,
    };
    const res = await postComment(postId, commentData, axiosConfig);
    if (res) {
      setPost((prevState) => ({
        ...prevState!,
        comments: [...prevState!.comments, res],
      }));
      setNewComment('');
      setCommentSubmitLoading(false);
    }
  };

  const commentLike = async (commentId: string) => {
    const addLikeToComment = (comments: CommentType[], commentId: string): CommentType[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.likes + 1,
            isLiked: true,
          };
        }
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: addLikeToComment(comment.replies, commentId),
          };
        }
        return comment;
      });
    };

    setPost((prevState) => ({
      ...prevState!,
      comments: addLikeToComment(prevState!.comments, commentId),
    }));
  };

  const commentUnlike = async (commentId: string) => {
    const removeLikeFromComment = (comments: CommentType[], commentId: string): CommentType[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.likes - 1,
            isLiked: false,
          };
        }
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: removeLikeFromComment(comment.replies, commentId),
          };
        }
        return comment;
      });
    };

    setPost((prevState) => ({
      ...prevState!,
      comments: removeLikeFromComment(prevState!.comments, commentId),
    }));
  };

  useEffect(() => {
    getPostData();
  }, []);

  if (loading)
    return (
      <section className="mx-auto flex w-full max-w-[1024px] flex-col p-4 md:p-16">
        <div className="flex w-full flex-col items-center">
          <div className="flex h-32 w-full flex-col gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-32 w-full animate-pulse rounded-lg bg-slate-950/10" />
            ))}
          </div>
          <div className="mt-4 grid w-full grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="aspect-4/3 w-full animate-pulse rounded-lg bg-slate-950/10"
              />
            ))}
          </div>
        </div>
        <div className="my-4 h-10 w-full animate-pulse rounded-lg bg-slate-950/10" />
        <div className="mt-10 h-10 w-44 animate-pulse rounded-lg bg-slate-950/10" />
        <div className="mt-4 w-full border-l-2 border-common-contrast pl-2">
          <div className="mt-10 h-32 w-full animate-pulse rounded-lg bg-slate-950/10" />
          <div className="mt-4 w-full border-l-2 border-common-contrast pl-2">
            <div className="mt-10 h-32 w-full animate-pulse rounded-lg bg-slate-950/10" />
            <div className="mt-4 w-full border-l-2 border-common-contrast pl-2">
              <div className="mt-10 h-32 w-full animate-pulse rounded-lg bg-slate-950/10" />
            </div>
          </div>
        </div>
        <div className="mt-4 w-full border-l-2 border-common-contrast pl-2">
          <div className="mt-10 h-32 w-full animate-pulse rounded-lg bg-slate-950/10" />
        </div>
      </section>
    );

  return (
    <div className="grid h-[calc(100vh-64px)] w-full grid-cols-1 lg:grid-cols-[1fr_500px]">
      <section className="mx-auto flex h-full w-full max-w-[1024px] flex-col bg-common-background p-0 md:p-10">
        <section className="flex h-fit flex-row justify-between rounded-common-xl bg-common-cardBackground p-4 shadow-common">
          <section className="h-full w-fit pr-4">
            <Image
              src={`data:image/png;base64,${imageData}`}
              width={40}
              height={40}
              alt="user"
              className="rounded-full border border-common-minimal"
            />
          </section>
          <div className="flex w-full flex-col">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-center text-base font-bold text-text-primary hover:underline">
                    {post?.username}
                  </span>
                  <span className="text-text-tertiary">&nbsp;•&nbsp;</span>
                  <span className="mt-0.5 text-center text-xs text-text-secondary">
                    {getRelativeTime(post?.createdAt)}
                  </span>
                </div>
                <span className="mt-1 h-fit w-full pr-4 text-justify text-base text-text-primary">
                  {post?.body}
                </span>
                <div className="mt-2 flex max-w-full flex-wrap">
                  {post?.hashtags.map((hashtag, index) => {
                    return <Hashtag key={index} hashtag={hashtag} className="text-base" />;
                  })}
                </div>
              </div>
            </div>
            {/* {postData?.imageUrl && ( */}
            {/* <div
              className="mx-auto flex w-full max-w-[720px] items-center justify-center"
              style={{
                aspectRatio: '4/3',
              }}
            >
              <img
                src={
                  'https://images.unsplash.com/photo-1577537500263-da8814d8e040?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
                alt="Article Image"
                className="rounded-lg"
              />
            </div> */}
            {/* )} */}
          </div>
        </section>
        <section className="p-4">
          <div className="flex items-center space-x-4 border-b border-t border-common-minimal py-2">
            <div
              className={cn(
                'flex cursor-pointer items-center whitespace-nowrap rounded-full px-3 py-2 hover:bg-berry-background',
                {
                  'bg-berry-background': post?.isLiked,
                }
              )}
              onClick={() => {
                post?.isLiked ? handlePostUnlike() : handlePostLike();
              }}
            >
              {post?.isLiked ? (
                <IconThumbUpFilled className="size-5 text-berry-base" />
              ) : (
                <IconThumbUp className="size-5 text-berry-base" />
              )}
              <span className="ml-2 text-sm font-semibold text-functional-blue">{post?.likes}</span>
              <span className="ml-1 text-sm text-functional-blue">Likes</span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <IconMessage className="size-5 text-text-secondary" />
              <span className="ml-2 text-sm font-semibold text-text-secondary">
                {post?.comments.length}
              </span>
              <span className="ml-1 text-sm text-text-secondary">Comments</span>
            </div>
          </div>
        </section>
        <section className="flex w-full flex-col p-4">
          <span className="text-2xl font-semibold text-text-primary">
            Comments {`(${post?.comments.length})`}
          </span>
          <div className="my-4 flex w-full flex-col items-end">
            <textarea
              name="comment"
              id="comment-field"
              placeholder="Add a comment"
              className="w-full rounded-common-lg border border-text-tertiary bg-common-cardBackground p-4 text-text-primary focus:border-green-600 focus:outline-none focus:ring-0"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              readOnly={commentSubmitLoading}
            />
            <Button
              onClick={handleAddComment}
              className="mt-2 rounded-full bg-functional-green px-4"
              loading={commentSubmitLoading}
            >
              <ButtonTitle className="text-sm font-normal text-neutral-0">Add Comment</ButtonTitle>
            </Button>
          </div>
          {post?.comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              addReply={addReply}
              commentLike={commentLike}
              commentUnlike={commentUnlike}
            />
          ))}
        </section>
      </section>
      <section className="sticky top-0 hidden min-h-full w-full border-l border-common-minimal bg-common-background p-8 lg:flex lg:flex-col">
        <div className="flex w-full flex-col gap-2">
          <span className="text-sm text-text-secondary">Top Posts by this user:</span>
          <div className="flex w-full flex-col gap-4">
            {!userRecentPostsLoading
              ? topPostsByUser &&
                topPostsByUser.map((post, index) => (
                  <div
                    key={index}
                    className="flex w-full cursor-pointer flex-col gap-2 rounded-common-xl border-common-minimal bg-common-cardBackground p-4 shadow-common"
                    onClick={() => {
                      router.push(`/post/${post?.id}`);
                    }}
                  >
                    <span className="w-full text-sm text-text-primary">{post?.body}</span>
                    {post?.hashtags && (
                      <div className="flex w-full flex-wrap">
                        {post?.hashtags.map((hashtag, index) => (
                          <Hashtag key={index} hashtag={hashtag} />
                        ))}
                      </div>
                    )}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center whitespace-nowrap">
                        {post?.isLiked ? (
                          <IconThumbUpFilled className="size-4 text-berry-base" />
                        ) : (
                          <IconThumbUp className="size-4 text-berry-base" />
                        )}
                        <span className="ml-1 text-xs font-semibold text-functional-blue">
                          {post?.likes}
                        </span>
                      </div>
                      <div className="flex items-center whitespace-nowrap">
                        <IconMessage className="size-4 text-text-secondary" />
                        <span className="ml-1 text-xs font-semibold text-text-secondary">
                          {post?.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              : Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-col gap-2 rounded-common-lg border-common-minimal bg-common-cardBackground p-4 shadow-common"
                  >
                    <span className="h-3 w-full animate-pulse rounded-full bg-slate-200" />
                    <span className="h-3 w-full animate-pulse rounded-full bg-slate-200" />
                    <span className="h-3 w-full animate-pulse rounded-full bg-slate-200" />
                  </div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
