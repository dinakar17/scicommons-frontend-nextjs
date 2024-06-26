/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * MyApp API
 * OpenAPI spec version: 1.0.0
 */
import type { ArticleSchemaCommunityId } from './articleSchemaCommunityId';
import type { ArticleSchemaImage } from './articleSchemaImage';
import type { ArticleSchemaPdfFile } from './articleSchemaPdfFile';

export interface ArticleSchema {
  abstract: string;
  authors: string;
  community_id: ArticleSchemaCommunityId;
  id: number;
  image: ArticleSchemaImage;
  keywords: string;
  pdf_file: ArticleSchemaPdfFile;
  published: boolean;
  slug: string;
  status: string;
  submission_type: string;
  submitter_id: number;
  title: string;
}
