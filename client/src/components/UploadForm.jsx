/**
 * upload form component
 * lets a logged in user choose an image, write its title and description, and send them to the server
 */

import { useState } from 'react';
import api, { getErrorMessage } from '../api/axios';

// form to upload a new photo with its title and description
// parameters; onSuccess, function that runs after the photo is uploaded successfully
// Returns the form JSX
function UploadForm({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // runs when the form is submitted, sends the image and its data to POST /api/photos as FormData
  // parameters; e, the submit event (used to stop the page reload)
  // Returns nothing, on success it calls onSuccess(), on failure it shows the error message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image file.');
      return;
    }

    setError('');
    setLoading(true);


    const formData = new FormData();
    formData.append('photo', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      // the Authorization header is added automatically by the Axios interceptor
      await api.post('/photos', formData);

      onSuccess(); 
    } catch (err) {
      setError(getErrorMessage(err, 'Upload failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <h3>Upload a New Memory</h3>
      <form onSubmit={handleSubmit} className="upload-form">
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files[0])} 
          required
        />
        <input 
          type="text" 
          placeholder="Photo Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Description (optional)" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          rows={2}
        />
        
        {error && <p className="error">{error}</p>}
        
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
