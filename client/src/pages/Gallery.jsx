import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PhotoCard from "../components/PhotoCard";

function Gallery(){
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');

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

                    {/* link to the upload page (only for logged in users) */}
                    {user && (
                        <Link to="/upload" className="btn-primary">+ Upload photo</Link>
                    )}
                </div>
            </div>

            {/* displaing images */}
            {photos.length===0 ? (
                <p className="status-msg">No photos yet. Be the first one to share!</p>
            ):(
                <div className={viewMode === 'grid' ? 'photos-grid' : 'photos-list'}>
                    {photos.map((photo)=>(
                        <PhotoCard key={photo._id} photo={photo} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Gallery;