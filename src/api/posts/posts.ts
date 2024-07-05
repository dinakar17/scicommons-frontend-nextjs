import axios from 'axios';

const postEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/post`;

interface configType {
  headers: {
    Authorization: string;
  };
}

export const fetchAllPosts = async (hashtag: string | null, config: configType) => {
  const url = hashtag ? `${postEndpoint}/all?hashtag=${hashtag}` : `${postEndpoint}/all`;
  const { data } = await axios.get(url, config);
  return data;
};

export const getPostById = async (postId: string | string[], config: configType) => {
  const { data } = await axios.get(`${postEndpoint}/${postId}`, config);
  return data;
};

export const getPostByUser = async (username: any, config: configType) => {
  const { data } = await axios.get(`${postEndpoint}/user/${username}`, config);
  return data;
};

export const createPost = async (body: string, hashtags: string[], config: configType) => {
  const { data } = await axios.post(
    `${postEndpoint}/create`,
    { body: body, hashtags: hashtags },
    config
  );
  return data;
};

export const replyToComment = async (
  commentId: any = null,
  postId: string | string[],
  formData: any,
  config: configType
) => {
  const { data } = await axios.post(
    `${postEndpoint}/${postId}/comments/${commentId}/reply`,
    formData,
    config
  );
  return data;
};

export const postComment = async (
  postId: string | string[],
  commentData: any,
  config: configType
) => {
  const { data } = await axios.post(`${postEndpoint}/${postId}/comment`, commentData, config);
  return data;
};

export const likePost = async (postId: string | string[], config: configType) => {
  const { data } = await axios.get(`${postEndpoint}/${postId}/like`, config);
  return data;
};

export const unlikePost = async (postId: string | string[], config: configType) => {
  const { data } = await axios.get(`${postEndpoint}/${postId}/unlike`, config);
  return data;
};

export const likeComment = async (commentId: string | string[], config: configType) => {
  const { data } = await axios.get(`${postEndpoint}/comment/${commentId}/like`, config);
  return data;
};

export const unlikeComment = async (commentId: string | string[], config: configType) => {
  const { data } = await axios.get(`${postEndpoint}/comment/${commentId}/unlike`, config);
  return data;
};

export const getHastags = async (config: configType) => {
  const { data } = await axios.get(`${postEndpoint}/get/hashtags`, config);
  return data;
};
