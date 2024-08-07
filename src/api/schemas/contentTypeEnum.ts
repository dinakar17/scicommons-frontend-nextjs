/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * MyApp API
 * OpenAPI spec version: 1.0.0
 */

export type ContentTypeEnum = (typeof ContentTypeEnum)[keyof typeof ContentTypeEnum];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ContentTypeEnum = {
  articlesarticle: 'articles.article',
  postspost: 'posts.post',
  postscomment: 'posts.comment',
  articlesreviewcomment: 'articles.reviewcomment',
  articlesreview: 'articles.review',
  articlesdiscussion: 'articles.discussion',
  articlesdiscussioncomment: 'articles.discussioncomment',
} as const;
