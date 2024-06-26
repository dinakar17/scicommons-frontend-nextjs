import { FC, useState } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MessageCircle, Pencil, ThumbsDown, ThumbsUp } from 'lucide-react';

import { ReviewSchema } from '@/api/schemas';

import ReviewForm from './ReviewForm';

interface ReviewCardProps {
  review: ReviewSchema;
  refetch?: () => void;
}

const ReviewCard: FC<ReviewCardProps> = ({ review, refetch }) => {
  // Extend dayjs with the relativeTime plugin
  dayjs.extend(relativeTime);

  const [edit, setEdit] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<number>(0);

  const currentVersion =
    selectedVersion === 0
      ? {
          rating: review.rating,
          content: review.content,
          subject: review.subject,
          edited_at: review.updated_at,
        }
      : review.history[selectedVersion - 1];

  return (
    <>
      {edit ? (
        <ReviewForm
          reviewId={review.id}
          articleId={review.article_id}
          edit={edit}
          setEdit={setEdit}
          title={currentVersion.subject}
          content={currentVersion.content}
          rating={currentVersion.rating}
          refetch={refetch}
        />
      ) : (
        <div className="mb-4 rounded-lg border p-4 shadow-sm">
          <div className="mb-2 flex justify-between">
            <div>
              <span className="flex items-center gap-2 font-bold">
                by {'Anyonymous'}
                {review.is_author && (
                  <Pencil
                    size={16}
                    onClick={() => setEdit(!edit)}
                    className="cursor-pointer hover:text-green-500"
                  />
                )}
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < currentVersion.rating ? 'text-green-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.287 3.948a1 1 0 00.95.69h4.193c.969 0 1.371 1.24.588 1.81l-3.39 2.463a1 1 0 00-.364 1.118l1.287 3.948c.3.921-.755 1.688-1.54 1.118l-3.39-2.463a1 1 0 00-1.175 0l-3.39 2.463c-.785.57-1.84-.197-1.54-1.118l1.287-3.948a1 1 0 00-.364-1.118L2.222 9.375c-.784-.57-.38-1.81.588-1.81h4.193a1 1 0 00.95-.69l1.287-3.948z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="">
                <select
                  id="version-select"
                  value={selectedVersion}
                  onChange={(e) => setSelectedVersion(parseInt(e.target.value))}
                  className="rounded border-gray-300 p-1"
                >
                  <option value={0}>Latest</option>
                  {review.history.map((version, index) => (
                    <option key={index + 1} value={index + 1}>
                      {dayjs(version.edited_at).format('MMM D, YYYY ')}
                    </option>
                  ))}
                </select>
              </div>
              ({dayjs(currentVersion.edited_at).fromNow()})
            </div>
          </div>
          <h3 className="mb-2 text-lg font-semibold">{currentVersion.subject}</h3>
          <div
            className="mb-4 text-gray-700"
            dangerouslySetInnerHTML={{
              __html: currentVersion.content,
            }}
          />
          <div className="flex items-center justify-between">
            <div className="flex space-x-4 text-gray-500">
              <div className="flex items-center">
                <ThumbsUp className="mr-1 h-4 w-4" />
                <span>{100}</span>
              </div>
              <div className="flex items-center">
                <ThumbsDown className="mr-1 h-4 w-4" />
                <span>{0}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="flex items-center">
                <MessageCircle className="mr-1 h-4 w-4" />
                <span>{10} replies</span>
              </div>
              <button className="rounded bg-blue-500 px-3 py-1 font-semibold text-white">
                Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;

export const ReviewCardSkeleton: FC = () => {
  return (
    <div className="mb-4 animate-pulse rounded-lg border p-4 shadow-sm">
      <div className="mb-2 flex justify-between">
        <div>
          <div className="h-4 w-24 rounded bg-gray-300"></div>
          <div className="mt-2 flex items-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="mr-1 h-4 w-4 rounded bg-gray-300"></div>
            ))}
          </div>
        </div>
        <div className="h-4 w-32 rounded bg-gray-300"></div>
      </div>
      <div className="mb-2 h-6 w-48 rounded bg-gray-300"></div>
      <div className="mb-4 h-20 rounded bg-gray-300"></div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-4 text-gray-500">
          <div className="flex items-center">
            <div className="mr-1 h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-6 rounded bg-gray-300"></div>
          </div>
          <div className="flex items-center">
            <div className="mr-1 h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-6 rounded bg-gray-300"></div>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="flex items-center">
            <div className="mr-1 h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-12 rounded bg-gray-300"></div>
          </div>
          <div className="h-8 w-20 rounded bg-blue-300"></div>
        </div>
      </div>
    </div>
  );
};
