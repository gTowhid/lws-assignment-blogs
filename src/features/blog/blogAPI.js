import axios from '../../utils/axios';

export const getBlog = async (id) => {
  const response = await axios.get(`/blogs/${id}`);

  return response.data;
};

export const setBlogLike = async ({ id, likes }) => {
  const response = await axios.patch(`http://localhost:9000/blogs/${id}`, {
    likes: likes + 1,
  });

  return response.data.likes;
};

export const setBlogSaved = async ({ id, isSaved }) => {
  const response = await axios.patch(`http://localhost:9000/blogs/${id}`, {
    isSaved: !isSaved,
  });

  return response.data.isSaved;
};
