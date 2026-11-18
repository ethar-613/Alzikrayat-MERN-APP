/**
 * navbar component
 * shows the page links, and "Hi <firstName>!" with a Logout button when the user is logged in or "Please Login" when not
 */

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// the top bar of the app, shows the links and "Hi <firstName>!" with Logout button, or "Please Login" for visitors
// parameters; none (reads the user from the AuthContext)
// Returns the navbar JSX
function Navbar(){
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    // logs the user out and sends them to the login page
    // parameters; none
    // Returns nothing
    const handleLogout = ()=>{
        logout();
        navigate('/login');
    };
    
    return (
          <nav className="navBarSection">
            <Link to="/" className="navbar-Link-brand"> <img src="/favicon.png" alt="Alzikrayat Logo" className="navbar-logo" /> Alzikrayat</Link>

            <div className='navbar-items-Links'>
              <NavLink to='/'>Home</NavLink>
              <NavLink to='/gallery'>Gallery</NavLink>
              <NavLink to='/about'>About</NavLink>

              {user? (
                <>
                  <span className="Hi-user-span">Hi {user.firstName}!</span>
                  <button onClick={handleLogout} className='logout-btn'>Logout</button>
                </>
              ):(
                <Link to="/login" className='login-nav'>Please Login</Link>
              )}
            </div>
          </nav>
    );
}

export default Navbar;