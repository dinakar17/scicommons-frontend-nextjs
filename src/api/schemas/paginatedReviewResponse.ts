/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * MyApp API
 * OpenAPI spec version: 1.0.0
 */
import type { ReviewSchema } from './reviewSchema';

export interface PaginatedReviewResponse {
  limit: number;
  page: number;
  reviews: ReviewSchema[];
  total: number;
}
