import { Link } from 'react-router-dom';

// one photo in the gallery (works for both grid and list view)
function PhotoCard({ photo }) {
  return (
    <Link to={`/photos/${photo._id}`} className="photo-card">
      <img
        src={`/uploads/${photo.fileName}`}
        alt={photo.title}
        className="photo-img"
        loading="lazy"
      />
      <div className="photo-info">
        <h3>{photo.title}</h3>
        <p className="photo-auther">By {photo.userID?.firstName} {photo.userID?.lastName}</p>
      </div>
    </Link>
  );
}

export default PhotoCard;
