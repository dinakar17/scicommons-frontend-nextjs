/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * MyApp API
 * OpenAPI spec version: 1.0.0
 */
import type { CommunityType } from './communityType';
import type { UpdateCommunityDetailsAbout } from './updateCommunityDetailsAbout';

export interface UpdateCommunityDetails {
  about: UpdateCommunityDetailsAbout;
  description: string;
  rules: string[];
  tags: string[];
  type: CommunityType;
}
