import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CommentForm from '../components/CommentForm';
import api, { getErrorMessage } from '../api/axios';

function PhotoDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user } = useAuth();

  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

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

  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
  };

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