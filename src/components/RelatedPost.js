import { Link } from 'react-router-dom';

export default function RelatedPost({ blog }) {
  const { id, title, image, tags, createdAt } = blog;

  return (
    <div className="card">
      <Link to={`/posts/${id}`}>
        <img src={image} className="card-image" alt="title" />
      </Link>
      <div className="p-4">
        <Link
          to={`/posts/${id}`}
          className="text-lg post-title lws-RelatedPostTitle"
        >
          {title}
        </Link>
        <div className="mb-0 tags">
          <span>#{tags.join(', #')}</span>
        </div>
        <p>{createdAt}</p>
      </div>
    </div>
  );
}
