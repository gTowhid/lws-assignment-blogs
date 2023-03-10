import { useDispatch } from 'react-redux';
import { updateLikeAsync, updateSaveAsync } from '../features/blog/blogSlice';

export default function DetailedPost({ blog }) {
  const dispatch = useDispatch();
  const { title, description, image, tags, likes, isSaved, id } = blog;

  return (
    <main className="post">
      <img
        src={image}
        alt="githum"
        className="w-full rounded-md"
        id="lws-megaThumb"
      />
      <div>
        <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
          {title}
        </h1>
        <div className="tags" id="lws-singleTags">
          <span>#{tags.join(', #')}</span>
        </div>
        <div className="btn-group">
          <button
            className="like-btn"
            id="lws-singleLinks"
            onClick={() => dispatch(updateLikeAsync({ id, likes }))}
          >
            <i className="fa-regular fa-thumbs-up"></i> {likes}
          </button>

          {/* use ".active" class and "Saved" text  if a post is saved, other wise "Save" */}

          {isSaved ? (
            <button
              className="active save-btn"
              id="lws-singleSavedBtn"
              onClick={() => dispatch(updateSaveAsync({ id, isSaved }))}
            >
              <i className="fa-regular fa-bookmark"></i> Saved
            </button>
          ) : (
            <button
              className="save-btn"
              id="lws-singleSavedBtn"
              onClick={() => dispatch(updateSaveAsync({ id, isSaved }))}
            >
              <i className="fa-regular fa-bookmark"></i> Save
            </button>
          )}
        </div>
        <div className="mt-6">
          <p>{description}</p>
        </div>
      </div>
    </main>
  );
}
