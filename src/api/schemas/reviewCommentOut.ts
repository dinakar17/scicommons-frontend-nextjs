/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * MyApp API
 * OpenAPI spec version: 1.0.0
 */
import type { ReviewCommentOutId } from './reviewCommentOutId';
import type { UserOut } from './userOut';

export interface ReviewCommentOut {
  author: UserOut;
  content: string;
  created_at: string;
  id?: ReviewCommentOutId;
  is_author?: boolean;
  replies: ReviewCommentOut[];
  upvotes: number;
}