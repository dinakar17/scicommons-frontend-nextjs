import axios from 'axios';

const baseurl = 'http://127.0.0.1:8000/api/post';

interface configType {
  headers: {
    Authorization: string;
  };
}

export const fetchAllPosts = async (hashtag: string | null, config: configType) => {
  const url = hashtag ? `${baseurl}/all?hashtag=${hashtag}` : `${baseurl}/all`;
  const { data } = await axios.get(url, config);
  return data;
};

export const getPostById = async (postId: string | string[], config: configType) => {
  const { data } = await axios.get(`${baseurl}/${postId}`, config);
  return data;
};

export const getPostByUser = async (username: any, config: configType) => {
  const { data } = await axios.get(`${baseurl}/user/${username}`, config);
  return data;
};

export const createPost = async (body: string, hashtags: string[], config: configType) => {
  const { data } = await axios.post(
    `${baseurl}/create`,
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
    `${baseurl}/${postId}/comments/${commentId}/reply`,
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
  const { data } = await axios.post(`${baseurl}/${postId}/comment`, commentData, config);
  return data;
};

export const likePost = async (postId: string | string[], config: configType) => {
  const { data } = await axios.get(`${baseurl}/${postId}/like`, config);
  return data;
};

export const unlikePost = async (postId: string | string[], config: configType) => {
  const { data } = await axios.get(`${baseurl}/${postId}/unlike`, config);
  return data;
};

export const likeComment = async (commentId: string | string[], config: configType) => {
  const { data } = await axios.get(`${baseurl}/comment/${commentId}/like`, config);
  return data;
};

export const unlikeComment = async (commentId: string | string[], config: configType) => {
  const { data } = await axios.get(`${baseurl}/comment/${commentId}/unlike`, config);
  return data;
};

export const getHastags = async (config: configType) => {
  const { data } = await axios.get(`${baseurl}/get/hashtags`, config);
  return data;
};
