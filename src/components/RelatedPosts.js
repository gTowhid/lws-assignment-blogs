import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RelatedPost from './RelatedPost';
import { fetchRelatedBlogsAsync } from '../features/relatedBlogs/relatedBlogsSlice';
import Loading from './Loading';

export default function RelatedPosts({ tags, currentBlogId }) {
  const dispatch = useDispatch();
  const { relatedBlogs, isLoading, isError, error } = useSelector(
    (state) => state.relatedBlogs
  );

  useEffect(() => {
    dispatch(fetchRelatedBlogsAsync({ tags, id: currentBlogId }));
  }, [currentBlogId, dispatch, tags]);

  let content = null;
  if (isLoading) content = <Loading />;
  if (!isLoading && isError) content = <div>{error}</div>;
  if (!isLoading && !isError && relatedBlogs?.length === 0)
    content = <div>No Related Video Found</div>;
  if (!isLoading && !isError && relatedBlogs?.length > 0)
    content = relatedBlogs.map((blog) => (
      <RelatedPost key={blog.id} blog={blog} />
    ));

  return (
    <aside>
      <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">
        Related Posts
      </h4>
      <div className="space-y-4 related-post-container">{content}</div>
    </aside>
  );
}
