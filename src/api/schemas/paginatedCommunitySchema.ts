/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * MyApp API
 * OpenAPI spec version: 1.0.0
 */
import type { CommunityDetails } from './communityDetails';

export interface PaginatedCommunitySchema {
  communities: CommunityDetails[];
  page: number;
  size: number;
  total: number;
}
