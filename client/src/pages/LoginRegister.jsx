import { useState } from "react";
import {Link , useNavigate} from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';


function LoginRegister(){
    const [isLogin , setIsLogin] = useState(true);
    const navigate = useNavigate();

    // after success display gallery
    const handleSucess = ()=>{
        navigate('/')
    };

    return(
        <div className="loginRegister-page">
            <div className="loginRegister-card">
                <h1>{isLogin? 'Welcome back!' : 'Create an account'}</h1>

                {isLogin?
                    (<LoginForm onLoginSuccess={handleSucess}/>) : 
                    (<RegisterForm onRegisterSuccess={handleSucess}/>)
                }

                <p className="auth-switch">
                    {isLogin? 'Do not have an account?' : 'Have an account already?'}{' '}
                    <button type="button" onClick={()=> setIsLogin(!isLogin)} className="link-btn">
                        {isLogin? 'Register' : 'Login'}
                    </button>
                </p>

                <p className="auth-backToHome">
                    <Link to="/">Back to Home</Link>
                </p>

            </div>
        </div>
    )
}

export default LoginRegister;