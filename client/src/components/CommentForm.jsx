/**
 * comment form component
 * lets a logged in user write a comment on a photo, visitors see a message asking them to login
 */

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api, { getErrorMessage } from '../api/axios';

// form to add a comment to a photo, logged out visitors see a message to login instead
// parameters; photoId, the id of the photo that will receive the comment
//             onCommentAdded, function that gets the new comment so the page can show it immediately
// Returns the form JSX or the login message
function CommentForm({ photoId, onCommentAdded }) {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // runs when the form is submitted, calls POST /api/photos/:id/comments
  // parameters; e, the submit event (used to stop the page reload)
  // Returns nothing, on success it clears the textarea and calls onCommentAdded(newComment)
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