import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UploadForm from "../components/UploadForm";

function Gallery(){
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [showUpload , setShowUpload] = useState(false);

    const {user} = useAuth();

    const fetchPhotos = async () => {
        try{
            setLoading(true);
            const res = await fetch('/api/photos');
            if(!res.ok) throw new Error('Fail to fetch photos');

            const data = await res.json();
            setPhotos(data);
        }catch(err){
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };

    // fetch all the photos in  the first downloading to the page 
    useEffect(()=>{
        fetchPhotos();
    }, []);

    // function called after the uploading success
    const handleUploadSuccess = ()=>{
        setShowUpload(false);
        fetchPhotos(); //refetching the photos so the new photo show
    };

    if(loading) return <div className="status-msg">Loading photos...</div>;
    if(error) return <div className="status-error-msg">{error}</div>;

    return (
        <div className="gallery-page">
            <div className="galler-header">
                <h1>Photo Gallery</h1>
                <div className="gallery-actions">
                    {/* buttons for changing the view to list or grid */}
                    <div className="view-toggels">
                        <button className={`btn-toggle ${viewMode === 'grid'? 'active':''}`} onClick={()=>setViewMode('grid')}>Grid</button>
                        <button className={`btn-toggle ${viewMode === 'list'? 'active':''}`} onClick={()=>setViewMode('list')}>List</button>
                    </div>

                    {/* uploading photo button */}
                    {user && (
                        <button className="btn-primary" onClick={()=> setShowUpload(!showUpload)}>
                            {showUpload ? 'Cancel Upload' : '+ Upload photo'}
                        </button>
                    )}
                </div>
            </div>

            {/* uploading photo form */}
            {showUpload && user && (
                <UploadForm onSuccess={handleUploadSuccess} />
            )}

            {/* displaing images */}
            {photos.length===0 ? (
                <p className="status-msg">No photos yet. Be the first one to share!</p>
            ):(
                <div className={viewMode === 'grid' ? 'photos-grid' : 'photos-list'}>
                    {photos.map((photo)=>(
                        <Link to={`/photos/${photo._id}`} key={photo._id} className="photo-card" >
                            <img src={`/uploads/${photo.fileName}`} alt={photo.title} className="photo-img"  loading="lazy" />
                            <div className="photo-info">
                                <h3>{photo.title}</h3>
                                <p className="photo-auther">By {photo.userID?.firstName} {photo.userID?.lastName}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Gallery;