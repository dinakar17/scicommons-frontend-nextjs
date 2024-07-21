/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * MyApp API
 * OpenAPI spec version: 1.0.0
 */
import { useMutation, useQuery } from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import { customInstance } from '.././custom-instance';
import type { BodyType, ErrorType } from '.././custom-instance';
import type {
  ArticlesDiscussionApiCreateDiscussionParams,
  ArticlesDiscussionApiListDiscussionCommentsParams,
  ArticlesDiscussionApiListDiscussionsParams,
  CreateDiscussionSchema,
  DiscussionCommentCreateSchema,
  DiscussionCommentOut,
  DiscussionCommentUpdateSchema,
  DiscussionOut,
  Message,
  PaginatedDiscussionSchema,
} from '.././schemas';

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

/**
 * @summary Create Discussion
 */
export const articlesDiscussionApiCreateDiscussion = (
  articleId: number,
  createDiscussionSchema: BodyType<CreateDiscussionSchema>,
  params?: ArticlesDiscussionApiCreateDiscussionParams,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<DiscussionOut>(
    {
      url: `/api/articles/${articleId}/discussions/`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: createDiscussionSchema,
      params,
    },
    options
  );
};

export const getArticlesDiscussionApiCreateDiscussionMutationOptions = <
  TError = ErrorType<Message>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiCreateDiscussion>>,
    TError,
    {
      articleId: number;
      data: BodyType<CreateDiscussionSchema>;
      params?: ArticlesDiscussionApiCreateDiscussionParams;
    },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof articlesDiscussionApiCreateDiscussion>>,
  TError,
  {
    articleId: number;
    data: BodyType<CreateDiscussionSchema>;
    params?: ArticlesDiscussionApiCreateDiscussionParams;
  },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof articlesDiscussionApiCreateDiscussion>>,
    {
      articleId: number;
      data: BodyType<CreateDiscussionSchema>;
      params?: ArticlesDiscussionApiCreateDiscussionParams;
    }
  > = (props) => {
    const { articleId, data, params } = props ?? {};

    return articlesDiscussionApiCreateDiscussion(articleId, data, params, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ArticlesDiscussionApiCreateDiscussionMutationResult = NonNullable<
  Awaited<ReturnType<typeof articlesDiscussionApiCreateDiscussion>>
>;
export type ArticlesDiscussionApiCreateDiscussionMutationBody = BodyType<CreateDiscussionSchema>;
export type ArticlesDiscussionApiCreateDiscussionMutationError = ErrorType<Message>;

/**
 * @summary Create Discussion
 */
export const useArticlesDiscussionApiCreateDiscussion = <
  TError = ErrorType<Message>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiCreateDiscussion>>,
    TError,
    {
      articleId: number;
      data: BodyType<CreateDiscussionSchema>;
      params?: ArticlesDiscussionApiCreateDiscussionParams;
    },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof articlesDiscussionApiCreateDiscussion>>,
  TError,
  {
    articleId: number;
    data: BodyType<CreateDiscussionSchema>;
    params?: ArticlesDiscussionApiCreateDiscussionParams;
  },
  TContext
> => {
  const mutationOptions = getArticlesDiscussionApiCreateDiscussionMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary List Discussions
 */
export const articlesDiscussionApiListDiscussions = (
  articleId: number,
  params?: ArticlesDiscussionApiListDiscussionsParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<PaginatedDiscussionSchema>(
    { url: `/api/articles/${articleId}/discussions/`, method: 'GET', params, signal },
    options
  );
};

export const getArticlesDiscussionApiListDiscussionsQueryKey = (
  articleId: number,
  params?: ArticlesDiscussionApiListDiscussionsParams
) => {
  return [`/api/articles/${articleId}/discussions/`, ...(params ? [params] : [])] as const;
};

export const getArticlesDiscussionApiListDiscussionsQueryOptions = <
  TData = Awaited<ReturnType<typeof articlesDiscussionApiListDiscussions>>,
  TError = ErrorType<Message>,
>(
  articleId: number,
  params?: ArticlesDiscussionApiListDiscussionsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof articlesDiscussionApiListDiscussions>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getArticlesDiscussionApiListDiscussionsQueryKey(articleId, params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof articlesDiscussionApiListDiscussions>>
  > = ({ signal }) =>
    articlesDiscussionApiListDiscussions(articleId, params, requestOptions, signal);

  return { queryKey, queryFn, enabled: !!articleId, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiListDiscussions>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ArticlesDiscussionApiListDiscussionsQueryResult = NonNullable<
  Awaited<ReturnType<typeof articlesDiscussionApiListDiscussions>>
>;
export type ArticlesDiscussionApiListDiscussionsQueryError = ErrorType<Message>;

/**
 * @summary List Discussions
 */
export const useArticlesDiscussionApiListDiscussions = <
  TData = Awaited<ReturnType<typeof articlesDiscussionApiListDiscussions>>,
  TError = ErrorType<Message>,
>(
  articleId: number,
  params?: ArticlesDiscussionApiListDiscussionsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof articlesDiscussionApiListDiscussions>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getArticlesDiscussionApiListDiscussionsQueryOptions(
    articleId,
    params,
    options
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * @summary Get Discussion
 */
export const articlesDiscussionApiGetDiscussion = (
  discussionId: number,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<DiscussionOut>(
    { url: `/api/articles/discussions/${discussionId}/`, method: 'GET', signal },
    options
  );
};

export const getArticlesDiscussionApiGetDiscussionQueryKey = (discussionId: number) => {
  return [`/api/articles/discussions/${discussionId}/`] as const;
};

export const getArticlesDiscussionApiGetDiscussionQueryOptions = <
  TData = Awaited<ReturnType<typeof articlesDiscussionApiGetDiscussion>>,
  TError = ErrorType<Message>,
>(
  discussionId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof articlesDiscussionApiGetDiscussion>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getArticlesDiscussionApiGetDiscussionQueryKey(discussionId);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof articlesDiscussionApiGetDiscussion>>> = ({
    signal,
  }) => articlesDiscussionApiGetDiscussion(discussionId, requestOptions, signal);

  return { queryKey, queryFn, enabled: !!discussionId, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiGetDiscussion>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ArticlesDiscussionApiGetDiscussionQueryResult = NonNullable<
  Awaited<ReturnType<typeof articlesDiscussionApiGetDiscussion>>
>;
export type ArticlesDiscussionApiGetDiscussionQueryError = ErrorType<Message>;

/**
 * @summary Get Discussion
 */
export const useArticlesDiscussionApiGetDiscussion = <
  TData = Awaited<ReturnType<typeof articlesDiscussionApiGetDiscussion>>,
  TError = ErrorType<Message>,
>(
  discussionId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof articlesDiscussionApiGetDiscussion>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getArticlesDiscussionApiGetDiscussionQueryOptions(discussionId, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * @summary Update Discussion
 */
export const articlesDiscussionApiUpdateDiscussion = (
  discussionId: number,
  createDiscussionSchema: BodyType<CreateDiscussionSchema>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<DiscussionOut>(
    {
      url: `/api/articles/discussions/${discussionId}/`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: createDiscussionSchema,
    },
    options
  );
};

export const getArticlesDiscussionApiUpdateDiscussionMutationOptions = <
  TError = ErrorType<Message>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiUpdateDiscussion>>,
    TError,
    { discussionId: number; data: BodyType<CreateDiscussionSchema> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof articlesDiscussionApiUpdateDiscussion>>,
  TError,
  { discussionId: number; data: BodyType<CreateDiscussionSchema> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof articlesDiscussionApiUpdateDiscussion>>,
    { discussionId: number; data: BodyType<CreateDiscussionSchema> }
  > = (props) => {
    const { discussionId, data } = props ?? {};

    return articlesDiscussionApiUpdateDiscussion(discussionId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ArticlesDiscussionApiUpdateDiscussionMutationResult = NonNullable<
  Awaited<ReturnType<typeof articlesDiscussionApiUpdateDiscussion>>
>;
export type ArticlesDiscussionApiUpdateDiscussionMutationBody = BodyType<CreateDiscussionSchema>;
export type ArticlesDiscussionApiUpdateDiscussionMutationError = ErrorType<Message>;

/**
 * @summary Update Discussion
 */
export const useArticlesDiscussionApiUpdateDiscussion = <
  TError = ErrorType<Message>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiUpdateDiscussion>>,
    TError,
    { discussionId: number; data: BodyType<CreateDiscussionSchema> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof articlesDiscussionApiUpdateDiscussion>>,
  TError,
  { discussionId: number; data: BodyType<CreateDiscussionSchema> },
  TContext
> => {
  const mutationOptions = getArticlesDiscussionApiUpdateDiscussionMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Delete Discussion
 */
export const articlesDiscussionApiDeleteDiscussion = (
  discussionId: number,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<Message>(
    { url: `/api/articles/discussions/${discussionId}/`, method: 'DELETE' },
    options
  );
};

export const getArticlesDiscussionApiDeleteDiscussionMutationOptions = <
  TError = ErrorType<Message>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiDeleteDiscussion>>,
    TError,
    { discussionId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof articlesDiscussionApiDeleteDiscussion>>,
  TError,
  { discussionId: number },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof articlesDiscussionApiDeleteDiscussion>>,
    { discussionId: number }
  > = (props) => {
    const { discussionId } = props ?? {};

    return articlesDiscussionApiDeleteDiscussion(discussionId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ArticlesDiscussionApiDeleteDiscussionMutationResult = NonNullable<
  Awaited<ReturnType<typeof articlesDiscussionApiDeleteDiscussion>>
>;

export type ArticlesDiscussionApiDeleteDiscussionMutationError = ErrorType<Message>;

/**
 * @summary Delete Discussion
 */
export const useArticlesDiscussionApiDeleteDiscussion = <
  TError = ErrorType<Message>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiDeleteDiscussion>>,
    TError,
    { discussionId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof articlesDiscussionApiDeleteDiscussion>>,
  TError,
  { discussionId: number },
  TContext
> => {
  const mutationOptions = getArticlesDiscussionApiDeleteDiscussionMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Create Comment
 */
export const articlesDiscussionApiCreateComment = (
  discussionId: number,
  discussionCommentCreateSchema: BodyType<DiscussionCommentCreateSchema>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<DiscussionCommentOut>(
    {
      url: `/api/articles/discussions/${discussionId}/comments/`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: discussionCommentCreateSchema,
    },
    options
  );
};

export const getArticlesDiscussionApiCreateCommentMutationOptions = <
  TError = ErrorType<Message>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiCreateComment>>,
    TError,
    { discussionId: number; data: BodyType<DiscussionCommentCreateSchema> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof articlesDiscussionApiCreateComment>>,
  TError,
  { discussionId: number; data: BodyType<DiscussionCommentCreateSchema> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof articlesDiscussionApiCreateComment>>,
    { discussionId: number; data: BodyType<DiscussionCommentCreateSchema> }
  > = (props) => {
    const { discussionId, data } = props ?? {};

    return articlesDiscussionApiCreateComment(discussionId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ArticlesDiscussionApiCreateCommentMutationResult = NonNullable<
  Awaited<ReturnType<typeof articlesDiscussionApiCreateComment>>
>;
export type ArticlesDiscussionApiCreateCommentMutationBody =
  BodyType<DiscussionCommentCreateSchema>;
export type ArticlesDiscussionApiCreateCommentMutationError = ErrorType<Message>;

/**
 * @summary Create Comment
 */
export const useArticlesDiscussionApiCreateComment = <
  TError = ErrorType<Message>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiCreateComment>>,
    TError,
    { discussionId: number; data: BodyType<DiscussionCommentCreateSchema> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof articlesDiscussionApiCreateComment>>,
  TError,
  { discussionId: number; data: BodyType<DiscussionCommentCreateSchema> },
  TContext
> => {
  const mutationOptions = getArticlesDiscussionApiCreateCommentMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary List Discussion Comments
 */
export const articlesDiscussionApiListDiscussionComments = (
  discussionId: number,
  params?: ArticlesDiscussionApiListDiscussionCommentsParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<DiscussionCommentOut[]>(
    { url: `/api/articles/discussions/${discussionId}/comments/`, method: 'GET', params, signal },
    options
  );
};

export const getArticlesDiscussionApiListDiscussionCommentsQueryKey = (
  discussionId: number,
  params?: ArticlesDiscussionApiListDiscussionCommentsParams
) => {
  return [
    `/api/articles/discussions/${discussionId}/comments/`,
    ...(params ? [params] : []),
  ] as const;
};

export const getArticlesDiscussionApiListDiscussionCommentsQueryOptions = <
  TData = Awaited<ReturnType<typeof articlesDiscussionApiListDiscussionComments>>,
  TError = ErrorType<Message>,
>(
  discussionId: number,
  params?: ArticlesDiscussionApiListDiscussionCommentsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof articlesDiscussionApiListDiscussionComments>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getArticlesDiscussionApiListDiscussionCommentsQueryKey(discussionId, params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof articlesDiscussionApiListDiscussionComments>>
  > = ({ signal }) =>
    articlesDiscussionApiListDiscussionComments(discussionId, params, requestOptions, signal);

  return { queryKey, queryFn, enabled: !!discussionId, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiListDiscussionComments>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ArticlesDiscussionApiListDiscussionCommentsQueryResult = NonNullable<
  Awaited<ReturnType<typeof articlesDiscussionApiListDiscussionComments>>
>;
export type ArticlesDiscussionApiListDiscussionCommentsQueryError = ErrorType<Message>;

/**
 * @summary List Discussion Comments
 */
export const useArticlesDiscussionApiListDiscussionComments = <
  TData = Awaited<ReturnType<typeof articlesDiscussionApiListDiscussionComments>>,
  TError = ErrorType<Message>,
>(
  discussionId: number,
  params?: ArticlesDiscussionApiListDiscussionCommentsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof articlesDiscussionApiListDiscussionComments>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getArticlesDiscussionApiListDiscussionCommentsQueryOptions(
    discussionId,
    params,
    options
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * @summary Get Comment
 */
export const articlesDiscussionApiGetComment = (
  commentId: number,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<DiscussionCommentOut>(
    { url: `/api/articles/discussions/comments/${commentId}/`, method: 'GET', signal },
    options
  );
};

export const getArticlesDiscussionApiGetCommentQueryKey = (commentId: number) => {
  return [`/api/articles/discussions/comments/${commentId}/`] as const;
};

export const getArticlesDiscussionApiGetCommentQueryOptions = <
  TData = Awaited<ReturnType<typeof articlesDiscussionApiGetComment>>,
  TError = ErrorType<Message>,
>(
  commentId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof articlesDiscussionApiGetComment>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getArticlesDiscussionApiGetCommentQueryKey(commentId);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof articlesDiscussionApiGetComment>>> = ({
    signal,
  }) => articlesDiscussionApiGetComment(commentId, requestOptions, signal);

  return { queryKey, queryFn, enabled: !!commentId, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiGetComment>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ArticlesDiscussionApiGetCommentQueryResult = NonNullable<
  Awaited<ReturnType<typeof articlesDiscussionApiGetComment>>
>;
export type ArticlesDiscussionApiGetCommentQueryError = ErrorType<Message>;

/**
 * @summary Get Comment
 */
export const useArticlesDiscussionApiGetComment = <
  TData = Awaited<ReturnType<typeof articlesDiscussionApiGetComment>>,
  TError = ErrorType<Message>,
>(
  commentId: number,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof articlesDiscussionApiGetComment>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getArticlesDiscussionApiGetCommentQueryOptions(commentId, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * @summary Update Comment
 */
export const articlesDiscussionApiUpdateComment = (
  commentId: number,
  discussionCommentUpdateSchema: BodyType<DiscussionCommentUpdateSchema>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<DiscussionCommentOut>(
    {
      url: `/api/articles/discussions/comments/${commentId}/`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: discussionCommentUpdateSchema,
    },
    options
  );
};

export const getArticlesDiscussionApiUpdateCommentMutationOptions = <
  TError = ErrorType<Message>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiUpdateComment>>,
    TError,
    { commentId: number; data: BodyType<DiscussionCommentUpdateSchema> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof articlesDiscussionApiUpdateComment>>,
  TError,
  { commentId: number; data: BodyType<DiscussionCommentUpdateSchema> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof articlesDiscussionApiUpdateComment>>,
    { commentId: number; data: BodyType<DiscussionCommentUpdateSchema> }
  > = (props) => {
    const { commentId, data } = props ?? {};

    return articlesDiscussionApiUpdateComment(commentId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ArticlesDiscussionApiUpdateCommentMutationResult = NonNullable<
  Awaited<ReturnType<typeof articlesDiscussionApiUpdateComment>>
>;
export type ArticlesDiscussionApiUpdateCommentMutationBody =
  BodyType<DiscussionCommentUpdateSchema>;
export type ArticlesDiscussionApiUpdateCommentMutationError = ErrorType<Message>;

/**
 * @summary Update Comment
 */
export const useArticlesDiscussionApiUpdateComment = <
  TError = ErrorType<Message>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiUpdateComment>>,
    TError,
    { commentId: number; data: BodyType<DiscussionCommentUpdateSchema> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof articlesDiscussionApiUpdateComment>>,
  TError,
  { commentId: number; data: BodyType<DiscussionCommentUpdateSchema> },
  TContext
> => {
  const mutationOptions = getArticlesDiscussionApiUpdateCommentMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Delete Comment
 */
export const articlesDiscussionApiDeleteComment = (
  commentId: number,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>(
    { url: `/api/articles/discussions/comments/${commentId}/`, method: 'DELETE' },
    options
  );
};

export const getArticlesDiscussionApiDeleteCommentMutationOptions = <
  TError = ErrorType<Message>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiDeleteComment>>,
    TError,
    { commentId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof articlesDiscussionApiDeleteComment>>,
  TError,
  { commentId: number },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof articlesDiscussionApiDeleteComment>>,
    { commentId: number }
  > = (props) => {
    const { commentId } = props ?? {};

    return articlesDiscussionApiDeleteComment(commentId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ArticlesDiscussionApiDeleteCommentMutationResult = NonNullable<
  Awaited<ReturnType<typeof articlesDiscussionApiDeleteComment>>
>;

export type ArticlesDiscussionApiDeleteCommentMutationError = ErrorType<Message>;

/**
 * @summary Delete Comment
 */
export const useArticlesDiscussionApiDeleteComment = <
  TError = ErrorType<Message>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof articlesDiscussionApiDeleteComment>>,
    TError,
    { commentId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof articlesDiscussionApiDeleteComment>>,
  TError,
  { commentId: number },
  TContext
> => {
  const mutationOptions = getArticlesDiscussionApiDeleteCommentMutationOptions(options);

  return useMutation(mutationOptions);
};