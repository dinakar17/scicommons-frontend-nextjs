import React, { useState } from 'react';

import Image from 'next/image';

import { IconArrowBackUp, IconThumbUp, IconThumbUpFilled } from '@tabler/icons-react';
import toast from 'react-hot-toast';

import { likeComment, postComment, unlikeComment } from '@/api/posts/posts';
import useIdenticon from '@/hooks/useIdenticons';
import { getRelativeTime } from '@/lib/helpers';
import { useAuthStore } from '@/stores/authStore';

import { Button, ButtonTitle } from '../ui/Button';

const Comment = ({ comment, addReply, commentLike, commentUnlike }) => {
  const [reply, setReply] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const imageData = useIdenticon(40);
  const [replyLoading, setReplyLoading] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);
  const axiosConfig = { headers: { Authorization: `Bearer ${accessToken}` } };

  const handleAddReply = async () => {
    if (!reply.trim()) return;
    setReplyLoading(true);
    const replyData = {
      comment: reply,
      parentComment: comment.id,
    };
    const res = await postComment(comment.postId.toString(), replyData, axiosConfig);
    if (res) {
      addReply(comment.id, res);
      setReply('');
      setReplyLoading(false);
      setShowReplyInput(false);
    }
  };

  const handleCommentLike = async () => {
    const res = await likeComment(comment.id.toString(), axiosConfig);
    if (res) {
      toast.success(res?.message);
      res?.status === 200 && commentLike(comment.id);
    }
  };

  const handleCommentUnlike = async () => {
    const res = await unlikeComment(comment.id.toString(), axiosConfig);
    if (res) {
      toast.success(res?.message);
      res?.status === 200 && commentUnlike(comment.id);
    }
  };

  return (
    <div className="ml-1 rounded-b-common-xl border-l border-common-contrast pl-1 md:ml-1 md:pl-1">
      <div className="my-2 rounded-common-lg bg-common-cardBackground p-4">
        <section className="flex items-center justify-between">
          <section className="flex items-center">
            <Image
              src={`data:image/png;base64,${imageData}`}
              width={32}
              height={32}
              alt="user"
              className="rounded-full border border-common-minimal"
            />
            <span className="ml-4 text-center text-sm font-bold text-text-primary hover:underline">
              {comment?.username}
            </span>
            <span className="text-sm text-text-tertiary">&nbsp;•&nbsp;</span>
            <span className="mt-0.5 text-center text-xs text-text-secondary">
              {getRelativeTime(comment?.createdAt)}
            </span>
          </section>
          <section className="flex items-center">
            <div
              className="flex cursor-pointer items-center whitespace-nowrap"
              onClick={() => {
                comment?.isLiked ? handleCommentUnlike() : handleCommentLike();
              }}
            >
              {comment.isLiked ? (
                <IconThumbUpFilled className="size-5 text-berry-base" />
              ) : (
                <IconThumbUp className="size-5 text-berry-base" />
              )}
              <span className="ml-2 text-xs font-semibold text-berry-base">{comment?.likes}</span>
            </div>
          </section>
        </section>
        <p className="mt-2 text-justify text-sm text-text-primary">{comment.comment}</p>
        <section className="flex items-center justify-end">
          <span className="mr-4 text-xs text-berry-contrast">
            {comment?.replies?.length} Replies
          </span>
          <button
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="flex items-center gap-2 rounded-full bg-berry-background px-3 py-2 text-sm hover:bg-berry-contrast"
          >
            <IconArrowBackUp className="size-4 text-berry-base" />
            <span className="text-xs text-berry-base">Reply</span>
          </button>
        </section>

        {showReplyInput && (
          <div className="my-2 flex w-full flex-col items-end">
            <textarea
              name="comment"
              id="comment-field"
              placeholder="Add Reply..."
              className="w-full rounded-common-lg border border-text-tertiary bg-common-background p-4 text-text-primary focus:border-berry-border focus:outline-none focus:ring-0"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              readOnly={replyLoading}
            />
            <Button
              onClick={handleAddReply}
              className="mt-2 flex items-center rounded-full bg-berry-base px-3 py-2 text-neutral-0"
              loading={replyLoading}
            >
              <ButtonTitle className="text-xs font-semibold text-neutral-0">Add Reply</ButtonTitle>
            </Button>
          </div>
        )}
      </div>
      {comment?.replies?.length > 0 && (
        <div className="pl-0">
          {comment?.replies?.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              addReply={addReply}
              commentLike={commentLike}
              commentUnlike={commentUnlike}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
