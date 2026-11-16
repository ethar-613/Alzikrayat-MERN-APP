import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar(){
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = ()=>{
        logout();
        navigate('/login');
    };
    
    return (
          <nav className="navBarSection">
            <Link to="/" className="navbar-Link-brand">Alzikrayat</Link>

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