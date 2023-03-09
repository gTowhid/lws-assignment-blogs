import DetailedPost from '../components/DetailedPost';
import RelatedPosts from '../components/RelatedPosts';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBlogAsync } from '../features/blog/blogSlice';
import Loading from '../components/Loading'

export default function Post() {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const { blog, isLoading, isError, error } = useSelector(state => state.blog)

    useEffect(() => {
        dispatch(fetchBlogAsync(postId));
    }, [dispatch, postId]);

    let content = null;
    if (isLoading) content = <Loading />;
    if (!isLoading && isError) content = <div>{error}</div>;
    if (!isLoading && !isError && !blog?.id) content = <div>No Video Found</div>
    if (!isLoading && !isError && blog?.id) content = <section className="post-page-container">
    <DetailedPost blog={blog} />
    <RelatedPosts />
</section>


    return <>
        <div className="container mt-8">
            <Link to='/' className="inline-block text-gray-600 home-btn" id="lws-goHome"><i
                className="mr-2 fa-solid fa-house"></i>Go Home</Link>
        </div>

        {content}
    </>
}