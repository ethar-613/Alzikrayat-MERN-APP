import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home(){
    const {user} = useAuth();

    return (
        <div className="home-page">
            <section className="hero">
                <h1>Welcome to Alzikrayat</h1>
                <h2>Some days deserve to <span>stay.</span></h2>
                <p>A shared place for photographs and the stories around them. Keep a moment, come back to it, and see what others hold dear.</p>
                <p> you can share your memories, discover moments, and connect through photos! </p>

                <div className="hero-actions">
                    <Link to="/gallery" className="btn-primary">Explore the Gallery</Link>
                    {!user && (
                        <Link to="/register" className="btn-secondary">Join Alzikrayat</Link>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Home;