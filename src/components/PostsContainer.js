import HomepagePost from './HomepagePost';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBlogsAsync } from '../features/blogs/blogsSlice';

export default function PostsContainer() {
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, error } = useSelector(
    (state) => state.blogs
  );
  const { filter, sort } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchBlogsAsync());
  }, [dispatch]);

  let content;

  if (isLoading) content = <Loading />;
  if (!isLoading && isError) content = <div>{error}</div>;
  if (!isError && !isLoading && blogs?.length === 0) {
    content = <div>No Blogs Found</div>;
  }
  if (!isError && !isLoading && blogs?.length > 0) {
    // filtering
    if (filter === 'lws-saved') {
      content = blogs
        .filter((blog) => blog.isSaved)
        .map((blog) => <HomepagePost key={blog.id} blog={blog} />);
    } else {
      content = blogs.map((blog) => <HomepagePost key={blog.id} blog={blog} />);
    }

    // sorting
    if (sort === 'most_liked')
      content.sort(function (a, b) {
        return b.props.blog.likes - a.props.blog.likes;
      });
    if (sort === 'newest')
      content.sort(function (a, b) {
        return (
          parseInt(b.props.blog.createdAt.replace(/-/g, '')) -
          parseInt(a.props.blog.createdAt.replace(/-/g, ''))
        );
      });
  }

  return (
    <main className="post-container" id="lws-postContainer">
      {content}
    </main>
  );
}
