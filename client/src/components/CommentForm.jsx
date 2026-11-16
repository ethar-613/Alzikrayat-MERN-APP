import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

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
      const res = await fetch(`/api/photos/${photoId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user._id,
        },
        body: JSON.stringify({ comment }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.errors?.[0] || 'Failed to add comment');

      setComment(''); // set the comment to be empty
      onCommentAdded(data); //notify the details page of the new comment
    } catch (err) {
      setError(err.message);
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