/**
 * photo details page
 * shows one photo with its data and comments, lets the owner delete it, and lets logged in users comment
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CommentForm from '../components/CommentForm';
import api, { getErrorMessage } from '../api/axios';

// the details page of one photo: the big image, its data, the delete button (owner only) and the comments
// parameters; none (the photo id comes from the url using useParams)
// Returns the photo details page JSX (or a loading / error message)
function PhotoDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user } = useAuth();

  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    // gets the photo and its comments from the API at the same time
    // parameters; none
    // Returns nothing, it saves the data in the state or the error message if it fails
    const fetchPhoto = async () => {
      try {
        const [photoRes, commentsRes] = await Promise.all([
          api.get(`/photos/${id}`),
          api.get(`/photos/${id}/comments`),
        ]);
        setPhoto(photoRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        setError(err.response?.status === 404 ? 'Photo not found' : getErrorMessage(err, 'Photo not found'));
      } finally {
        setLoading(false);
      }
    };
    fetchPhoto();
  }, [id]);

  // adds the new comment to the list so it appears without reloading the page
  // parameters; newComment, the comment object returned by the server
  // Returns nothing
  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
  };

  // deletes the photo after the user confirms (the server checks that the user is the owner)
  // parameters; none
  // Returns nothing, on success it goes back to the gallery, on failure it shows an alert with the error
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;

    try {
      await api.delete(`/photos/${id}`);

      navigate('/gallery'); 
    } catch (err) {
      alert(getErrorMessage(err, 'Failed to delete'));
    }
  };

  if (loading) return <div className="status-msg">Loading...</div>;
  if (error) return <div className="status-msg error">{error}</div>;
  if (!photo) return null;

  const isOwner = user && user._id === photo.userID?._id;

  return (
    <div className="photo-detail-page">
      <Link to="/gallery" className="back-link">← Back to Gallery</Link>

      <div className="photo-detail-container">

        <div className="photo-full">
          <img src={`/uploads/${photo.fileName}`} alt={photo.title} />
        </div>


        <div className="photo-sidebar">
          <div className="photo-meta">
            <h1>{photo.title}</h1>
            <p className="author">Uploaded by {photo.userID?.firstName} {photo.userID?.lastName}</p>
            <p className="date">{new Date(photo.dateTime).toLocaleDateString()}</p>
            {photo.description && <p className="description">{photo.description}</p>}
            

            {isOwner && (
              <button onClick={handleDelete} className="btn-danger">
                Delete Photo
              </button>
            )}
          </div>

          <hr />


          <div className="comments-section">
            <h3>Comments ({comments.length})</h3>
            
            <CommentForm photoId={id} onCommentAdded={handleCommentAdded} />

            <div className="comments-list">
              {comments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                comments.map((c) => (
                  <div key={c._id} className="comment-item">
                    <strong>{c.userId?.firstName} {c.userId?.lastName}</strong>
                    <span className="comment-date">{new Date(c.dateTime).toLocaleString()}</span>
                    <p>{c.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetail;