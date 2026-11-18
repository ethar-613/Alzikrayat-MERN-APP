/**
 * upload page
 * page that contains the upload form, only logged in users can open it (protected in App.jsx)
 */

import { Link, useNavigate } from 'react-router-dom';
import UploadForm from '../components/UploadForm';

// This page is protected in App.jsx, so only logged in users can open it
// parameters; none
// Returns the upload page JSX that contains the UploadForm
function Upload() {
  const navigate = useNavigate();

  return (
    <div className="upload-page">
      <Link to="/gallery" className="back-link">← Back to Gallery</Link>
      {/* after a successful upload go back to the gallery to see the photo */}
      <UploadForm onSuccess={() => navigate('/gallery')} />
    </div>
  );
}

export default Upload;
