/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * MyApp API
 * OpenAPI spec version: 1.0.0
 */
import type { AssessorSchemaApproved } from './assessorSchemaApproved';
import type { AssessorSchemaComments } from './assessorSchemaComments';
import type { AssessorSchemaId } from './assessorSchemaId';
import type { UserStats } from './userStats';

export interface AssessorSchema {
  approved?: AssessorSchemaApproved;
  assessed_at: string;
  assessor: UserStats;
  comments?: AssessorSchemaComments;
  id?: AssessorSchemaId;
  is_moderator?: boolean;
}
