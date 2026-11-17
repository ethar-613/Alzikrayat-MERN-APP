import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

// This page is used for both /login and /register
function LoginRegister() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname !== '/register';

  // after success go to the home page
  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div className="loginRegister-page">
      <div className="loginRegister-card">
        <h1>{isLogin ? 'Welcome back!' : 'Create an account'}</h1>

        {isLogin
          ? <LoginForm onLoginSuccess={handleSuccess} />
          : <RegisterForm onRegisterSuccess={handleSuccess} />
        }

        <p className="auth-switch">
          {isLogin ? 'Do not have an account?' : 'Have an account already?'}{' '}
          <Link to={isLogin ? '/register' : '/login'} className="link-btn">
            {isLogin ? 'Register' : 'Login'}
          </Link>
        </p>

        <p className="auth-backToHome">
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginRegister;
