import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api, { getErrorMessage } from '../api/axios';

function CommentForm({ photoId, onCommentAdded }) {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setError('');
    setLoading(true);

    try {
      const res = await api.post(`/photos/${photoId}/comments`, { comment });
      const data = res.data;

      setComment(''); // set the comment to be empty
      onCommentAdded(data); //notify the details page of the new comment
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to add comment'));
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="login-prompt">Please login to leave a comment.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        placeholder="Add a comment and share your opinion..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}

export default CommentForm;