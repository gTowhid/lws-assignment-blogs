import axios from '../../utils/axios';

export const getRelatedBlogs = async ({ tags, id }) => {
  let queryString =
    tags?.length > 0
      ? '?tags_like=' + tags.join('&tags_like=') + `&id_ne=${id}`
      : `&id_ne=${id}`;
  const response = await axios.get('/blogs' + queryString);

  return response.data;
};
